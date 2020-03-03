import React from 'react'
import {Link} from 'react-router-dom'
    //Navbar with account address
    function Navbar({account}) {

            return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link to="/" className="navbar-brand">
                            <h2 className="navCrypto">Crypto-Wills</h2>
                        </Link>
                        <span className="text-white ml-auto ">
                            <h3 className="text-white d-none d-lg-block">Twoje konto: {account} </h3>
                        </span>
                    </div>
                </nav>
            );
    }

export default Navbar
