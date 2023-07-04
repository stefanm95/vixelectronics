const nodemailer = require('nodemailer');

const sendInvoiceEmail = async (recipientEmail, order) => {
  try {
    // Create a nodemailer transport
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "5589f43fd3aaab",
        pass: "7b549f49e9b1a9"
      }
    });

    // Customize the email content with the necessary order details
    const emailContent = `
      <p>Dear Customer,</p>
      <p>Thank you for your order. Here is the invoice for your purchase:</p>
      <p>Order ID: ${order._id}</p>
      <p>Order Total: ${order.total}</p>
      <!-- Include any other necessary order details -->
    `;

    // Create the email message
    const message = {
      from: 'test@vixmail.com',
      to: recipientEmail,
      subject: 'Invoice for your order',
      html: emailContent,
    };

    // Send the email
    const info = await transporter.sendMail(message);

    console.log('Email sent:', info);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = {
  sendInvoiceEmail,
};
