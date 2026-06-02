import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import {useToast} from "../../context/ToastContext";
import {Eye, EyeOff} from "lucide-react";
import "../../styles/pages/auth.css";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const {login, isAuthLoading} = useAuth();
    const {showToast} = useToast();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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

        if (!formData.email.trim()) {
            validationErrors.email = "Email is required.";
        }

        if (!formData.password.trim()) {
            validationErrors.password = "Password is required.";
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
            await login(formData);

            showToast({
                type: "success",
                title: "Login successful",
                message: "Welcome back to Oday Dashboard.",
            });

            navigate("/dashboard");
        } catch (error) {
            showToast({
                type: "error",
                title: "Login failed",
                message: error.message,
            });
        }
    }

    return (
        <main className="auth-page">
            <section className="auth-card">
                <div className="auth-logo">O</div>

                <div className="auth-header">
                    <h1>Welcome Back</h1>
                    <p>Login to manage your company dashboard.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="admin@oday.com"
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
                                placeholder="123456"
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

                    <button className="auth-button" type="submit" disabled={isAuthLoading}>
                        {isAuthLoading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don&apos;t have an account? <Link to="/register">Create account</Link>
                </p>

                <div className="auth-demo">
                    <strong>Demo users:</strong>
                    <span>admin@oday.com / 123456</span>
                    <span>manager@oday.com / 123456</span>
                    <span>employee@oday.com / 123456</span>
                </div>
            </section>
        </main>
    );
}
