import * as yup from "yup";

const schema = yup
  .object({
    cardNumber: yup
      .string()
      .nullable()
      .min(16, "Card number length must be 16")
      .max(16, "Card number length must be 16"),
    expireDate: yup.date().nullable(),
  })
  .required();

export default schema;
