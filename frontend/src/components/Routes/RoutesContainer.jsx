import React, { useState } from 'react';
import RoutesList from './RoutesList';
import Map from '../Map/Map';
import './Routes.css';

const RoutesContainer = () => {
    const [selectedRoute, setSelectedRoute] = useState(null);

    return (
        <div className="routes-container">
            <div className="map-container">
                <Map route={selectedRoute} />
            </div>
            <div className="routes-list-wrapper">
                <RoutesList onRouteSelect={setSelectedRoute} />
            </div>
        </div>
    );
};

export default RoutesContainer;
