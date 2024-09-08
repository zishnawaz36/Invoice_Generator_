import { useState, useRef } from "react";
import jsPDF from "jspdf";
import SellerDetails from "./SellerDetails";
import BillingDetails from "./BillingDetails";
import ShippingDetails from "./ShippingDetails";
import OrderDetails from "./OrderDetails";
import InvoiceDetails from "./InvoiceDetails";
import ItemDetails from "./ItemDetails";
import Signature from "./Signature";

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
    const doc = new jsPDF();
  
    // Add the logo
    const img = new Image();
    img.src = 'https://www.nicepng.com/png/full/770-7701676_amazon-pay.png'; // Your logo URL
    doc.addImage(img, 'PNG', 10, 10, 50, 20); // Adjust position and size as needed
  
    // Invoice Header
    doc.setFontSize(16);
    doc.text('Tax Invoice/Bill Of Supply/Cash Memo', 105, 40, { align: 'center' });
  
    doc.setFontSize(12);
  
    // Seller Details
    doc.text('Sold By:', 10, 50);
    doc.text(`Name: ${name}`, 10, 60);
    doc.text(`Address: ${address}`, 10, 70);
    doc.text(`City: ${city}`, 10, 80);
    doc.text(`Pincode: ${pincode}`, 10, 90);
    doc.text(`PAN: ${panNo}`, 10, 100);
    doc.text(`GST No: ${gstNo}`, 10, 110);
    doc.text(`Place of Supply: ${placeOfSupply}`, 10, 120);
  
    // Billing Details
    doc.text('Billing Address:', 10, 140);
    doc.text(`Name: ${name}`, 10, 150);
    doc.text(`Address: ${address}`, 10, 160);
    doc.text(`City: ${city}`, 10, 170);
    doc.text(`State: ${stateName}`, 10, 180);
    doc.text(`Pincode: ${pincode}`, 10, 190);
    doc.text(`State Code: ${stateCode}`, 10, 200);
  
    // Shipping Details
    doc.text('Shipping Address:', 10, 220);
    doc.text(`Name: ${name}`, 10, 230);
    doc.text(`Address: ${address}`, 10, 240);
    doc.text(`City: ${city}`, 10, 250);
    doc.text(`State: ${stateName}`, 10, 260);
    doc.text(`Pincode: ${pincode}`, 10, 270);
    doc.text(`State Code: ${stateCode}`, 10, 280);
    doc.text(`Place of Delivery: ${placeOfDelivery}`, 10, 290);
  
    // Order Details
    doc.text('Order Details:', 10, 310);
    doc.text(`Order No: ${orderNo}`, 10, 320);
    doc.text(`Order Date: ${orderDate}`, 10, 330);
  
    // Invoice Details
    doc.text('Invoice Details:', 10, 350);
    doc.text(`Invoice No: ${invoiceNo}`, 10, 360);
    doc.text(`Invoice Date: ${invoiceDate}`, 10, 370);
    doc.text(`Reverse Charge: ${reverseCharge}`, 10, 380);

    // Items Header
    doc.text('Items:', 10, 400);

    let currentY = 410;
    const rowHeight = 10;
  
    // Add each item in the items array
    items.forEach((item, index) => {
        const netAmount = (item.unitPrice * item.quantity) - item.discount;
        const taxAmount = netAmount * (item.taxRate / 100);
        const total = netAmount + taxAmount;
    
        doc.text(`Item ${index + 1}:`, 10, currentY);
        doc.text(`Description: ${item.description}`, 10, currentY + rowHeight);
        doc.text(`Unit Price: ${item.unitPrice.toFixed(2)}`, 10, currentY + 2 * rowHeight);
        doc.text(`Quantity: ${item.quantity}`, 10, currentY + 3 * rowHeight);
        doc.text(`Discount: ${item.discount.toFixed(2)}`, 10, currentY + 4 * rowHeight);
        doc.text(`Net Amount: ${netAmount.toFixed(2)}`, 10, currentY + 5 * rowHeight);
        doc.text(`Tax Rate: ${item.taxRate}%`, 10, currentY + 6 * rowHeight);
        doc.text(`Tax Amount: ${taxAmount.toFixed(2)}`, 10, currentY + 7 * rowHeight);
        doc.text(`Total: ${total.toFixed(2)}`, 10, currentY + 8 * rowHeight);
    
        currentY += 9 * rowHeight;
    
        if (currentY > 280) {
            doc.addPage();
            currentY = 20; // Reset Y position for new page
        }
    });
  
    // Add signature
    if (signature) {
      doc.text('Authorized Signature:', 10, currentY + 20);
      const imgSignature = new Image();
      imgSignature.src = signature; // Assuming signature is a base64 encoded image
      doc.addImage(imgSignature, 'PNG', 10, currentY + 30, 50, 20); // Adjust position and size as needed
    }
  
    doc.save('invoice.pdf');
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
            <input id="pincode" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
            <label htmlFor="stateName">State</label>
            <input id="stateName" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
            <label htmlFor="panNo">PAN No</label>
            <input id="panNo" type="text" value={panNo} onChange={(e) => setPanNo(e.target.value)} />
            <label htmlFor="gstNo">GST No</label>
            <input id="gstNo" type="text" value={gstNo} onChange={(e) => setGstNo(e.target.value)} />
            <label htmlFor="placeOfSupply">Place of Supply</label>
            <input id="placeOfSupply" type="text" value={placeOfSupply} onChange={(e) => setPlaceOfSupply(e.target.value)} />
            <label htmlFor="stateCode">State Code</label>
            <input id="stateCode" type="text" value={stateCode} onChange={(e) => setStateCode(e.target.value)} />
            <label htmlFor="placeOfDelivery">Place of Delivery</label>
            <input id="placeOfDelivery" type="text" value={placeOfDelivery} onChange={(e) => setPlaceOfDelivery(e.target.value)} />
            <label htmlFor="orderNo">Order No</label>
            <input id="orderNo" type="text" value={orderNo} onChange={(e) => setOrderNo(e.target.value)} />
            <label htmlFor="orderDate">Order Date</label>
            <input id="orderDate" type="text" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
            <label htmlFor="invoiceNo">Invoice No</label>
            <input id="invoiceNo" type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input id="invoiceDate" type="text" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
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
