import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './Routes.css';

const RoutesList = ({ onRouteSelect }) => {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRouteId, setSelectedRouteId] = useState('');

    const fetchRoutes = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/routes');
            setRoutes(response.data);
            if (response.data.length > 0) {
                setSelectedRouteId(response.data[0]._id);
                onRouteSelect(response.data[0]);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching routes:', err);
            setError('Failed to fetch routes: ' + err.message);
            setLoading(false);
        }
    }, [onRouteSelect]);

    useEffect(() => {
        fetchRoutes();
    }, [fetchRoutes]);

    const handleRouteChange = (event) => {
        const routeId = event.target.value;
        setSelectedRouteId(routeId);
        const selectedRoute = routes.find(route => route._id === routeId);
        onRouteSelect(selectedRoute || null);
    };

    if (loading) return <div className="loading-text">Loading routes...</div>;
    if (error) return <div className="error-text">{error}</div>;

    return (
        <div className="routes-list-container">
            <h2 className="routes-list-title">Bus Route Details</h2>
            
            <select 
                className="route-selector"
                value={selectedRouteId}
                onChange={handleRouteChange}
            >
                <option value="">Select a route</option>
                {routes.map(route => (
                    <option key={route._id} value={route._id}>
                        {route.name}
                    </option>
                ))}
            </select>

            <ul className="stops-list">
                <li className="stop-item">
                    <span className="stop-name">NIE South Campus</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">Vidyaranyapura Main Road</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">Mysore Palace</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">Saraswathipuram</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">Mohad Bone Setters</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">Metagalli Junction</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">Hootagalli Industrial Area</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
                <li className="stop-item">
                    <span className="stop-name">NIE North Campus</span>
                    <span className="stop-time">NaN:NaN</span>
                </li>
            </ul>
        </div>
    );
};

export default RoutesList;
