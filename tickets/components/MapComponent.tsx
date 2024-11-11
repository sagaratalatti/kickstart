import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface MapComponentProps {
  latitude: number;
  longitude: number;
  radius: number;
  onRadiusChange: (radius: number) => void;
  onLocationChange: (lat: number, lng: number) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  latitude,
  longitude,
  radius,
  onRadiusChange,
  onLocationChange,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<google.maps.Circle | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
      version: 'weekly',
      libraries: ['places'],
    });

    loader.load().then(() => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: latitude, lng: longitude },
        zoom: 15,
        styles: [
          {
            featureType: 'all',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#c9c9c9' }],
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#9e9e9e' }],
          },
        ],
      });

      const circle = new google.maps.Circle({
        strokeColor: '#805AD5',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#805AD5',
        fillOpacity: 0.2,
        map,
        center: { lat: latitude, lng: longitude },
        radius,
        editable: true,
      });

      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map,
        draggable: true,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: '#805AD5',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2,
        },
      });

      circleRef.current = circle;
      markerRef.current = marker;

      google.maps.event.addListener(circle, 'radius_changed', () => {
        const newRadius = Math.max(200, Math.round(circle.getRadius()));
        onRadiusChange(newRadius);
      });

      google.maps.event.addListener(marker, 'dragend', () => {
        const position = marker.getPosition();
        if (position) {
          const lat = position.lat();
          const lng = position.lng();
          circle.setCenter(position);
          onLocationChange(lat, lng);
        }
      });
    });

    return () => {
      if (circleRef.current) circleRef.current.setMap(null);
      if (markerRef.current) markerRef.current.setMap(null);
    };
  }, []);

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.setRadius(radius);
    }
  }, [radius]);

  useEffect(() => {
    if (circleRef.current && markerRef.current) {
      const position = { lat: latitude, lng: longitude };
      circleRef.current.setCenter(position);
      markerRef.current.setPosition(position);
    }
  }, [latitude, longitude]);

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};