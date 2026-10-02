import { useMapEvents } from "react-leaflet";

const ClickMap = ({
  onMapClick,
  setIsCreateForm,
}: {
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  setIsCreateForm: (bool: boolean) => void;
}) => {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
      setIsCreateForm(true);
    },
  });
  return null;
};

export default ClickMap;
