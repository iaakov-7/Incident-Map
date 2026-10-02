import { useState, type FormEvent } from "react";
import { api } from "../api";
import type { Response } from "../types";
import type { AxiosError } from "axios";

const CreateIncForm = ({
  latlng,
  setIsCreateForm,
}: {
  latlng: { lat: number; lng: number } | any;
  setIsCreateForm: (bool: boolean) => void;
}) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [category, setCategory] = useState<string>("fire");
  const [message, setMessage] = useState<string>();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post<Response>("/incidents", {
        title,
        description,
        category,
        location: latlng,
      });
      if (res.data.success) {
        setMessage("אירוע עודכן בהצלחה");
        setTimeout(() => {
          setIsCreateForm(false);
        }, 4000);
      }
    } catch (err) {
      const error = err as AxiosError<Response>;
      const serverMsg = error.response?.data.message || "תקלה פנימית";
      setMessage(serverMsg);
    }
  };
  return (
    <>
      <form
        style={{ zIndex: "100", position: "absolute" }}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>
          כותרת
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          תיאור המקרה
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          קטגוריה
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="fire">אירוע שריפה</option>
            <option value="flood">אירוע שיטפון</option>
            <option value="accident">תאונה</option>
            <option value="medical">אירוע רפואי</option>
            <option value="other">אחר</option>
          </select>
        </label>
        <label>
          נקודות אורך ורוחב
          <input type="text" value={`${latlng.lat} ${latlng.lng}`} />
        </label>
        <button type="submit">שלח</button>
      </form>
      {message && <h3>{message}</h3>}
    </>
  );
};

export default CreateIncForm;
