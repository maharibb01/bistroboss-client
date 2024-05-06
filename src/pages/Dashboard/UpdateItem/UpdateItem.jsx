import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { FaUtensils } from "react-icons/fa";

const UpdateItem = () => {

    const {name, category, recipe, price, _id} = useLoaderData();
    // console.log(item);

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        // reset
        // formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        // upload to imgbb
        const imgFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        // console.log(res.data);
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = axiosSecure.patch(`/menu/${_id}`, menuItem)
            console.log(menuRes.data);
            if ((await menuRes).data.modifiedCount > 0) {
                alert("Menu updated to db");
                // reset();
            }
        }
    }

    return (
        <div>
            <SectionTitle heading="update item" subheading="refresh info"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full mb-2">
                        <div className="label">
                            <span className="label-text">Recipe name?</span>
                        </div>
                        <input {...register("name", { required: true })} defaultValue={name} type="text" placeholder="recipe name" className="input input-bordered w-full" />
                    </label>
                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Recipe category</span>
                            </div>
                            <select defaultValue={category} {...register("category", { required: true })} className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>
                        {/* price */}
                        <label className="form-control w-full mb-2">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input {...register("price", { required: true })} defaultValue={price} type="text" placeholder="recipe price" className="input input-bordered w-full" />
                        </label>
                    </div>
                    {/* details */}
                    <label className="form-control mb-4">
                        <div className="label">
                            <span className="label-text">Recipe details</span>
                        </div>
                        <textarea {...register("recipe", { required: true })} defaultValue={recipe} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </label>
                    <div>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                    </div>
                    <button className="btn bg-orange-600 text-white mt-6">Update Items <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;