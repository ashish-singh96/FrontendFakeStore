import React from "react";
import { Link, useHistory } from "react-router-dom";



const Navbar = (props) => {
    const history = useHistory();

    const handleLogout = (event) => {
        event.preventDefault();
        props.setUser('');
        localStorage.clear();
        history.push('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark text-white d-flex justify-content-between">
            <h1 className="navbar-brand text-white">E-Cart</h1>
            <div>
                <ul className="navbar-nav">

                    <li className="nav-item" >
                        <Link className="nav-link text-white " to={'/'} name="Home" >Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to={'/about'} name="About" >AboutUs</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to={'contact'} name="Contact" >ContactUs</Link>
                    </li>

                    <li className="nav-item">
                        <p className="nav-link text-white">{props.name}</p>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link text-white" to={'cart'}>
                        <p style={{border:"none", background:"none", cursor:"pointer"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                            <span className='badge badge-warning' id='lblCartCount'> {props.cartItems?props.cartItems.length:0 } </span>
                        </p>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button type="button" onClick={(e) => handleLogout(e)} className="btn btn-danger">Logout</button>
                    </li>

                    {/* <li className="nav-item">
                        <React.Fragment>
                            <Dropdown menu={{ category, onClick, }}>
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space>
                                        Select Category
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </React.Fragment>
                    </li> */}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;