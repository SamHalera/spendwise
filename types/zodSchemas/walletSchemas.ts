import * as z from "zod";

export const createWalletSchema = z.object({
  id: z.number(),
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Don't forget to give a name!" }),
  balance: z
    .string()
    .min(1, { message: "Balance is required" })
    .refine(
      (val) =>
        Math.sign(parseFloat(val)) === 1 ||
        Math.sign(parseFloat(val)) === -1 ||
        Math.sign(parseFloat(val)) === 0,
      {
        message: "Only numbers (positive or negative)",
      }
    ),
});
