import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {

    const [menu, , refetch] = useMenu();
    // console.log(menu);

    const axiosSecure = useAxiosSecure();

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/menu/${id}`)
        console.log(res.data);
        if (res.data?.deletedCount > 0) {
            alert("menu item deleted")
            refetch();
        }
    }

    return (
        <div>
            <SectionTitle heading="manage all items" subheading="hurry up"></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Delete</th>
                                <th>Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu.map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <th>
                                                {index + 1}
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle w-12 h-12">
                                                            <img src={item.image} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{item.name}</td>
                                            <td className="text-right">{item.price}</td>
                                            <td>
                                                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-lg"><FaTrash></FaTrash></button>
                                            </td>
                                            <td>
                                                <Link to={`/dashboard/updateItem/${item._id}`}>
                                                    <button className="btn btn-ghost btn-lg"><FaEdit></FaEdit></button>
                                                </Link>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;