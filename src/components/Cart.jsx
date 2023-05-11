import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteCart, getCartByUserId, deleteCartByUserId } from "../features/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { createOrder } from "../features/orderSlice";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [carts, setCarts] = useState({});
    const [address, setAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { 
        async function fetchData() {
            const request = await dispatch(getCartByUserId(auth.id));
            setCarts(request.payload);
        }
        fetchData()

    }, [carts]);


    const total = carts.data?.reduce((acc, curr) => acc + curr.product_price * curr.quantity, 0);


    const handleRemoveFromCart = async (id) => {
        dispatch(deleteCart(id))
        try {
            const request = await axios.get(`https://nusantarastorebe-production.up.railway.app/api/carts/user/${auth.id}`);
            setCarts(request.data);
            // navigate(0);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClearCart = () => {
        dispatch(deleteCartByUserId(auth.id))
        try {
            // const request = axios.get(`http://localhost:5000/api/carts/user/${auth.id}`);
            // setCarts(request.data);
            navigate(0);
            toast.error("Cart Cleared", {
                position: "bottom-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    
    const handleCheckoutCart = async () => {
        dispatch(createOrder({
            user_id: auth.id,
            total_item: carts.data?.length,
            total_price: total,
            status_id: 1,
            Address: address,
        }))
        dispatch(deleteCartByUserId(auth.id));
        try {
            navigate("../../profile/order");
        }
        catch (error) {
            console.log(error);
        }
    }

    if (!carts.data) {
        return <p>Loading...</p>;
    }

    return ( 
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {!carts.data || carts.data.length === 0 ? (
                <div className="cart-empty">
                    <p>Your cart is currently empty</p>
                    {/* SYMBOL */}
                    <div className="start-shopping">
                        <Link to="/">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-arrow-left"
                                viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                            </svg>
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                    {/* SYMBOL */}
                </div>
            ) : (
                    <div>
                        {/* title */}
                        <div className="title">
                            <h3 className="product-title">Product</h3>
                            <h3 className="price">Price</h3>
                            <h3 className="quantity">Quantity</h3>
                            <h3 className="total">Total</h3>
                        </div>
                        <div className="cart-items">
                            {carts.data?.map((cartItems) => (
                                <div className="cart-item" key={cartItems.id}>
                                    {/* product */}
                                    <div className="cart-product">
                                        <img src={cartItems.product_image} alt={cartItems.name} />
                                        <div>
                                            <h3>{cartItems.product_name}</h3>
                                            <div className="cart-shop">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        className="bi bi-shop"
                                                        viewBox="0 0 16 16">
                                                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                                                    </svg>
                                                    <p>{cartItems.shop}</p>
                                            </div>
                                            <button onClick={() => {
                                                handleRemoveFromCart(cartItems.id)
                                                toast.error("Item removed from cart", {
                                                    position: "bottom-left",
                                                    autoClose: 1000,
                                                    hideProgressBar: false,
                                                    closeOnClick: true,
                                                    pauseOnHover: false,
                                                    draggable: true,
                                                    progress: undefined,
                                                })
                                            }
                                            }>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    width="25"
                                                    height="25"
                                                    fill="currentColor"
                                                    class="bi bi-trash3-fill"
                                                    viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {/* price */}
                                    <div className="cart-product-price">
                                        Rp. {cartItems.product_price},00
                                    </div>
                                    {/* quantity */}
                                    <div className="cart-product-quantity">
                                        <div className="count">{ cartItems.quantity }</div>
                                    </div>
                                    <div className="cart-product-total-price">
                                        Rp. {cartItems.product_price * cartItems.quantity},00
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <button className="clear-cart" onClick={() => handleClearCart()}>Clear Cart</button>
                            <div className="input-address">
                                <form>
                                    <div className="form-group-create-product">
                                        <label htmlFor="name">Enter your detail address here for Shipment purposes</label>
                                        <textarea id="address" rows="3" placeholder="Address" onChange={
                                            (e) => setAddress(e.target.value)
                                        }/>
                                    </div>
                                </form>
                            </div>
                            <div className="cart-checkout">
                                <div className="subtotal">
                                    <span>Subtotal</span>
                                    <span className="amout">${total}</span>
                                </div>
                                <p>Taxes and shipping calculated at checkout</p>
                                <button onClick={
                                    () =>
                                        {
                                        address === "" ? toast.warning("Please input your address", {
                                            position: "top-center",
                                            autoClose: 2000,
                                            hideProgressBar: true,
                                            closeOnClick: true,
                                            pauseOnHover: false,
                                            draggable: false,
                                            progress: undefined,
                                            }) : handleCheckoutCart()
                                        }
                                }>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-bag-check"
                                        viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
                                    </svg>
                                        <p>Checkout</p>
                                </button>
                                {/* SYMBOL */}
                                <div className="continue-shopping">
                                    <Link to="/">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-arrow-left"
                                            viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                        </svg>
                                        <span>Continue Shopping</span>
                                    </Link>
                                </div>
                                {/* SYMBOL */}
                            </div>
                        </div>
                </div>
            )}
        </div>
     );
}
 
export default Cart;