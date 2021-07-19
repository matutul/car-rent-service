import React, { useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, DistanceMatrixService } from '@react-google-maps/api';
import { useState } from 'react';
import { useContext } from 'react';
import { bookingContext } from '../BookRide/BookRide';


const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '10px',
    border: "2px solid darkgray"
};

const center = {
    lat: 23.811056,
    lng: 90.407608
};

const Map = () => {
    const [directionResponse, setDirectionResponse] = useState(null);
    const [distanceResponse, setDistanceResponse] = useState(null);
    const [bookingInfo, setBookingInfo] = useContext(bookingContext);

    useEffect(() => {
        const updateDistance = {...bookingInfo};
        updateDistance.distanceResponse = distanceResponse;
        setBookingInfo(updateDistance);
    }, [distanceResponse])
    
    useEffect(() => {
        setDirectionResponse(null);
        setDistanceResponse(null);
    }, [bookingInfo?.start, bookingInfo?.end])

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyBtnxQZZMsDLBs4OlHBq2p1MduIYnljkW0"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                className="map"
            >
                {
                    (directionResponse == null) && (bookingInfo.start && bookingInfo.end) && (
                        <DirectionsService
                            // required
                            options={{
                                destination: bookingInfo?.end,
                                origin: bookingInfo?.start,
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
                    (distanceResponse == null) && (bookingInfo.start && bookingInfo.end) && (
                        <DistanceMatrixService
                            options={{
                                destinations: [bookingInfo?.end],
                                origins: [bookingInfo?.start],
                                travelMode: "DRIVING"
                            }}
                            callback={res => {
                                if (res !== null) {
                                    setDistanceResponse(res.rows[0].elements[0]);
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