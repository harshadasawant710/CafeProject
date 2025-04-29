import React, { useContext } from 'react'
import { contextapi } from '../Contextapi'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()

    const { cart, loginname, setLoginname } = useContext(contextapi)

    function handelLogout(e) {
        e.preventDefault();
        localStorage.removeItem("loginname");
        setLoginname(null);
        navigate("/LogIn");
    }

    return (
        <div id='navbar'>
            <div className='row'>
                <div className='col-md-12'>
                    <nav className="navbar navbar-expand-lg fixed">
                        <div className="container-fluid">
                            <a href="/" className="text-dark">
                                {/* <div
                                    style={{
                                        height: "50px",
                                        width: "50px",
                                        borderRadius: "50px",
                                        border: "1px solid black",
                                        fontFamily: "Brush Script MT, Brush Script Std, cursive",
                                        textAlign: "center",
                                        fontWeight: "700",
                                        padding: "20%",
                                    }}
                                >
                                    Cafe Cloud
                                </div> */}
                                <img src='/cafeCloud1.png' alt="Cafe Cloud" style={{ width: '80px', height: '50px' }} />
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"><i className="bi bi-list"></i> </span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-center m-auto">
                                    <li className="nav-item ">
                                        <NavLink className="nav-link active text-dark" aria-current="page" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" aria-current="page" to="/foodProducts">Our Menu</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link text-dark" aria-current="page" to="/aboutUs">About Us</NavLink>
                                    </li>
                                    {loginname ? (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className="nav-link userName" to="">Welcome {loginname}</NavLink>
                                            </li>

                                            {loginname !== "Admin" && (
                                                <li className="nav-item text-dark">
                                                    <NavLink className='nav-link' to="/addtocartpage">
                                                        <button className='btn text-black'>
                                                            <span className='addedFood'><i className="bi bi-cart3" style={{ color: 'black', fontSize: '25px', position: 'relative', top: '-10px', fontWeight: 'bold' }}></i></span>
                                                            <sup id='cartcount'>{cart?.totalitems ?? 0}</sup>
                                                        </button>
                                                    </NavLink>
                                                </li>
                                            )}
                                            <li className="nav-item">
                                                <NavLink className="nav-link text-dark" aria-current="page" to="#" onClick={handelLogout}>Log Out</NavLink>
                                            </li>
                                        </>
                                    ) : (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" aria-current="page" to="/LogIn">LogIn</NavLink>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar
