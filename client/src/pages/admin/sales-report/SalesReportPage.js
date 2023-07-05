import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../../../functions/admin';
import AdminNav from "../../../components/nav/AdminNav";
import { DatePicker } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import SalesReport from '../../../components/reports/Report';

const { RangePicker } = DatePicker;

const SalesReportPage = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
    const [dateRange, setDateRange] = useState([]);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = () =>
        getOrders(user.token).then((res) => {
            console.log(JSON.stringify(res.data, null, 4));
            setOrders(res.data);
        });

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <RangePicker
                        onChange={setDateRange}
                        style={{
                            width: "50%",
                            borderRadius: "5px",
                            border: "1px solid #ced4da",
                            margin: "1em 0 1em 0",
                        }}
                        className="form-control"
                    />
                    <h2>Sales Report</h2>
                    <SalesReport orders={orders} startDate={dateRange[0]} endDate={dateRange[1]} />
                </div>
            </div>
        </div>
    );
}

export default SalesReportPage;
