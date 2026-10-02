import { useEffect } from "react";
import { io } from "socket.io-client";
import { useIncidentsStore } from "../store/useIncidentStore";
const socket = io("http://localhost:3000");

const SocketMnager = () => {
  const { addIncident } = useIncidentsStore();
  useEffect(() => {
    socket.on("incident:created", (newIncident) => {
      addIncident(newIncident);
    });
  });
  return null;
};

export default SocketMnager;
