import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { toast } from "react-toastify";

const Login = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    
    console.log(auth);

    useEffect(() => {
        if (auth.id) {
            navigate("/");
        }
    }, [auth.id, navigate]);

    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.email === "" && user.password === "") {
            toast.warning("Please fill in all fields!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        else
            dispatch(loginUser(user));
    }

    console.log(auth.loginStatus);
    
    return ( 
        <>
            <div className="auth">
                <form onSubmit={handleSubmit} >
                    <h2>Login</h2>
                    <input type="email" placeholder="email" onChange = {
                        (e) => setUser({ ...user, email: e.target.value})} />
                    <input type="password" placeholder="password" onChange = {
                        (e) => setUser({ ...user, password: e.target.value})} />
                    <button>
                        {auth.loginStatus === "loading" ? "Loading..." : "Login"}
                    </button>

                    {auth.loginStatus === "failed" ?
                        <p> {auth.loginError} </p> : null
                    }
                </form>
            </div>
            <div className="sign">
                <p>Don't have an account? <a href="/register">Sign Up</a> here</p>
            </div>
        </>
     );
}
 
export default Login;