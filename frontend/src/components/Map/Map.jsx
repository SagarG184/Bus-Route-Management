import React from 'react';
import { MapContainer, TileLayer, Polyline, Popup, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Create custom icons for different routes
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blackIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const getRouteIcon = (routeName) => {
    if (routeName.includes('Route 1')) return redIcon;
    if (routeName.includes('Route 2')) return blackIcon;
    return blueIcon;
};

const Map = ({ route, children }) => {
    // Center point between NIE South and North Campus
    const defaultCenter = [12.327510, 76.613193];
    const defaultZoom = 12; // Adjusted zoom level to show both campuses

    const renderRoute = () => {
        if (!route || !route.path) return null;

        const coordinates = route.path.map(point => point.coordinates);
        const routeColor = route.name.includes('Route 1') ? '#ff0000' : 
                          route.name.includes('Route 2') ? '#000000' : '#0000ff';

        return (
            <>
                <Polyline
                    positions={coordinates}
                    color={routeColor}
                    weight={3}
                >
                    <Popup>
                        <div>
                            <h3>{route.name}</h3>
                            <p>{route.description}</p>
                            <p>Duration: {route.estimatedDuration} mins</p>
                        </div>
                    </Popup>
                </Polyline>
                {route.path.map((point, index) => (
                    <Marker
                        key={index}
                        position={point.coordinates}
                        icon={getRouteIcon(route.name)}
                    >
                        <Popup>
                            <div>
                                <h3>{point.name}</h3>
                                <p>Time: {point.morningTime}</p>
                                <p>Distance: {point.distance}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </>
        );
    };

    return (
        <MapContainer
            center={defaultCenter}
            zoom={defaultZoom}
            style={{ height: '100%', width: '100%', position: 'relative' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution=""
            />
            {renderRoute()}
            {children}
        </MapContainer>
    );
};

export default Map;
