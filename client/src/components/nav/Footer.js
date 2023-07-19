import React from 'react';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4">
                        <h5 className="text-uppercase">VIX Electronics</h5>
                        <p>Contact xxxx xxx xxx</p>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="text-uppercase">Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!" className="text-dark">Facebook</a>
                            </li>
                            <li>
                                <a href="#!" className="text-dark">Instagram</a>
                            </li>
                        </ul>
                    </div>

                    <div className="col-lg-3 col-md-6 mb-4">
                        <h5 className="text-uppercase">Address</h5>
                        <p>123 Vointei<br/>Bucuresti, Sector 2</p>
                    </div>
                </div>

                <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    © 2023 Copyright
                    <a className="text-dark" href="#"> vixelectronics.com</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
