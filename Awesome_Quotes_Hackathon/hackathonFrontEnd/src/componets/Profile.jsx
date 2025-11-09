import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { findUserByCredentials, updateUserProfile } from "../services/users";
import { toast } from "react-toastify";
function Profile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phoneno: "",
    });
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    useEffect(() => {

        if (user) {
            setFormData({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                address: user.address || "",
                phoneno: user.phoneno || "",
            });
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {

            // const message = await updateUserProfile(formData)
            setUser({ ...user, firstName: formData.firstName, lastName: formData.lastName, address: formData.address, phoneno: formData.phoneno })

            toast.success(message)
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
            <h2>My Profile</h2>
            <form onSubmit={handleUpdate}>
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
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="phoneno"
                        name="phoneno"
                        placeholder="phoneno"
                        value={formData.phoneno}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mx-3 mb-3">
                    Save
                </button>
            </form>
        </div>
    );
}

export default Profile