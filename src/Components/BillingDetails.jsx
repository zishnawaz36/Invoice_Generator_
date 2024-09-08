function BillingDetails({ name, address, city, state, pincode, stateCode }) {
    return (
      <div className="billing-details">
        <h4>Billing Address</h4>
        <p>{name}</p>
        <p>{address}</p>
        <p>{city}, {state} - {pincode}</p>
        <p>State Code: {stateCode}</p>
      </div>
    );
  }
  export default BillingDetails;
  