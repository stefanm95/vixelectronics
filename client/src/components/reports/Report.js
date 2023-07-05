import React, { useEffect, useState } from 'react';

const SalesReport = ({ orders, startDate, endDate }) => {
    const [report, setReport] = useState({ totalSales: 0, count: 0 });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Convert dates to Date objects for comparison
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Filter the orders based on the date range and count the total sales
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= start && orderDate <= end;
        });

        // Calculate total sales and number of sales
        let totalSales = 0;
        let count = 0;
        for(let order of filteredOrders) {
            totalSales += order.products.reduce((sum, item) => sum + item.product.price * item.count, 0);
            count++;
        }

        setReport({ totalSales, count });
        setLoading(false);
    }, [orders, startDate, endDate]);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Total Sales</th>
                        <th>Number of Sales</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{report.totalSales.toFixed(2)}$</td>
                        <td>{report.count}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SalesReport;