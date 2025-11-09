import { useState } from "react";
import { useNavigate } from "react-router";
import { registerUser } from "../services/users";
import { toast } from "react-toastify";

function Register() {
    // use formData object to maintain the state of the form fields
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",

    });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // register logic here
            // const user = await registerUser(formData)
            // toast.success(`User registered: ${user.uid}`)
            navigate("/login");
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
            <h2 style={{ textAlign: "center" }}>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        placeholder="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        placeholder="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
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
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mx-3 mb-3">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register