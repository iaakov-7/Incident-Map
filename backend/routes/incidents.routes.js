import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { validateBody } from "../middlewares/validations.midlleware.js";
import {
  incidentSchema,
  incidentSchemaForUpdate,
} from "../schemas/incident.schema.js";
import {
  handleCreateIncident,
  handleDeleteIncident,
  handleUpdateIncident,
} from "../ctrls/incidents.ctrl.js";

export const router = express.Router();

router.post(
  "/",
  verifyToken,
  validateBody(incidentSchema),
  handleCreateIncident,
);

router.patch(
  "/:id",
  verifyToken,
  validateBody(incidentSchemaForUpdate),
  handleUpdateIncident,
);

router.delete("/:id", verifyToken, handleDeleteIncident);
