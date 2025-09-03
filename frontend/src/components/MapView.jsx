import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function MapView({ reports }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "400px" }}
      center={{ lat: 28.6139, lng: 77.2090 }} // Default: Delhi
      zoom={12}
    >
      {reports.map((r) => (
        <Marker key={r._id} position={{ lat: r.location.lat, lng: r.location.lng }} />
      ))}
    </GoogleMap>
  );
}
