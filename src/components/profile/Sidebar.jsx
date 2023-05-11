import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return ( 
        <div className="wrapper">
            <div className="sidebar">
                <h2>Profile</h2>
                <ul>
                    <NavLink className={
                        ({ isActive }) =>
                            isActive ? "active" : "in-active"
                        }
                        to="/profile/user">Home</NavLink>
                    <NavLink className={
                        ({ isActive }) =>
                            isActive ? "active" : "in-active"
                        }
                        to="/profile/shop">Product</NavLink>
                    <NavLink className={
                        ({ isActive }) =>
                            isActive ? "active" : "in-active"
                        }
                        to="/profile/order">Transaction</NavLink>
                </ul>
                </div>
        </div>
     );
}
 
export default Sidebar;