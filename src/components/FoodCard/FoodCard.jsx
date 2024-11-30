import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [ , refetch] = useCart(); // first element use korbona tai faka rakhchi

    const handleAddToCart = () => {
        // Jodi user thake 
        if (user && user.email) {
            // To send cart item to the database
            const cartItem = {
                menuId: _id, email: user.email, name, image, price
            }
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        // refetch cart to update the cart items count
                        refetch();
                    }
                })
        }
        // jodi user na thake
        else {

            Swal.fire({
                title: "You are not logged in?",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Please go login"
            })
                // After show toast -->then send the user to the Login page
                .then((result) => {
                    if (result.isConfirmed) {
                        navigate('/login', { state: { from: location } });
                    }
                });
        }
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-700 right-0  px-2 mr-4 text-white absolute mt-4">${price}</p>
            <div className="card-body flex flex-col items-center justify-center  bg-gray-100">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions ">
                    <button onClick={handleAddToCart}
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;