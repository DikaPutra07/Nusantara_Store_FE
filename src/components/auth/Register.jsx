import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        shop: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.name === "" || user.email === "" || user.password === "" || user.shop === "") {
            toast.warning("Please fill in all fields!", {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
        else
            dispatch(registerUser(user));
    }

    console.log(auth.registerStatus);

    if(auth.registerStatus === "success") navigate("/login");

    return (
        <>
            <div className="auth">
                <form onSubmit={handleSubmit} >
                    <h2>Register</h2>
                    <input type="text" placeholder="Name" onChange = {
                        (e) => setUser({ ...user, name: e.target.value})} />
                    <input type="email" placeholder="Email" onChange = {
                        (e) => setUser({ ...user, email: e.target.value})} />
                    <input type="password" placeholder="Password" onChange = {
                        (e) => setUser({ ...user, password: e.target.value })} />
                    <input type="text" placeholder="Nama Toko" onChange = {
                        (e) => setUser({ ...user, shop: e.target.value })} />                
                    <button>
                        {auth.registerStatus === "loading" ? "Loading..." : "Register"}
                    </button>

                    {auth.registerStatus === "failed" ?
                        <p> {auth.registerError} </p> : null
                    }
                </form>
            </div>
            <div className="sign">
                <p>Already have an account? <a href="/login">Sign In</a> here</p>
            </div>
        </>
    );
}
 
export default Register;