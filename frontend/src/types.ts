export interface Response {
  success: boolean;
  message?: string;
  data?: object;
}

interface Location {
  lat: number;
  lng: number;
}

export interface Incident {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  location: Location;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IncidentsStore {
  incidents: Incident[];
  setIncidents: (incidents: Incident[]) => void;
  addIncident: (incident: Incident) => void;
  updateIncident: (incident: Incident) => void;
  removeIncident: (id: string) => void;
}
