import { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testimonials = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("https://server-bistro-boss-navy.vercel.app/reviews")
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])

    // console.log(reviews);

    return (
        <div className="my-20">
            <SectionTitle heading="TESTIMONIALS" subheading="What Our Clients Say"></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => {
                        return <SwiperSlide key={review._id}>
                            <div className="m-24 flex flex-col items-center space-y-5">
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                />
                                <p>{review.details}</p>
                                <h3 className="text-2xl text-orange-600">{review.name}</h3>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    );
};

export default Testimonials;