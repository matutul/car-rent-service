import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, DistanceMatrixService } from '@react-google-maps/api';
import { useState } from 'react';
import { useContext } from 'react';
import { bookingContext } from '../BookRide/BookRide';


const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
    // border: "2px solid darkgray",
    boxShadow: "3px 3px 16px 2px rgba(102,102,102,0.64)"
};

const center = {
    lat: 23.811056,
    lng: 90.407608
};

const Map = () => {

    const [bookingInfo, setBookingInfo] = useContext(bookingContext);
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distanceMatrixResponse, setDistanceMatrixResponse] = useState(null);

    useEffect(() => {

        if (distanceMatrixResponse != null) {
            const updateDistance = { ...bookingInfo };
            updateDistance.distanceResponse = distanceMatrixResponse;
            updateDistance.car = [];
            updateDistance.updown = false;
            delete updateDistance.updateDistance;
            setBookingInfo(updateDistance);
            localStorage.setItem('bookingInfo', JSON.stringify(updateDistance));
        }
    }, [distanceMatrixResponse])

    useEffect(() => {
        setDirectionResponse(null);
        setDistanceMatrixResponse(null);
    }, [bookingInfo?.data?.start, bookingInfo?.data?.end])

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyB8Q5le6qxtQKy1os8hzDJ4_BLSXCJR0VI"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                className="map"
            >
                {
                    (directionResponse == null) && (bookingInfo?.data?.start && bookingInfo?.data?.end) && (
                        <DirectionsService
                            // required
                            options={{
                                destination: bookingInfo?.data?.end,
                                origin: bookingInfo?.data?.start,
                                travelMode: "DRIVING"
                            }}
                            // required
                            callback={res => {
                                if (res !== null) {
                                    setDirectionResponse(res);
                                }
                            }}
                        />
                    )
                }


                {
                    (distanceMatrixResponse == null) && (bookingInfo?.data?.start && bookingInfo?.data?.end) && (
                        <DistanceMatrixService
                            options={{
                                destinations: [bookingInfo?.data?.end],
                                origins: [bookingInfo?.data?.start],
                                travelMode: "DRIVING"
                            }}
                            callback={res => {
                                if (res !== null) {
                                    setDistanceMatrixResponse(res.rows[0].elements[0]);
                                }
                            }}
                        />
                    )
                }


                {
                    directionResponse && (
                        <DirectionsRenderer
                            // required
                            options={{
                                directions: directionResponse
                            }}
                        />
                    )
                }

            </GoogleMap>
        </LoadScript>
    );
};

export default Map;