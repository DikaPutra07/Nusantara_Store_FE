import { useGetAllProductsQuery, useGetFilterCategoryQuery } from "../features/productsApi";
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from "react-router-dom";

const Home = () => {  

    const location = useLocation();
    const path = location.pathname.split("category/")[1];
    const { data: getAllData, error: errorAlldata, isLoading: loadingAllData } = useGetAllProductsQuery();
    const { data: FilterData, error: errorFilterData, isLoading: loadingFilterData } = useGetFilterCategoryQuery(path);

    if (loadingAllData || loadingFilterData) return <p>Loading...</p>
    if (errorAlldata || errorFilterData) return <p>An error occured...</p>

    return ( 
        <div className="home-container">
                        <>
                            <div className="categories">
                                <h2>Categories</h2>
                                <ul>
                                    <Link to="/products/category/1">
                                        <button>Shirt</button>
                                    </Link>
                                    <Link to="/products/category/2">
                                        <button>Pants</button>
                                    </Link>
                                    <Link to="/products/category/3">
                                        <button>Shoes</button>
                                    </Link>
                                    <Link to="/products/category/4">
                                        <button>Bags</button>
                                    </Link>
                                    <Link to="/products/category/5">
                                        <button>Decoration</button>
                                    </Link>
                                    <Link to="/products/category/6">
                                        <button>Tools</button>
                                    </Link>
                                </ul>
                            </div>
                            <div className="products">
                                {FilterData.data?.map((product) => (
                                    <Link to={`../../products/${product.id}`}>
                                    <div className="product" key={product.id}>
                                        <h3>{product.name}</h3>
                                        <img src={product.image} alt={product.name} />
                                        <div className="details">
                                            <span className="price">Rp. {product.price},00</span>
                                                <div className="product-shop">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="currentColor"
                                                        className="bi bi-shop"
                                                        viewBox="0 0 16 16">
                                                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                                                    </svg>
                                                    <span>{product.shop}</span>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                ))}
                            </div>
                            <h2>All Products</h2>
                            <div className="products">
                                {getAllData.data?.map((product) => (   
                                    <Link to={`../../products/${product.id}`}>
                                    <div className="product" key={product.id}>
                                        <h3>{product.name}</h3>
                                        <img src={product.image} alt={product.name} />
                                        <div className="details">
                                            <span className="price">Rp. { product.price },00</span>
                                            <div className="product-shop">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        fill="currentColor"
                                                        className="bi bi-shop"
                                                        viewBox="0 0 16 16">
                                                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                                                    </svg>
                                                    <span>{product.shop}</span>
                                            </div>
                                        </div>
                                    </div>
                                    </Link> 
                                ))}
                            </div>
                            
                        </>
        </div>
    );
}
 
export default Home;