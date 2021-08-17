import React from 'react';
import './AddCar.css';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import ModalSection from '../../Modal/ModalSection';

const AddCar = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [carPhotoUrl, setCarPhotoUrl] = useState("");
    const [show, setShow] = useState(false);

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
                    // alert("Car is added successfully")
                    setShow(true);
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
                const photoUrl = data?.data?.display_url || "";
                setCarPhotoUrl(photoUrl);
            })
    }

    const modalData = {
        type: 'inform',
        title: 'Success message',
        body: 'Car is added successfully'
    }

    console.log(carPhotoUrl);

    return (
        <div>
            <h3>Add New Car:</h3>
            <form className="border p-4 rounded mt-3 shadow" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="row">
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Car name" {...register("carName", { required: "Specify a car name" })} />
                        {errors.carName && <p className="text-warning w-100">{errors.carName.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Model name" {...register("modelName", { required: "Specify model name" })} />
                        {errors.modelName && <p className="text-warning">{errors.modelName.message}</p>}
                    </div>
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Model year" {...register("modelYear", { required: "Specify model year" })} />
                        {errors.modelYear && <p className="text-warning">{errors.modelYear.message}</p>}
                    </div>

                    {/* include validation with required or other standard HTML validation rules */}
                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 px-3 form-control" placeholder="Register number" {...register("number", { required: "Specify car registration number" })} />
                        {errors.number && <p className="text-warning">{errors.number.message}</p>}
                    </div>
                    {/* <div className="col-md-6">
                        <input type="number" className="w-100 my-2 py-1 px-3 form-control" placeholder="Mileage" {...register("mileage", { required: "Specify car mileage" })} />
                        {errors.mileage && <p className="text-warning">{errors.mileage.message}</p>}
                    </div> */}


                    <div className="col-md-6">
                        <input type="number" className="w-100 my-2 py-1 px-3 form-control" placeholder="Passenger seat" {...register("seat",
                            { required: "Specify quantity of passenger seat", min: 2, max: 20 }
                        )} />
                        {errors.seat && <p className="text-warning">{errors.seat.message || "Select a value from 2 to 20"}</p>}
                    </div>


                    <div className="col-md-6">
                        <input type="number" className="w-100 my-2 py-1 px-3 form-control" placeholder="Rent per day" {...register("rent",
                            { required: "Specify car rent per day", min: 0 }
                        )} />
                        {errors.rent && <p className="text-warning">{errors.rent.message || "Select a positive value"}</p>}
                    </div>


                    <div className="col-md-6">
                        <input type="number" className="w-100 my-2 py-1 px-3 form-control" placeholder="Price per kilometer" {...register("price",
                            { required: "Specify price per kilometer", min: 0 }
                        )} />
                        {errors.price && <p className="text-warning">{errors.price.message || "Select a positive value"}</p>}
                    </div>


                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1 form-control" type="file" {...register("photo", { required: "Upload a car image" })} onChange={(event) => handleImageUpload(event)} />
                        {errors.photo && <p className="text-warning">{errors.photo.message}</p>}
                    </div>
                </div>
                <input className="my-2 px-5 btn btn-warning" type="submit" disabled={carPhotoUrl.length > 0 ? false : true} />

            </form>



            {
                carPhotoUrl && (<div className="border my-3 d-flex justify-content-center">
                    <img style={{ height: '200px' }} src={carPhotoUrl} alt="" />
                </div>
                )
            }
            <ModalSection information={modalData} showState={[show, setShow]}></ModalSection>
        </div>
    );
};

export default AddCar;