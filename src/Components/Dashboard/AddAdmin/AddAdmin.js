import React from 'react';
import { useForm } from "react-hook-form";
import { useState } from 'react';

const AddAdmin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [adminPhotoUrl, setAdminPhotoUrl] = useState("");


    const onSubmit = data => {
        if (adminPhotoUrl) {
            data.photo = adminPhotoUrl;
        }
        else{
            data.photo = "N/A";
        }

        fetch('https://rocky-waters-70556.herokuapp.com/addAdmin', {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    alert("Admin is added successfully")
                    setAdminPhotoUrl("");
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
                // console.log(data);
                const photoUrl = data?.data?.thumb.url;
                setAdminPhotoUrl(photoUrl);
            })
    }


    return (
        <div>
            <h3>Add New Admin:</h3>
            <form className="border p-4 rounded mt-3 shadow" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="row">
                    <div className="col-md-6">
                        <input className="form-control my-2" placeholder="Name" {...register("name", { required: true })} />
                        {errors.carName && <p>This is field is required</p>}
                    </div>

                    <div className="col-md-6">
                        <input label="Email" className="form-control my-2" {...register("email", {
                            required: "You must specify an email",
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "This is not a valid email address."
                            }
                        })} placeholder="Your email" />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>


                    <div className="col-md-6">
                        <input className="w-100 my-2 py-1" type="file" {...register("photo")} onChange={(event) => handleImageUpload(event)} />
                    </div>
                </div>
                <input className="my-2 px-5 btn btn-warning" type="submit" />

            </form>



            {
                adminPhotoUrl && (<div className="border my-3 d-flex justify-content-center">
                    <img style={{ height: '200px' }} src={adminPhotoUrl} alt="" />
                </div>
                )
            }
        </div>
    );
};

export default AddAdmin;