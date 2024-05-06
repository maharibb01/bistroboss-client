import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg"
import moment from "moment";
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-item text-white pt-8 my-20 bg-opacity-10">
            <SectionTitle heading="FROM OUR MENU" subheading="Check it out"></SectionTitle>
            <div className="md:flex justify-center items-center pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>{moment().format('MMMM D, Y')}</p>
                    <p className="uppercase">WHERE CAN I GET SOME?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta ut corporis ipsam libero officia assumenda asperiores, sequi nobis magnam amet doloremque, quod facere in necessitatibus molestiae quasi laborum. Enim, sapiente non quis perspiciatis vitae exercitationem incidunt omnis deserunt ut saepe ex culpa odio. Iure quasi quo cum cumque, velit iusto!</p>
                    <button className="btn btn-outline text-white border-0 border-b-4">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;