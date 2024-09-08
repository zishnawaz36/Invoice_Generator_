function InvoiceDetails({stateCode,placeOfSupply,placeOfDelivery,invoiceNo,
    invoiceDate,
    reverseCharge}){
    return(
        <>
        <div className="invoice-details">
            <h4 className="invoice-details"><b>State/UT Code:</b>{stateCode}</h4>
            <h4 className="invoice-details"><b>Place of supply:</b> {placeOfSupply}</h4>
            <h4 className="invoice-details"><b>Place of delivery:</b> {placeOfDelivery}</h4>
            <h4 className="invoice-details"><b>Invoice Number:</b> {invoiceNo}</h4>
            <h4 className="invoice-details"><b>Invoice Date:</b>{invoiceDate}</h4>
        </div>
        </>
    )
}
export default InvoiceDetails;