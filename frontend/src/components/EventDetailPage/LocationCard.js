import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getLocationDetailById, getLocationPhoto } from '../../network';
import StarRatings from 'react-star-ratings';

export default function LocationCard({ nearby }) {
    const classes = useStyles();
    const [photoUrl, setPhotoUrl] = useState('');
    const [detail, setDetail] = useState({});

    useEffect(() => {
        (async () => {
            try {
                // Find location detail by place_id
                const locationDetailRes = await getLocationDetailById({
                    place_id: nearby.place_id,
                });

                if (locationDetailRes) {
                    setDetail(locationDetailRes);
                }

                // Fetch location photo
                if (
                    locationDetailRes?.photos &&
                    locationDetailRes?.photos.length > 0
                ) {
                    const photoRes = await getLocationPhoto({
                        photo_reference:
                            locationDetailRes.photos[0]?.photo_reference,
                    });

                    setPhotoUrl(photoRes);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [nearby.place_id]);

    return (
        <Card className={classes.root}>
            <CardContent className={classes.cardContent}>
                <CardMedia
                    className={classes.image}
                    component="img"
                    alt={detail.name}
                    image={photoUrl || 'https://i.imgur.com/Whefbkg.png'}
                />
                <div className={classes.detailContainer}>
                    <Typography className={classes.name} variant="h5">
                        {detail.name}
                    </Typography>
                    <StarRatings
                        rating={detail.rating}
                        starRatedColor="#FF9529"
                        starDimension="20px"
                        starSpacing="3px"
                    />
                    <span className={classes.userRatingTotal}>{`(${
                        detail.user_ratings_total || 0
                    })`}</span>
                    <Typography className={classes.text} component="p">
                        {detail.formatted_phone_number}
                    </Typography>
                    <Typography className={classes.text} component="p">
                        {detail.formatted_address}
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.3)',
        margin: '20px 0',
        borderRadius: 20,
    },
    cardContent: {
        display: 'flex',
    },
    image: {
        width: 250,
        height: 200,
    },
    detailContainer: {
        padding: '0 50px',
    },
    name: {
        marginBottom: 10,
        textTransform: 'capitalize',
    },
    userRatingTotal: {
        marginLeft: 10,
        fontSize: 15,
    },
    text: {
        margin: '10px 0',
    },
    hour: {
        fontSize: 15,
    },
}));
