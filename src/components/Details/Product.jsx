import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, createCart } from "../../features/cartSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {

    const auth = useSelector((state) => state.auth);

    const [counter, setCounter] = useState(1)

    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
     
    const [cart, setCart] = useState({
        user_id: null,
        product_id: null,
        product_name: "",
        product_image: "",
        product_price: null,
        shop: "",
        quantity: 1,
    });

    const location = useLocation();
    const API_URL = `https://nusantarastorebe-production.up.railway.app/api${location.pathname}`;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(API_URL);
            setData(request.data);
            setCart({
                ...cart,
                user_id: auth.id,
                product_id: request.data.data.id,
                product_name: request.data.data.name,
                product_image: request.data.data.image,
                product_price: request.data.data.price,
                shop: request.data.data.shop,
                quantity: 1,
            });
            return request;
        }
        fetchData()
            .then(() => setIsLoading(false))
            .catch((err) => console.log(err));
        

    }, []);

    console.log(data);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>An error occured..</p>;
    }

    const handleNavigate = () => {
        navigate("../../login");
    }

    const handleAddtoCart = async () => {
        //IF (GET BY USER_ID && GET BY PRODUCT_ID){
        //  UPDATE CART
        // }
        //ELSE
        dispatch(createCart(cart));
        navigate("../../cart");
    }

    const handleDecreaseQuantity = () => {
        if (cart.quantity > 1) {
            cart.quantity = cart.quantity - 1;
            setCounter(cart.quantity);
            setCart(cart);
        }
        else {
            cart.quantity = 1;
        }
    }

    const handleIncreaseQuantity = () => {
        cart.quantity = cart.quantity + 1;
        setCounter(cart.quantity);
        setCart(cart);
    }
    
    return (
        <>
            <div className="detail-product">
                <div className="product-dtl">
                    <div className="separator">
                        <div className="detail-image">
                             <img src={data.data.image} alt={data.data.title} className="img-fluid" />
                        </div>
                    </div>
                    <div className="separator">
                        <div className="detail-info">
                            <h2>{data.data.name}</h2>
                            <p>{data.data.description}</p>
                            <div className="price-quantity">
                                <h3>Price: Rp. {data.data.price},00</h3>
                                {/* {data.data.shop} */}
                                <div className="detail-product-quantity">
                                    
                                        <button className="qty-btn" onClick={() => handleDecreaseQuantity()}> - </button>
                                        <div className="count">{ counter }</div>
                                        <button className="qty-btn" onClick={() => handleIncreaseQuantity()}> + </button>
                                    
                                </div>
                            </div>
                            
                            <button className="add-to-cart" onClick={() => {
                                if (auth.id) {
                                    handleAddtoCart();
                                    toast.success("Product added to cart",
                                        {
                                            position: toast.POSITION.BOTTOM_RIGHT,
                                            autoClose: 1000,
                                            
                                        }
                                    );
                                }
                                else {
                                    handleNavigate();
                                }
                            } }>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                                </svg>
                                <span>Add to Cart</span>      
                            </button>                
                        </div>
                    </div>    
                </div>
            </div>
        </>
        
    );
 }
 
export default Product ;