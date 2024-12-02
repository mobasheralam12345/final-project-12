import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    // For Captcha
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown',
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp',
                    },
                });
                navigate(from, { replace: true });
            });
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <>
            <Helmet>
                <title>Foodies Hub || Log In</title>
            </Helmet>
            <div className="min-h-screen flex bg-base-200">
                {/* Left Side: Image */}
                <div className="hidden w-1/2 bg-cover bg-center" style={{ backgroundImage: "" }}>
                    {/* You can replace the URL with your desired image */}
                </div>

                {/* Right Side: Login Form */}
                <div className="flex items-center justify-center w-full ">
                    <div className="card shadow-2xl bg-base-100 w-1/2">
                        <div className="text-center my-6">
                            <h1 className="text-4xl font-bold">Login now!</h1>
                        </div>
                        <form onSubmit={handleLogin} className="card-body">
                            {/* Email Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>

                            {/* Captcha Field */}
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="text"
                                    name="captcha"
                                    placeholder="Type the above captcha"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="form-control mt-6">
                                <input
                                    disabled={disabled}
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Login"
                                />
                            </div>
                        </form>

                        <p className="text-center mt-4">
                            <small className='text-lg'>
                                New Here? Create an account {' '}
                                <Link to="/signup">
                                    <span className="text-xl font-bold text-red-300"> Sign Up</span>
                                </Link>
                            </small>
                        </p>

                        <div className='text-center p-4 text-xl font-bold'>
                            <SocialLogin />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
