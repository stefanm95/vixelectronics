const { admin } = require('../firebase/index');
const PDFDocument = require('pdfkit');

const generateInvoicePDF = (order) => {
  const doc = new PDFDocument();

  // Generate the invoice content using the order details
  doc.fontSize(18).text(`Invoice for Order #${order._id}`, 50, 50);

  // Include other necessary invoice details

  return doc;
};

const sendInvoiceEmail = async (req, res) => {
  try {
    const { recipientEmail, order } = req.body;

    // Generate the invoice PDF
    const invoicePDF = generateInvoicePDF(order);

    // Convert the PDF document to a buffer
    const pdfBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      invoicePDF.on('data', (chunk) => chunks.push(chunk));
      invoicePDF.on('end', () => resolve(Buffer.concat(chunks)));
      invoicePDF.on('error', reject);
    });

    // Send the email using Firebase
    const email = {
      to: recipientEmail,
      message: {
        subject: 'Invoice',
        text: 'Please find attached the invoice.',
        attachments: [
          {
            filename: 'invoice.pdf',
            type: 'application/pdf',
            content: pdfBuffer.toString('base64'),
          },
        ],
      },
    };

    await admin.messaging().send(email);

    res.json({ message: 'Email sent' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
};

module.exports = {
  sendInvoiceEmail,
};