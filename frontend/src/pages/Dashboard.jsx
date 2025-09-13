import React from 'react';
import BusMap from '../components/Map/BusMap';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '0',  
    },
    container: {
        width: '100%',
        height: '100vh',  
        backgroundColor: 'white',
        overflow: 'hidden',
        display: 'flex',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
        width: '100%',
        height: '100%',
    },
}));

const Dashboard = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.mapContainer}>
                    <BusMap />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
