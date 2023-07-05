import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from '../../../functions/product';

const ProductInventory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = () => {
        setLoading(true);
        getProductsByCount(100)
        .then((res) => {
            setProducts(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
            console.log(err);
        });
    };
  
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h2>Products Inventory</h2>
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product.title}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductInventory;
