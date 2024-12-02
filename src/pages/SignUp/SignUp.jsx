import { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const SignUp = () => {

    const axiosPublic = useAxiosPublic();
    // Form use korchi : "React hook form" theke 
    // "React hook form" theke ai form use korle alada vabe handleSubmit er function use kore form er date gula nite hoyna.
    const { register, handleSubmit, watch, reset, formState: { errors }, } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {

                        // Create user entry in the database
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database');
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User created successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    console.log(watch('example'));

    return (
        <>
            <Helmet>
                <title>Foodies Hub || Sign Up</title>
            </Helmet>
            <div className="  bg-base-200 ">
                <div className="hero-content flex-col w-full mx-auto">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold text-center">Sign Up</h1>
                    </div>
                    <div className="card  w-1/2 shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* Name Section */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-xl font-semibold text-red-400">The name field is required </span>}
                            </div>
                            {/* Photo Section */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL")} placeholder="PhotoURL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-xl font-semibold text-red-400">The Photo URL is required </span>}
                            </div>
                            {/* Email Section */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="email" className="input input-bordered" />
                            </div>
                            {/* Password Section */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", { required: true, pattern: /((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]))\S/, minLength: 6, maxLength: 20 })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'required' && <p className="text-red-200">Password must be 6 characters</p>}
                                {errors.password?.type === 'minLength' && <p>Password must be atleast 6 character</p>}
                                {errors.password?.type === 'maxLength' && <p>Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p>Password must have one capital letter,one small letter,one special character and one number</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary text-xl font-semibold" type="submit" value='Sign Up' />
                            </div>
                        </form>
                        <div className="divider">
                            
                        </div>
                        <div>
                            <h2 className="mb-6 px-4 text-center text-lg mx-auto items-center"> Already have an account ? please <Link to='/login'><span className="text-xl font-bold text-red-400">Login</span></Link></h2>
                        </div>
                    </div>
                </div>
                <div className="text-xl font-extralight text-center hover:to-blue-700">
                   <SocialLogin></SocialLogin>
                </div>
            </div></>

    );
};

export default SignUp;