import React, { useState, useContext, useEffect } from 'react';
import './Review.css';
import { useForm } from "react-hook-form";
import { Button, Spinner } from 'react-bootstrap';
import { UserContext } from '../../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Review = ({ isAdmin }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loggedinUser, setLoggedinUser] = useContext(UserContext);
    const [textLength, setTextLength] = useState(0);
    const [giveReview, setGiveReview] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState(null);

    useEffect(() => {
        fetch('https://rocky-waters-70556.herokuapp.com/review', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: loggedinUser.email })
        })
            .then(res => res.json())
            .then(reviewResult => {
                if (reviewResult.length) {
                    setGiveReview(false);
                    setReview(reviewResult);
                }
                else {
                    setGiveReview(true);
                }

            })
        console.log(review);
    }, [])

    const onSubmit = data => {
        if (rating) {
            data.rating = rating;
            data.date = new Date();
            fetch('https://rocky-waters-70556.herokuapp.com/addReview', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(result => {
                    if (result) {
                        alert('Review is successfully submitted.');
                        reset();
                        setGiveReview(false);
                    }
                })
        }
        else {
            alert('Rating is not selected! Please choose a rating.');
        }
        console.log(data)
    };

    const handleOnChange = (e) => {
        setTextLength(e.target.value.length);
    }

    return (
        <div>
            <div className="bookingInformationTitle d-flex justify-content-center align-items-center text-center shadow mb-3 p-2 relative complainHeader">
                <h4>Your Feedback</h4>
            </div>
            {
                review && !giveReview && review.map(rvw => {
                    console.log("rvw in admin panel", rvw);
                    return (
                        <div className="p-4 w-100 shadow reviewDisplay">
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
                            {
                                isAdmin ? <Button className="btn btn-warning" >Approved to Display</Button> : <Button className="btn btn-warning" >Edit</Button>
                            }

                        </div>
                    )
                })

            }
            {
                giveReview &&
                <form className="border p-4 rounded my-5 shadow" onSubmit={handleSubmit(onSubmit)}>
                    <input className="w-100 my-2 py-1 px-3 form-control" {...register("name", { required: true })} defaultValue={loggedinUser.displayName || ""} placeholder="Name" />
                    {errors.name && <p className="text-warning">This is field is required</p>}

                    <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Email" defaultValue={loggedinUser.email || ""} {...register("email", { required: true })} />
                    {errors.email && <p className="text-warning">This is field is required</p>}

                    <div className='d-flex justify-content-center p-4 my-4 shadow starRatingSection'>
                        {
                            [...Array(5)].map((star, i) => {
                                const ratingValue = i + 1;
                                return <label>
                                    <input type="radio" name="rating" value={ratingValue} onClick={() => setRating(ratingValue)} />
                                    <FontAwesomeIcon
                                        className="star"
                                        style={{ fontSize: '50px' }}
                                        icon={faStar}
                                        color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                                        onMouseEnter={() => setHover(ratingValue)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                </label>
                            })
                        }
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <textarea type="text-area" className="w-100 my-2 py-1 px-3 form-control" style={{ height: '150px' }} placeholder="Your comment..." {...register("comment", { required: true, maxLength: 2000 })} onChange={handleOnChange} />
                    {errors.comment?.type === 'required' && <p className="text-warning">This field is required</p>}
                    {errors.comment?.type === 'maxLength' && <p className="text-warning">Max length is exceeded. Maximum 2000 character. Here is {textLength}</p>}

                    <input className="my-2 px-5 btn btn-primary" type="submit" />
                    {errors.end && <p className="text-warning">This is field is required</p>}

                    {/* <Button className="m-2  px-5 btn btn-warning" onClick={() => { setGiveReview(false) }} >Cancel</Button> */}
                </form>
            }
        </div>
    );
};

export default Review;