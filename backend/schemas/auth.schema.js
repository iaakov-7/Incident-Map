import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email("כתובת מייל לא חוקית"),
  passwrd: z.string().min(8, "סיסמא צריכה להכיל לפחות 8 תווים"),
});
