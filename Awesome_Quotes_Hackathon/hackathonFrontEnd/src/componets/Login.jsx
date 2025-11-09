import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { findUserByCredentials } from "../services/users";
import { toast } from "react-toastify";

function Login() {
    // use formData object to maintain the state of the form fields
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault(); // prevent submission of html form
        try {
            // login logic here
            // const cred = { email: formData.email, passwd: formData.password }
            // const user = await findUserByCredentials(cred)
            // // store token in sessionStorage
            // sessionStorage.setItem("token", user.token)
            // // store whole user object in sessionStorage
            // sessionStorage.setItem("user", JSON.stringify(user))
            // // add logged in user in AuthContext
            // setUser(user);
            // toast.success("Welcome, " + user.name)
            navigate("/home");
        }
        catch (err) {
            toast.error(err.message)
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control "
                        id="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}

                    />
                </div>
                <div className="mb-3">

                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                </div>
                <div className="mb-3">
                    Don't have an account?
                    <Link to="/register" className="link link-primary">register here</Link>
                </div>
                <button type="submit" className="btn btn-primary ">
                    Sign In
                </button>

            </form>
        </div>
    );
}

export default Login;