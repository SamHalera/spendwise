import { z } from "zod";

export const transactionFormSchema = z.object({
  id: z.number(),
  walletId: z.number(),
  label: z
    .string()
    .min(1, { message: "Label for your transaction is required" }),
  type: z.string().min(1, { message: "Type for your transaction is required" }),
  isFixed: z.boolean({ required_error: "Required" }),
  date: z.date({ required_error: "Date field is required" }),

  // amount: z
  //   .string()
  //   .transform((val) => parseFloat(val))
  //   .refine((val) => !isNaN(val), { message: "Invalid number" }),
  amount: z
    .string()
    .min(1, { message: "Balance is required" })
    .refine((val) => validateAmount(val) === true, {
      message: "Only positive numbers",
    }),
  transactionStatus: z.string(),
  paymentMethod: z
    .string()
    .min(1, { message: "A payment method for your transaction is required" }),
});

const validateAmount = (value: string) => {
  const strToArr = value.split("");

  const parsedStr = strToArr
    .map((item, index) => {
      if (index === 0 && item === "0") {
        return;
      } else if (item === "," || item === ".") {
        return ".";
      }
      return item;
    })
    .filter((item) => {
      if (item && (!isNaN(parseInt(item)) || item === ".")) {
        return true;
      }
    })
    .join("");

  if (parseFloat(parsedStr)) return true;
  return false;
};

// amount: z
//     .string()
//     .min(1, { message: "Balance is required" })
//     .refine((val) => val.search(/\D/) === -1, {
//       message: "Only positive numbers",
//     }),
