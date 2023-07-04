import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { DatePicker } from "antd";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

const { RangePicker } = DatePicker;

const Orders = ({ orders, handleStatusChange, startDate, endDate }) => {
  const [dateRange, setDateRange] = useState([]);

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return (
      !dateRange.length ||
      (orderDate >= dateRange[0] && orderDate <= dateRange[1])
    );
  });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product.title}</b>
            </td>
            <td>{p.product.price}</td>
            <td>{p.product.brand}</td>
            <td>{p.color}</td>
            <td>{p.count}</td>
            <td>
              {p.product.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <div className="form-group">
        <RangePicker
          onChange={(dates) => {
            if (dates === null) {
              setDateRange([]);
            } else if (
              dates &&
              dates[1] &&
              moment(dates[1]).isAfter(moment())
            ) {
              toast.error("You cannot select a date in the future.");
            } else {
              setDateRange(dates);
            }
          }}
          style={{
            width: "50%",
            borderRadius: "5px",
            border: "1px solid #ced4da",
          }}
          className="form-control"
        />
      </div>
      {filteredOrders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Delivery Status</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;
