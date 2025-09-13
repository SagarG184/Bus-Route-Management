import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const MapBoundsAdjuster = ({ route }) => {
    const map = useMap();

    useEffect(() => {
        if (route && route.path.length > 0) {
            const points = route.path.map(point => point.coordinates);
            const bounds = L.latLngBounds(points);
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [map, route]);

    return null;
};

export default MapBoundsAdjuster;
