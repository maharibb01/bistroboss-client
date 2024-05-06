import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";

const FoodCard = ({ item }) => {

    const [, refetch] = useCart();

    const { name, image, price, recipe } = item;

    const { user } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const axiosSecure = useAxiosSecure();

    const handleAddToCart = (food) => {
        if (user && user.email) {
            // console.log(food, user.email);
            const cartItem = {
                menuId: food._id,
                email: user.email,
                name: food.name,
                image: food.image,
                price: food.price
            }
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        alert(`${food.name} added to cart`)
                        refetch();
                    }
                })
        }
        else {
            alert("Need to login first");
            navigate("/login", { state: location.pathname })
        }
    }

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white mx-[7px] absolute right-4 top-4 px-2 rounded-lg">Price ${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleAddToCart(item)} className="btn btn-outline bg-slate-100 border-0 border-b-4 mt-4 hover:bg-orange-500">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;