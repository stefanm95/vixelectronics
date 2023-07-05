import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div className="card bg-light border-o" style={{boxShadow: "none"}}>
    <div className="card-body">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <p>Order Id: {order.paymentIntent.id}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p>
            Amount:{" "}
            {(order.paymentIntent.amount /= 100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p>Currency: {order.paymentIntent.currency.toUpperCase()}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p>Method: {order.paymentIntent.payment_method_types[0]}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p>Payment: {order.paymentIntent.status.toUpperCase()}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p>Orderd on: {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        {showStatus && (
          <div className="badge bg-primary text-white">
            STATUS: {order.orderStatus}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ShowPaymentInfo;
