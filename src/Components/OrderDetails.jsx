function OrderDetails({orderNo,
    orderDate}){
    return(
        <>
        <div className="order-details">
            <h4 className="order-details"><b>Order Number </b>{orderNo}</h4>
            <h4 className="order-details"><b>Order Date </b>{orderDate}</h4>
        </div>
        </>
    )
}
export default OrderDetails;