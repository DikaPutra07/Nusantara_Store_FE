import { Link } from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="sidebar">
                <div className="categories">
                                <h2>Categories</h2>
                                <ul>
                                    <Link to="/">
                                        <button>All</button>
                                    </Link>
                                    <Link to="/products/category/1">
                                        <button>Shirt</button>
                                    </Link>
                                    <Link to="/products/category/2">
                                        <button>Pants</button>
                                    </Link>                                  
                                    <button>Shoes</button>
                                    <button>Bags</button>
                                    <button>Decoration</button>
                                    <button>Tools</button>
                                </ul>
                </div>
        </div>
     );
}
 
export default Sidebar;