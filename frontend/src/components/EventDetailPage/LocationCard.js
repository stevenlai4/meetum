import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    CardActionArea,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getLocationPhoto } from '../../network';
import StarRatings from 'react-star-ratings';

export default function LocationCard({ nearby }) {
    const classes = useStyles();
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        (async () => {
            try {
                if (nearby.photos && nearby.photos.length > 0) {
                    const response = await getLocationPhoto({
                        photo_reference: nearby.photos[0]?.photo_reference,
                    });

                    setPhotoUrl(response);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, [nearby.photos]);

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent className={classes.cardContent}>
                    <CardMedia
                        className={classes.image}
                        component="img"
                        alt={nearby.name}
                        image={photoUrl || 'https://i.imgur.com/Whefbkg.png'}
                    />
                    <div className={classes.detailContainer}>
                        <Typography className={classes.name} variant="h5">
                            {nearby.name}
                        </Typography>
                        <StarRatings
                            rating={nearby.rating}
                            starRatedColor="#FF9529"
                            starDimension="20px"
                            starSpacing="3px"
                        />
                        <span className={classes.userRatingTotal}>{`(${
                            nearby.user_ratings_total || 0
                        })`}</span>
                    </div>
                </CardContent>
            </CardActionArea>
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
    },
    userRatingTotal: {
        marginLeft: 10,
        fontSize: 15,
    },
}));
