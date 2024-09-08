import { useState, useRef } from "react";
import jsPDF from "jspdf";
import SellerDetails from "./SellerDetails";
import BillingDetails from "./BillingDetails";
import ShippingDetails from "./ShippingDetails";
import OrderDetails from "./OrderDetails";
import InvoiceDetails from "./InvoiceDetails";
import ItemDetails from "./ItemDetails";
import Signature from "./Signature";
import numberToWords from 'number-to-words';

function Invoice() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [stateName, setStateName] = useState('');
  const [panNo, setPanNo] = useState('');
  const [gstNo, setGstNo] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [stateCode, setStateCode] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [orderNo, setOrderNo] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [reverseCharge, setReverseCharge] = useState('No');
  const [signature, setSignature] = useState('');
  const [items, setItems] = useState([]);

  const descriptionRef = useRef(null);
  const unitPriceRef = useRef(null);
  const quantityRef = useRef(null);
  const discountRef = useRef(null);
  const taxRateRef = useRef(null);

  const handlePrint = () => {
    window.print();
  };

  const handleAddItem = () => {
    const description = descriptionRef.current.value;
    const unitPrice = parseFloat(unitPriceRef.current.value);
    const quantity = parseInt(quantityRef.current.value);
    const discount = parseFloat(discountRef.current.value);
    const taxRate = parseFloat(taxRateRef.current.value);

    if (description && !isNaN(unitPrice) && !isNaN(quantity) && !isNaN(discount) && !isNaN(taxRate)) {
      setItems([...items, { description, unitPrice, quantity, discount, taxRate }]);
    } else {
      alert('Please fill out all fields correctly.');
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
  
    // Page dimensions and margins
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 10;
    let currentY = margin;
  
    // Add the logo
    const img = new Image();
    img.src = 'https://www.nicepng.com/png/full/770-7701676_amazon-pay.png';
  
    img.onload = () => {
      doc.addImage(img, 'PNG', margin, margin, 50, 20);
  
      // Header
      doc.setFontSize(16);
      doc.text('Tax Invoice/Bill Of Supply/Cash Memo', pageWidth / 2, currentY + 20, { align: 'left' });
      currentY += 30;
  
      // Seller Details
      doc.setFontSize(12);
      doc.text('Sold By:', margin, currentY);
      currentY += 10;
      doc.text(`Name: ${name}`, margin, currentY);
      currentY += 10;
      doc.text(`Address: ${address}`, margin, currentY);
      currentY += 10;
      doc.text(`City: ${city}`, margin, currentY);
      currentY += 10;
      doc.text(`Pincode: ${pincode}`, margin, currentY);
      currentY += 10;
      doc.text(`PAN: ${panNo}`, margin, currentY);
      currentY += 10;
      doc.text(`GST No: ${gstNo}`, margin, currentY);
      currentY += 10;
      doc.text(`Place of Supply: ${placeOfSupply}`, margin, currentY);
      currentY += 20;
  
      // Billing Details
      doc.text('Billing Address:', margin, currentY);
      currentY += 10;
      doc.text(`Name: ${name}`, margin, currentY);
      currentY += 10;
      doc.text(`Address: ${address}`, margin, currentY);
      currentY += 10;
      doc.text(`City: ${city}`, margin, currentY);
      currentY += 10;
      doc.text(`State: ${stateName}`, margin, currentY);
      currentY += 10;
      doc.text(`Pincode: ${pincode}`, margin, currentY);
      currentY += 10;
      doc.text(`State Code: ${stateCode}`, margin, currentY);
      currentY += 20;
  
      // Shipping Details
      doc.text('Shipping Address:', margin, currentY);
      currentY += 10;
      doc.text(`Name: ${name}`, margin, currentY);
      currentY += 10;
      doc.text(`Address: ${address}`, margin, currentY);
      currentY += 10;
      doc.text(`City: ${city}`, margin, currentY);
      currentY += 10;
      doc.text(`State: ${stateName}`, margin, currentY);
      currentY += 10;
      doc.text(`Pincode: ${pincode}`, margin, currentY);
      currentY += 10;
      doc.text(`State Code: ${stateCode}`, margin, currentY);
      currentY += 10;
      doc.text(`Place of Delivery: ${placeOfDelivery}`, margin, currentY);
      currentY += 20;
  
      // Order Details
      doc.text('Order Details:', margin, currentY);
      currentY += 10;
      doc.text(`Order No: ${orderNo}`, margin, currentY);
      currentY += 10;
      doc.text(`Order Date: ${orderDate}`, margin, currentY);
      currentY += 20;
  
      // Invoice Details
      doc.text('Invoice Details:', margin, currentY);
      currentY += 10;
      doc.text(`Invoice No: ${invoiceNo}`, margin, currentY, { align: 'right' });
      currentY += 10;
      doc.text(`Invoice Date: ${invoiceDate}`, margin, currentY, { align: 'right' });
      currentY += 10;
      doc.text(`Reverse Charge: ${reverseCharge}`, margin, currentY);
      currentY += 20;
  
      // Items Table
      doc.text('Items:', margin, currentY);
      currentY += 10;
  
      // Table Header
      const tableHeaders = [
        'Serial No.', 'Description', 'Unit Price', 'Quantity', 'Discount', 'Tax Rate', 'Net Amount', 'Tax Amount', 'Total'
      ];
      const columnWidths = [15, 40, 25, 20, 20, 20, 25, 25, 25];
      let startX = margin;
      columnWidths.forEach((width, i) => {
        doc.text(tableHeaders[i], startX + width / 2, currentY);
        startX += width;
      });
      currentY += 10;
  
      // Initialize totals
      let totalNetAmount = 0;
      let totalTaxAmount = 0;
      let grandTotal = 0;
  
      // Add each item
      items.forEach((item, index) => {
        const netAmount = (item.unitPrice * item.quantity) - item.discount;
        const taxAmount = netAmount * (item.taxRate / 100);
        const total = netAmount + taxAmount;
  
        if (currentY > pageHeight - 40) { // Check if we need a new page
          doc.addPage();
          currentY = margin;
          doc.text('Items:', margin, currentY);
          currentY += 10;
        }
  
        doc.text((index + 1).toString(), margin, currentY);
        doc.text(item.description, margin + columnWidths[0], currentY);
        doc.text(item.unitPrice.toFixed(2), margin + columnWidths[0] + columnWidths[1], currentY);
        doc.text(item.quantity.toString(), margin + columnWidths[0] + columnWidths[1] + columnWidths[2], currentY);
        doc.text(item.discount.toFixed(2), margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], currentY);
        doc.text(netAmount.toFixed(2), margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4], currentY);
        doc.text(`${item.taxRate}%`, margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5], currentY);
        doc.text(taxAmount.toFixed(2), margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6], currentY);
        doc.text(total.toFixed(2), margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3] + columnWidths[4] + columnWidths[5] + columnWidths[6] + columnWidths[7], currentY);
  
        currentY += 10;
  
        // Update totals
        totalNetAmount += netAmount;
        totalTaxAmount += taxAmount;
        grandTotal += total;
      });
  
      // Summary Table
      if (currentY > pageHeight - 40) {
        doc.addPage();
        currentY = margin;
      }
      doc.text('Summary:', margin, currentY);
      currentY += 10;
      const summaryX = margin;
      const summaryY = currentY;
      const summaryTableWidth = 80;
      const summaryRowHeight = 20;
  
      doc.text('Net Amount', summaryX, summaryY);
      doc.text(totalNetAmount.toFixed(2), summaryX + summaryTableWidth, summaryY);
  
      doc.text('Tax Amount', summaryX, summaryY + summaryRowHeight);
      doc.text(totalTaxAmount.toFixed(2), summaryX + summaryTableWidth, summaryY + summaryRowHeight);
  
      doc.text('Total', summaryX, summaryY + 2 * summaryRowHeight);
      doc.text(grandTotal.toFixed(2), summaryX + summaryTableWidth, summaryY + 2 * summaryRowHeight);
  
      doc.text(`Total in words: ${numberToWords.toWords(grandTotal)}`, summaryX, summaryY + 4 * summaryRowHeight);
  
      doc.save('Invoice.pdf');
    };
  
    img.onerror = () => {
      console.error('Failed to load logo image.');
    };
  };
  
  

  return (
    <main className="invoice-container">
      <div className="data">
        {showInvoice ? (
          <div>
            <img className="logo" src="https://www.nicepng.com/png/full/770-7701676_amazon-pay.png" alt="logo" />
            <h5 className="invoice-header">Tax Invoice/Bill Of Supply/Cash Memo
              <p>(Original for Recipient)</p>
            </h5>
            <SellerDetails
              name={name}
              address={address}
              city={city}
              pincode={pincode}
              panNo={panNo}
              gstNo={gstNo}
              placeOfSupply={placeOfSupply}
            />
            <BillingDetails
              name={name}
              address={address}
              city={city}
              state={stateName}
              pincode={pincode}
              stateCode={stateCode}
            />
            <ShippingDetails
              name={name}
              address={address}
              city={city}
              state={stateName}
              pincode={pincode}
              stateCode={stateCode}
              placeOfDelivery={placeOfDelivery}
            />
            <OrderDetails
              orderNo={orderNo}
              orderDate={orderDate}
            />
            <InvoiceDetails
              stateCode={stateCode}
              placeOfSupply={placeOfSupply}
              placeOfDelivery={placeOfDelivery}
              invoiceNo={invoiceNo}
              invoiceDate={invoiceDate}
              reverseCharge={reverseCharge}
            />
            <ItemDetails items={items} />
            <button onClick={() => setShowInvoice(false)}>Edit information</button>
            <button onClick={generatePDF}>Download PDF</button>
            <button onClick={handlePrint}>Print Invoice</button>
          </div>
        ) : (
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="address">Address</label>
            <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            <label htmlFor="city">City</label>
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
            <label htmlFor="pincode">Pincode</label>
            <input id="pincode" type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <label htmlFor="stateName">State</label>
            <input id="stateName" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
            <label htmlFor="panNo">PAN No</label>
            <input id="panNo" type="number" value={panNo} onChange={(e) => setPanNo(e.target.value)} />
            <label htmlFor="gstNo">GST No</label>
            <input id="gstNo" type="number" value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
            <label htmlFor="placeOfSupply">Place of Supply</label>
            <input id="placeOfSupply" type="date" value={placeOfSupply} onChange={(e) => setPlaceOfSupply(e.target.value)} />
            <label htmlFor="stateCode">State Code</label>
            <input id="stateCode" type="number" value={stateCode} onChange={(e) => setStateCode(e.target.value)} />
            <label htmlFor="placeOfDelivery">Place of Delivery</label>
            <input id="placeOfDelivery" type="text" value={placeOfDelivery} onChange={(e) => setPlaceOfDelivery(e.target.value)} />
            <label htmlFor="orderNo">Order No</label>
            <input id="orderNo" type="number" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
            <label htmlFor="orderDate">Order Date</label>
            <input id="orderDate" type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            <label htmlFor="invoiceNo">Invoice No</label>
            <input id="invoiceNo" type="number" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input id="invoiceDate" type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
            <label htmlFor="reverseCharge">Reverse Charge</label>
            <select id="reverseCharge" value={reverseCharge} onChange={(e) => setReverseCharge(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <label htmlFor="description">Item Description</label>
            <input ref={descriptionRef} type="text" />
            <label htmlFor="unitPrice">Unit Price</label>
            <input ref={unitPriceRef} type="number" />
            <label htmlFor="quantity">Quantity</label>
            <input ref={quantityRef} type="number" />
            <label htmlFor="discount">Discount</label>
            <input ref={discountRef} type="number" />
            <label htmlFor="taxRate">Tax Rate</label>
            <input ref={taxRateRef} type="number" />
            <button onClick={handleAddItem}>Add Item</button>
            <button onClick={() => setShowInvoice(true)}>Generate Invoice</button>
          </div>
        )}
      </div>
      <Signature signature={signature} />
    </main>
  );
}

export default Invoice;
