import React, { useEffect, useState } from "react";
import ReadMoreReact from 'read-more-react';
import { Oval } from 'react-loader-spinner'
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = (props) => {
    const [category, setCategory] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loader, setLoader] = useState(false);

    const getAllCategory = () => {
        setLoader(true);
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(data => {
                setCategory(data);
                setLoader(false);
            });
    }

    const getAllProduct = () => {
        setLoader(true);
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                setAllProducts(json);
                setLoader(false);
            });
    }
    const getAllProductInCategory = (selectedCategory) => {
        setLoader(true);
        fetch(`https://fakestoreapi.com/products/category/${selectedCategory}`)
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
                setLoader(false);
            });
    }

    const addToCart = (product) => {
        console.log(product);
        // props.setTotalItems();
        const existingItemIndex = props.cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            const updatedCartItems = [...props.cartItems];
            updatedCartItems[existingItemIndex] = { ...updatedCartItems[existingItemIndex], quantity: updatedCartItems[existingItemIndex].quantity + 1 };
            props.setCartItems(updatedCartItems);
        } else {
            props.setCartItems([...props.cartItems, { ...product, quantity: 1 }]);
        }
    }

    // const getTotalPrice = () => {
    //     return props.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    // }

    // const removeFromCart = (itemId) => {
    //     props.setCartItems(props.cartItems.filter(item => item.id !== itemId));
    // }


    useEffect(() => {
        getAllCategory();
        getAllProduct();
    }, [])

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title> Home </title>
                </Helmet>
            </HelmetProvider>

            {loader ? <div className="loading"> <Oval
                height={80}
                width={80}
                color="red"
                wrapperStyle={{}}
                wrapperClass="loading"
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
            />
            </div>
                :
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light">
                        <div style={{ width: "100%" }}>
                            <ul className="navbar-nav d-flex justify-content-around" >
                                {
                                    category.map((item, key) => {
                                        return (
                                            <li className="nav-item" key={key} >
                                                <button onClick={() => getAllProductInCategory(item)} className="btn btn-secondary">{item}</button>
                                            </li>
                                        )
                                    })
                                }
                                <li className="nav-item navbar-fixed-bottom">
                                    <button onClick={() => getAllProduct()} className="btn btn-secondary">All</button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div>
                        <ul className="showProduct navbar-nav">
                            {
                                allProducts.map((product, key) => {
                                    return (
                                        <li key={key}>
                                            <div className="card" style={{ width: "20rem", height: "25rem", margin: "10px" }}>
                                                <img className="card-img-top" src={product.image} alt="Card cap" />
                                                <div className="card-body">
                                                    <h4 className="card-title">${product.price}</h4>
                                                    <h5 className="card-title">{product.title.split(' ').slice(0, 4).join(' ')}</h5>
                                                    <ReadMoreReact text={product.description}
                                                        min={30}
                                                        ideal={40}
                                                        max={100}
                                                        readMoreText="read more" />
                                                    <div className="showBtns" style={{ position: "absolute", bottom: "0" }}>
                                                        <button className="btn btn-sm btn-warning" onClick={()=>addToCart(product)} style={{ marginBottom: "15px" }}>Add to Card</button>
                                                        <button className="btn btn-sm btn-primary" style={{ marginBottom: "15px", marginLeft: "100px" }}>Buy Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            {
                                allProducts.map((product, key) => {
                                    return (
                                        <li key={key}>
                                            <div className="card" style={{ width: "20rem", height: "25rem", margin: "10px" }}>
                                                <img className="card-img-top" src={product.image} alt="Card cap" />
                                                <div className="card-body">
                                                    <h4 className="card-title">${product.price}</h4>
                                                    <h5 className="card-title">{product.title.split(' ').slice(0, 4).join(' ')}</h5>
                                                    <ReadMoreReact text={product.description}
                                                        min={30}
                                                        ideal={40}
                                                        max={100}
                                                        readMoreText="read more" />
                                                    <div className="showBtns" style={{ position: "absolute", bottom: "0" }}>
                                                        <button className="btn btn-sm btn-warning" style={{ marginBottom: "15px" }}>Add to Card</button>
                                                        <button className="btn btn-sm btn-primary" style={{ marginBottom: "15px", marginLeft: "100px" }}>Buy Now</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default Home;