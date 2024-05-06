// import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {

    const [menu] = useMenu();

    const popular = menu.filter(item => item.category === "popular");

    return (
        <section className="mb-12">
            <SectionTitle heading="FROM OUR MENU" subheading="Check it out" />
            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular.map(item => {
                        return <MenuItem key={item._id} item={item}></MenuItem>
                    })
                }
            </div>
            <div className="flex justify-center mt-8">
                <button className="btn btn-outline border-0 border-b-4">View Full Menu</button>
            </div>
        </section>
    );
};

export default PopularMenu;