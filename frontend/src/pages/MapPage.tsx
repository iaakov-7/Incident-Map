import { useEffect, useState } from "react";
import { api } from "../api";
import type { Response } from "../types";
import { useIncidentsStore } from "../store/useIncidentStore";
import type { AxiosError } from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapPage = () => {
  const { setIncidents, incidents } = useIncidentsStore();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>();
  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<Response>("/incidents");
        if (response.data.success) {
          setIncidents(response.data.data);
        }
      } catch (err) {
        const error = err as AxiosError<Response>;
        const serverError = error.response?.data.message || "תקלה פנימית";
        setErrorMessage(serverError);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  if (isLoading) return <p>טוען נתונים...</p>;
  if (errorMessage) return <p>{errorMessage}</p>;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <MapContainer
        center={[31.7838, 35.2205]}
        zoom={13}
        style={{
          marginTop: "50px",
          height: "80vh",
          width: "80vw",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.map((inc) => (
          <Marker position={[inc.location.lat, inc.location.lng]}>
            <Popup>
              <h3>{inc.title}</h3>
              <p>{inc.description}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
