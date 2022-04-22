import { useFetch } from "../hooks/useFetch";
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';

import { useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

import './userDetail.css'
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
export default function UserDetail() {

    interface User {
        login: {
            uuid: string
        },
        name: {
            title: string,
            first: string,
            last: string
        };
        gender: string;
        nat: string;
        email: string;
        location: {
            latitude: number,
            longitude: number,
        };
        picture: {
            large: string
        }
    }

    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const { data: userData, isFetching } =
        useFetch<User[]>(``);

    return (
        <>
            {isFetching && <p>Loading...</p>}

            {userData?.map((user) => {
                [user.location.latitude, user.location.longitude] = selectedPosition;
                let flag = user.nat.toLowerCase()
                const fullName = [user.name.first, " ", user.name.last]
                return (
                    <>

                        <Card sx={{ display: 'flex', maxWidth: 400 }} key={user.login.uuid}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        {fullName}
                                    </Typography>

                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        {user.email}
                                    </Typography>
                                </CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                                    <IconButton aria-label="previous">
                                        {user.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
                                    </IconButton>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 36, height: 26 }}
                                        image={`https://flagcdn.com/48x36/${flag}.png`}
                                        alt="Live from space album cover"
                                    />
                                </Box>
                            </Box>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={user.picture.large}
                                alt="Live from space album cover"
                            />
                        </Card>

                        <div className="mapWrapper">
                            <MapContainer
                                center={selectedPosition}
                                zoom={15}
                                scrollWheelZoom={false}
                                dragging={false}
                                doubleClickZoom={false}
                                attributionControl={false}
                                zoomControl={false}
                            >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker position={selectedPosition}>
                                    <Popup>
                                        <p>{fullName}'s House.</p>
                                    </Popup>

                                </Marker>
                            </MapContainer>

                        </div>

                    </>
                );
            })}
        </>
    )
}