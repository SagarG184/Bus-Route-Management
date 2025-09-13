import React, { useState, useEffect, useCallback, memo } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline, useMap } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BusMap.css';

// Staff route data
const staffRoute = {
    name: 'Staff Route',
    routeNumber: 'SR-1',
    description: 'NIE Staff Transportation Route - North Campus Route',
    path: [
        {
            name: 'NIE South Campus',
            coordinates: [76.6414748, 12.2838184],
            isStop: true,
            distance: 0,
            morningTime: '8:00 AM'
        },
        {
            name: 'Dr Agarwals Eye Hospital',
            coordinates: [76.6308853, 12.2863179],
            isStop: true,
            distance: 1.5,
            morningTime: '8:10 AM'
        },
        {
            name: 'Udayaravi Road',
            coordinates: [76.6259848, 12.286828],
            isStop: true,
            distance: 2.8,
            morningTime: '8:15 AM'
        },
        {
            name: 'Andolana Circle',
            coordinates: [76.6174957, 12.2873558],
            isStop: true,
            distance: 4.2,
            morningTime: '8:20 AM'
        },
        {
            name: 'CESC KEB Office',
            coordinates: [76.612665, 12.2859004],
            isStop: true,
            distance: 5.5,
            morningTime: '8:25 AM'
        },
        {
            name: 'Bogadi 2nd Stage',
            coordinates: [76.6017229, 12.3049398],
            isStop: true,
            distance: 7.8,
            morningTime: '8:35 AM'
        },
        {
            name: 'Hootagalli',
            coordinates: [76.5839681, 12.3411354],
            isStop: true,
            distance: 12.5,
            morningTime: '8:45 AM'
        },
        {
            name: 'NIE North Campus',
            coordinates: [76.5849104, 12.371201],
            isStop: true,
            distance: 15.0,
            morningTime: '9:00 AM'
        }
    ]
};

// Available routes data
const routes = [
    staffRoute,
    {
        name: 'Student Route 2',
        routeNumber: 'STU-2',
        description: 'NIE Student Transportation Route 2 - Bogadi Route',
        path: [
            {
                name: 'NIE South Campus',
                coordinates: [76.6414748, 12.2838184],
                isStop: true,
                distance: 0,
                morningTime: '07:55'
            },
            {
                name: 'Dr Agarwals Eye Hospital',
                coordinates: [76.6308853, 12.2863179],
                isStop: true,
                distance: 1.2,
                morningTime: '08:00'
            },
            {
                name: 'Sri Shanthisagar Complex',
                coordinates: [76.6259848, 12.286828],
                isStop: true,
                distance: 2.5,
                morningTime: '08:10'
            },
            {
                name: 'Andolana Circle',
                coordinates: [76.6174957, 12.2873558],
                isStop: true,
                distance: 3.8,
                morningTime: '08:20'
            },
            {
                name: 'CESC KEB Office',
                coordinates: [76.6100, 12.2880],
                isStop: true,
                distance: 4.5,
                morningTime: '08:25'
            },
            {
                name: 'Bogadi 2nd Stage',
                coordinates: [76.5980, 12.2890],
                isStop: true,
                distance: 5.8,
                morningTime: '08:35'
            },
            {
                name: 'Hebbal',
                coordinates: [76.5900, 12.3000],
                isStop: true,
                distance: 7.2,
                morningTime: '08:45'
            },
            {
                name: 'NIE North Campus',
                coordinates: [76.5849104, 12.371201],
                isStop: true,
                distance: 9.0,
                morningTime: '08:55'
            }
        ]
    },
    {
        name: 'Student Route 3',
        routeNumber: 'STU-3',
        description: 'NIE Student Transportation Route 3 - Vijayanagar Route',
        path: [
            {
                name: 'NIE Golden Jubilee Block',
                coordinates: [76.6413163, 12.281489],
                isStop: true,
                distance: 0,
                morningTime: '07:45'
            },
            {
                name: 'Five Light Circle',
                coordinates: [76.6594702, 12.318044],
                isStop: true,
                distance: 2.1,
                morningTime: '07:55'
            },
            {
                name: 'Ballal Circle',
                coordinates: [76.6420594, 12.2952764],
                isStop: true,
                distance: 3.5,
                morningTime: '08:05'
            },
            {
                name: 'Mysore Fire Brigade Station',
                coordinates: [76.6351581, 12.3036054],
                isStop: true,
                distance: 4.8,
                morningTime: '08:15'
            },
            {
                name: 'Mathru Mandali Vidya Samasthe',
                coordinates: [76.6294732, 12.3219253],
                isStop: true,
                distance: 6.2,
                morningTime: '08:25'
            },
            {
                name: 'Chandrakala Hospital',
                coordinates: [76.6195275, 12.3257279],
                isStop: true,
                distance: 7.5,
                morningTime: '08:30'
            },
            {
                name: '2nd Main Road',
                coordinates: [76.6420913, 12.3272753],
                isStop: true,
                distance: 8.8,
                morningTime: '08:35'
            },
            {
                name: 'Vijay Nagar Main Road',
                coordinates: [76.6142747, 12.3435479],
                isStop: true,
                distance: 10.2,
                morningTime: '08:40'
            },
            {
                name: '25th Cross Road',
                coordinates: [76.6074018, 12.343527],
                isStop: true,
                distance: 11.5,
                morningTime: '08:45'
            },
            {
                name: 'NIE North Campus',
                coordinates: [76.5849104, 12.371201],
                isStop: true,
                distance: 13.0,
                morningTime: '08:55'
            }
        ]
    }
];

// Calculate arrival time based on distance and route
const calculateArrivalTime = (startTime, endTime, distance, totalDistance, routeNumber) => {
    // Different end times for different routes
    const routeEndTime = routeNumber === 'STU-2' ? '08:53' : endTime;
    
    // Convert start and end time to minutes since midnight
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = routeEndTime.split(':').map(Number);
    const startTimeInMinutes = startHours * 60 + startMinutes;
    const endTimeInMinutes = endHours * 60 + endMinutes;
    
    // Calculate total duration in minutes
    const totalDuration = endTimeInMinutes - startTimeInMinutes;
    
    // Calculate time based on proportion of total distance
    const timeOffset = Math.round((distance / totalDistance) * totalDuration);
    
    // Calculate new time
    const newMinutes = startTimeInMinutes + timeOffset;
    const newHours = Math.floor(newMinutes / 60);
    const remainingMinutes = newMinutes % 60;
    
    // Format time
    return `${String(newHours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}`;
};

// Process route data to update times based on distance
const processRouteData = (route) => {
    if (!route || !route.path || route.path.length === 0) return route;

    const processedRoute = { ...route };
    const startTime = '08:00'; // Fixed start time
    const endTime = '08:55';   // Fixed end time at destination
    const totalDistance = route.path[route.path.length - 1].distance;

    processedRoute.path = route.path.map(point => ({
        ...point,
        calculatedTime: calculateArrivalTime(startTime, endTime, point.distance, totalDistance, route.routeNumber)
    }));

    return processedRoute;
};

// Process all routes
const processedRoutes = routes.map(route => processRouteData(route));

const BusMap = () => {
    const [selectedRoutes, setSelectedRoutes] = useState([]);
    const [showAllRoutes, setShowAllRoutes] = useState(true);

    // Custom marker icon for bus stops - different colors for different routes
    const getBusStopIcon = useCallback((routeNumber) => {
        const color = routeNumber === 'SR-1' ? '#00008B' : '#654321'; // Dark Blue for Staff Route, Brown for others
        return new L.divIcon({
            className: 'stop-marker',
            html: `<div class="stop-dot" style="background-color: ${color};"></div>`,
            iconSize: [16, 16]
        });
    }, []);

    // Center map on selected routes
    const MapController = () => {
        const map = useMap();
        
        useEffect(() => {
            if (!map) return;

            if (showAllRoutes) {
                const allPoints = processedRoutes.flatMap(route => 
                    route.path.map(point => [point.coordinates[1], point.coordinates[0]])
                );
                const bounds = L.latLngBounds(allPoints);
                map.fitBounds(bounds, { padding: [50, 50] });
            } else if (selectedRoutes.length > 0) {
                const selectedPoints = processedRoutes
                    .filter(route => selectedRoutes.includes(route.routeNumber))
                    .flatMap(route => route.path.map(point => [point.coordinates[1], point.coordinates[0]]));
                const bounds = L.latLngBounds(selectedPoints);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }, [map, selectedRoutes, showAllRoutes, processedRoutes]);

        return null;
    };

    // Handle route selection/deselection
    const handleRouteClick = useCallback((routeNumber) => {
        if (routeNumber === '') {
            setShowAllRoutes(true);
            setSelectedRoutes([]);
        } else {
            setShowAllRoutes(false);
            setSelectedRoutes(prev => {
                if (prev.includes(routeNumber)) {
                    // Deselect route if already selected
                    const newSelection = prev.filter(r => r !== routeNumber);
                    // If no routes selected, show all routes
                    if (newSelection.length === 0) {
                        setShowAllRoutes(true);
                    }
                    return newSelection;
                } else {
                    // Select new route
                    return [...prev, routeNumber];
                }
            });
        }
    }, []);

    return (
        <div className="map-container">
            <div className="route-selector">
                <button 
                    className={`route-button ${showAllRoutes ? 'active' : ''}`}
                    onClick={() => handleRouteClick('')}
                >
                    Show All Routes
                </button>
                {processedRoutes.map(route => (
                    <button
                        key={route.routeNumber}
                        className={`route-button ${selectedRoutes.includes(route.routeNumber) ? 'active' : ''}`}
                        onClick={() => handleRouteClick(route.routeNumber)}
                    >
                        {route.name}
                    </button>
                ))}
            </div>
            <MapContainer
                center={[12.2958, 76.6394]}
                zoom={13}
                style={{ height: '100vh', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                <MapController />

                {showAllRoutes ? (
                    // Show all routes
                    processedRoutes.map(route => (
                        <RouteDisplay 
                            key={route.routeNumber} 
                            route={route} 
                            getBusStopIcon={getBusStopIcon}
                        />
                    ))
                ) : (
                    // Show selected routes
                    selectedRoutes.map(routeNumber => {
                        const route = processedRoutes.find(r => r.routeNumber === routeNumber);
                        return route ? (
                            <RouteDisplay 
                                key={route.routeNumber} 
                                route={route} 
                                getBusStopIcon={getBusStopIcon}
                            />
                        ) : null;
                    })
                )}
            </MapContainer>
        </div>
    );
};

// Route display component to avoid code duplication
const RouteDisplay = memo(({ route, getBusStopIcon }) => {
    return (
        <React.Fragment>
            <Polyline
                positions={route.path.map(point => [point.coordinates[1], point.coordinates[0]])}
                pathOptions={{
                    color: route.routeNumber === 'SR-1' ? '#ff0000' : 
                           route.routeNumber === 'STU-2' ? '#0000ff' : '#4B0082',
                    weight: 4,
                    opacity: 0.8,
                    lineCap: 'round',
                    lineJoin: 'round'
                }}
            />
            {route.path
                .filter(point => point.isStop)
                .map((point, index) => (
                    <Marker
                        key={`${route.routeNumber}-${index}`}
                        position={[point.coordinates[1], point.coordinates[0]]}
                        icon={getBusStopIcon(route.routeNumber)}
                    >
                        <Tooltip 
                            permanent={false}
                            direction="top"
                            offset={[0, -8]}
                        >
                            <div>
                                <strong>{point.name}</strong><br />
                                Estimated Time: {point.calculatedTime}<br />
                                Distance: {point.distance.toFixed(1)} km<br />
                                Route: {route.name}
                            </div>
                        </Tooltip>
                    </Marker>
                ))
            }
            <RouteArrows positions={route.path.map(point => [point.coordinates[1], point.coordinates[0]])} />
        </React.Fragment>
    );
});

RouteDisplay.displayName = 'RouteDisplay';

// Route arrows component
const RouteArrows = ({ positions }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || positions.length < 2) return;

        const arrows = [];
        const arrowSpacing = 2; // Show arrows more frequently

        for (let i = 0; i < positions.length - 1; i += arrowSpacing) {
            const p1 = positions[i];
            const p2 = positions[i + 1];
            if (!p2) continue;

            const midPoint = L.latLng(
                (p1[0] + p2[0]) / 2,
                (p1[1] + p2[1]) / 2
            );

            const angle = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;

            const arrowIcon = L.divIcon({
                className: 'arrow-marker',
                html: `<div class="arrow" style="transform: rotate(${angle}deg)">→</div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            const arrow = L.marker(midPoint, { icon: arrowIcon }).addTo(map);
            arrows.push(arrow);
        }

        return () => {
            arrows.forEach(arrow => map.removeLayer(arrow));
        };
    }, [map, positions]);

    return null;
};

export default BusMap;
