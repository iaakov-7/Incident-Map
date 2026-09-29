import { incidentRepo } from "../repository/incident.repo.js";

export function createIncidentService(repo = incidentRepo) {
  async function createIncident(
    userId,
    title,
    description,
    category,
    location,
  ) {
    const newIncident = {
      title,
      description,
      category,
      status: "open",
      location,
      createdBy: userId,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };

    const result = await repo.insertIncident(newIncident);
    return result;
  }
  return { createIncident };
}
