import React, { useEffect, useState } from 'react';
import './Testimonials.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Testimonials = () => {

    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/allReview')
            .then(res => res.json())
            .then(reviewResult => {
                if (reviewResult.length) {
                    setReview(reviewResult);
                }
            })
        console.log(review);
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="testimonials py-5">
            <div className="container">
                <Slider {...settings} className="border ratingDisplay">
                    {
                        review?.map(rvw => {
                            return (
                                <div className="p-4 w-100 shadow rating">
                                    <h3 className="text-center">{rvw.name}</h3>
                                    <div className="d-flex justify-content-center p-2">
                                        {
                                            [...Array(5)].map((star, i) => {
                                                const ratingValue = i + 1;
                                                return <label>
                                                    <input type="radio" name="rating" value={ratingValue} />
                                                    <FontAwesomeIcon
                                                        className="star"
                                                        style={{ fontSize: '20px' }}
                                                        icon={faStar}
                                                        color={ratingValue <= (rvw.rating) ? '#ffc107' : '#e4e5e9'}
                                                    />
                                                </label>
                                            })
                                        }
                                    </div>
                                    <div className="w-100 p-3 my-4 reviewComment shadow">
                                        <p className='comment'>{rvw.comment}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </div>
    );
};

export default Testimonials;