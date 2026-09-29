import { success } from "zod";
import { createIncidentService } from "../services/incident.service.js";

const incidentSerice = createIncidentService();

export async function handleCreateIncident(
  /** @type {import("express").Request} */ req,
  res,
) {
  const userId = req.user.id;
  const { title, description, category, location } = req.body;
  const newIncident = await incidentSerice.createIncident(
    userId,
    title,
    description,
    category,
    location,
  );
  const io = req.app.get("io");
  io.emit("incident:created", newIncident);
  res.status(201).json({ success: true, data: newIncident });
}
