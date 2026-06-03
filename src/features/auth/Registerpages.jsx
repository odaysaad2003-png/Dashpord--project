import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useToast} from "../../context/ToastContext";
import {Eye, EyeOff} from "lucide-react";

import "../../styles/pages/auth.css";

export default function RegisterPage() {
    //password visibility state
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const {register, isAuthLoading} = useAuth();
    const {showToast} = useToast();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    function handleChange(event) {
        const {name, value} = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));

        setErrors((currentErrors) => ({
            ...currentErrors,
            [name]: "",
        }));
    }

    function validateForm() {
        const validationErrors = {};

        if (!formData.name.trim()) {
            validationErrors.name = "Full name is required.";
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        if (!formData.confirmPassword.trim()) {
            validationErrors.confirmPassword = "Confirm password is required.";
        } else if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
        }

        return validationErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            showToast({
                type: "success",
                title: "Account created",
                message: "Welcome to Oday Dashboard.",
            });

            navigate("/dashboard");
        } catch (error) {
            showToast({
                type: "error",
                title: "Register failed",
                message: error.message,
            });
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-logo">O</div>

                <div className="auth-header">
                    <h1>Create Account</h1>
                    <p>Join the dashboard and start managing your workspace.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Oday Saad"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="oday@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <div className="password-field">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="At least 6 characters"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((current) => !current)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.password && <span className="form-error">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>

                        <div className="password-field">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                placeholder="Repeat your password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword((current) => !current)}
                                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
                    </div>

                    <button className="auth-button" type="submit" disabled={isAuthLoading}>
                        {isAuthLoading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                <p className="auth-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </section>
        </main>
    );
}
