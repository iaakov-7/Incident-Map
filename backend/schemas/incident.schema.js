import { z } from "zod";

export const incidentSchema = z.object({
  title: z.string("כותרת נדרשת וצריכה להיות מחרוזת"),
  description: z.string("תיאור האירוע נדרש וצריך להיות מחרוזת"),
  category: z.enum(
    ["fire", "flood", "accident", "medical", "other"],
    "fire | flood | accident | medical | other קטוגריה צריכה להיות או",
  ),
  location: z.object(
    { lat: z.number(), lng: z.number() },
    "מיקום צריך להיות אובייקט עם נקודות אורך או רוחב",
  ),
});
