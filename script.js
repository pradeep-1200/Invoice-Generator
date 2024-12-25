function generateInvoice() {
  const customerName = document.getElementById('customerName').value;
  const customerAddress = document.getElementById('customerAddress').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const quantity = Number(document.getElementById('quantity').value);
  const pricePerUnit = Number(document.getElementById('pricePerUnit').value);
  const taxRate = Number(document.getElementById('taxRate').value);

  const total = quantity * pricePerUnit;
  const tax = (total * taxRate) / 100;
  const totalAmount = total + tax;

  document.getElementById('invoiceCustomerDetails').innerText = `${customerName}\n${customerAddress}`;
  document.getElementById('invoiceItem').innerText = itemDescription;
  document.getElementById('invoiceQuantity').innerText = quantity;
  document.getElementById('invoicePrice').innerText = `${pricePerUnit.toFixed(2)}`;
  document.getElementById('invoiceTotal').innerText = `${total.toFixed(2)}`;
  document.getElementById('invoiceTax').innerText = `${tax.toFixed(2)}`;
  document.getElementById('invoiceAmount').innerText = `${totalAmount.toFixed(2)}`;

  document.getElementById('invoice').style.display = 'block';
}

document.getElementById('downloadInvoice').addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const customerName = document.getElementById('customerName').value;
  const customerAddress = document.getElementById('customerAddress').value;
  const itemDescription = document.getElementById('itemDescription').value;
  const quantity = document.getElementById('quantity').value;
  const pricePerUnit = Number(document.getElementById('pricePerUnit').value).toFixed(2);
  const total = Number(document.getElementById('invoiceTotal').innerText).toFixed(2);
  const tax = Number(document.getElementById('invoiceTax').innerText).toFixed(2);
  const totalAmount = Number(document.getElementById('invoiceAmount').innerText).toFixed(2);

  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Invoice', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Customer Name: ${customerName}`, 10, 40);
  doc.text(`Address: ${customerAddress}`, 10, 50);

  doc.autoTable({
    startY: 70,
    head: [['Item', 'Quantity', 'Price per Unit', 'Total']],
    body: [[itemDescription, quantity, `${pricePerUnit}`, `${total}`]],
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] },
    styles: { fontSize: 12 },
  });

  const finalY = doc.previousAutoTable.finalY + 10;
  doc.setFont('Helvetica', 'bold');
  doc.text('Summary:', 10, finalY);
  doc.setFont('Helvetica', 'normal');
  doc.text(`Tax: ${tax}`, 140, finalY, { align: 'right' });
  doc.text(`Total Amount Due: ${totalAmount}`, 140, finalY + 10, { align: 'right' });

  doc.save('invoice.pdf');
});
