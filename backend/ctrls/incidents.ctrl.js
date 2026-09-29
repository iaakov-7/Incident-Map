import { createIncidentService } from "../services/incident.service.js";
import { incidentRepo } from "../repository/incident.repo.js";
import { ObjectId } from "mongodb";

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

export async function handleUpdateIncident(req, res) {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    const error = new Error("Invalid id");
    error.statusCode = 400;
    throw error;
  }
  const toUpdate = req.body;
  const io = req.app.get("io");
  const incident = await incidentRepo.findIncidentById(id);
  if (req.user.role !== "admin" && req.user.id !== incident.createdBy) {
    const error = new Error("Forbiden");
    error.statusCode = 403;
    throw error;
  }
  const updatedIncident = await incidentRepo.updateIncident(id, toUpdate);
  io.emit("incident:updated", updatedIncident);
  res.json({ success: true, data: updatedIncident });
}
