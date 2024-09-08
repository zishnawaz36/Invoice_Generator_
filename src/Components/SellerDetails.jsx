function SellerDetails({ name, address, city, pincode, panNo, gstNo, placeOfSupply }) {
    return (
      <div className="seller-details">
        <h4>Sold By</h4>
        <p>{name}</p>
        <p>{address}</p>
        <p>{city}, {pincode}</p>
        <p><b>Pan No: </b> {panNo}</p>
        <p><b>GST Registration No: </b>{gstNo}</p>
        <p><b>Place of Supply:</b> {placeOfSupply}</p>
      </div>
    );
  }
  export default SellerDetails;
  