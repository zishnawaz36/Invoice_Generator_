function ShippingDetails({name,
    address,
    city,
    state,
    pincode,
    stateCode,
    placeOfDelivery}){
    return(
        <>
        <div className="shippingDetails">
            <h4>Shipping Address</h4>
            <p className="shipping-info">{name}</p>
            <p className="shipping-info">{address}</p>
            <p className="shipping-info">{state}</p>
            <p className="shipping-info">{pincode}</p>
            <p className="shipping-info">{state}</p>
            <p className="shipping-info">{stateCode}</p>
            <p className="shipping-info">{placeOfDelivery}</p>

        </div>
        </>
    )
}
export default ShippingDetails;