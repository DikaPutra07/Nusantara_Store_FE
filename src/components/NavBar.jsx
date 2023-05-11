import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { toast } from 'react-toastify';


const NavBar = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    return (
        <nav className="nav-bar">
            <Link to = "/">
                <h2>NusantaraStore</h2>
            </Link>
            <div className='left-items'>
                {
                    auth.id ? (
                                        <Link to="/cart">
                <div className="nav-cart">
                    <svg xmlns="http://www.w3.org/2000/svg"
                            width="34"
                            height="34"
                            fill="currentColor"
                            className="bi bi-cart"
                            viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg>
                </div>
                </Link>
                    ) : (
                            <></>
                    )
                }
                <div className="nav-profile">
                    {
                        auth.id ? (
                            <Link to="../../profile/user">
                                <div className="nav-profile">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="35"
                                        height="35"
                                        fill="currentColor"
                                        className="bi bi-person"
                                        viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                    </svg>
                                </div>
                            </Link>
                        ) : (
                                <></>
                        )
                                
                    }
                </div>
                <div className='nav-login'>
                    {
                        auth.id ? (
                            <Link to="../../login">
                                <div className="nav-logout" onClick={() => {
                                    dispatch(logoutUser(null));
                                    toast.warning( "Logout Success", {position: "bottom-left"} );
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="34"
                                        height="34"
                                        fill="currentColor"
                                        className="bi bi-box-arrow-right"
                                        viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                                        <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                                    </svg>
                                </div>
                            </Link>
                        ) : (
                            <Link to="../../login">
                                <div className="nav-login">
                                Login
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;