import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, coverImg }) => {
    return (
        <div className="my-8">
            {title && <Cover img={coverImg} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 mt-5">
                {
                    items.map(item => {
                        return <MenuItem key={item._id} item={item}></MenuItem>
                    })
                }
            </div>
            <div className="flex justify-center">
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline border-0 border-b-4 mx-auto mt-8">Order Now</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;