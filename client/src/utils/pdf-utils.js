import React from "react";
import { Document, Page, Text, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import Invoice from "../components/order/Invoice";

export const generateInvoicePDF = async (orderData) => {
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Invoice order={orderData} />
      </Page>
    </Document>
  );

  const blob = await MyDocument.renderAsBlob();

  // Convert the Blob to base64 string
  const base64String = await convertBlobToBase64(blob);


  return base64String;
};

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  // Add more styles for your invoice elements
});
