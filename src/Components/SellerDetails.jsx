function SellerDetails({ name, address, city, pincode, panNo, gstNo, placeOfSupply }) {
    return (
      <div className="seller-details">
        <h4>Sold By</h4>
        <p>{name}</p>
        <p>{address}</p>
        <p>{city}, {pincode}</p>
        <p>PAN: {panNo}</p>
        <p>GST No: {gstNo}</p>
        <p>Place of Supply: {placeOfSupply}</p>
      </div>
    );
  }
  export default SellerDetails;
  