import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import SalesReport from "../../components/reports/Report";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";

const { RangePicker } = DatePicker;

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [dateRange, setDateRange] = useState([]);
  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          {/* {JSON.stringify(orders)} */}
          <Orders
            orders={orders}
            handleStatusChange={handleStatusChange}
            dateRange={dateRange}
          />
          <SalesReport
            orders={orders}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
          />
          <RangePicker
            onChange={setDateRange}
            style={{ marginBottom: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
