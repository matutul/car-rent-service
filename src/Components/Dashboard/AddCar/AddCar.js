import React from 'react';
import './AddCar.css';
import { useForm } from "react-hook-form";
import { useState } from 'react';

const AddCar = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [carPhotoUrl, setCarPhotoUrl] = useState("");

    const onSubmit = data => {
        data.photo = carPhotoUrl;

        fetch('https://rocky-waters-70556.herokuapp.com/addCar', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert("Car is added successfully")
                    setCarPhotoUrl("");
                    reset();
                }
            });
    };

    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', 'f9b82b0a30ffb0ad12dfd4462754ce1b');
        imageData.append('image', event.target.files[0]);

        fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: imageData
        })
            .then(res => res.json())
            .then(data => {
                const photoUrl = data?.data?.display_url;
                setCarPhotoUrl(photoUrl);
            })
    }

    return (
        <div>
            <h3>Add New Car:</h3>
            <form className="border p-4 rounded" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="row">
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3" placeholder="Car name" {...register("carName", { required: true })} />
                        {errors.carName && <p>This is field is required</p>}
                    </div>
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3" placeholder="Model name" {...register("modelName", { required: true })} />
                        {errors.modelName && <p>This is field is required</p>}
                    </div>
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3" placeholder="Model year" {...register("modelYear", { required: true })} />
                        {errors.modelYear && <p>This is field is required</p>}
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3" placeholder="Register number" {...register("number", { required: true })} />
                        {errors.number && <p>This is field is required</p>}
                    </div>
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3" placeholder="Mileage" {...register("mileage", { required: true })} />
                        {errors.mileage && <p>This is field is required</p>}
                    </div>
                    <div className="col-md-6">
                        <input type="number" className="w-100 my-2 py-1 px-3" placeholder="Passenger seat" {...register("seat", { min: 2, max: 20 }, { required: true })} />
                        {errors.seat && <p>This is field is required{errors.seat.message}</p>}
                    </div>

                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1" type="file" {...register("photo", { required: true })} onChange={(event) => handleImageUpload(event)} />
                        {errors.photo && <p>This is field is required</p>}
                    </div>
                    <div className="col-md-6">
                        <input type="number" className="w-100 my-2 py-1 px-3" placeholder="Price per kilo." {...register("price", { min: 2 }, { required: true })} />
                        {errors.seat && <p>This is field is required{errors.seat.message}</p>}
                    </div>
                </div>
                {
                    carPhotoUrl && (<input className="my-2 px-5 btn btn-warning" type="submit" />)
                }

            </form>



            {
                carPhotoUrl && (<div className="border my-3 d-flex justify-content-center">
                    <img style={{ height: '200px' }} src={carPhotoUrl} alt="" />
                </div>
                )
            }
        </div>
    );
};

export default AddCar;