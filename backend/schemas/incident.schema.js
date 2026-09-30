import { z } from "zod";

export const incidentSchema = z.object({
  title: z.string("כותרת נדרשת וצריכה להיות מחרוזת"),
  description: z.string("תיאור האירוע נדרש וצריך להיות מחרוזת"),
  category: z.enum(
    ["fire", "flood", "accident", "medical", "other"],
    "fire | flood | accident | medical | other קטוגריה צריכה להיות או",
  ),
  location: z.object(
    { lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) },
    "מיקום צריך להיות אובייקט עם נקודות אורך או רוחב",
  ),
});

export const incidentSchemaForUpdate = incidentSchema.partial().extend({
  status: z
    .enum(
      ["open", "in_progress", "closed"],
      "סטטוס צריך להיות open | in_progrss | closed",
    )
    .optional(),
});
