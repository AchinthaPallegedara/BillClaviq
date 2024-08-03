import { z } from "zod";

export const userAddformSchema = z.object({
  cName: z.string().min(2).max(50),
  cEmail: z.string().email(),
  cPhone: z.string(),
  cAddress: z.string().min(2).max(50),
  cCity: z.string().min(2).max(50),
  cProvince: z.string().min(2).max(50),
  cPostalCode: z.string(),
  cCountry: z.string().min(2).max(50),
  cWebsite: z.optional(z.string().url()),
  cLogo: z.string().url(),
});
