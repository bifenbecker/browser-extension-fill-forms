import * as yup from "yup";

const schema = yup.object({
  cardNumber: yup.string().nullable().max(16, "Card number length must be 16"),
  expireDate: yup.date().nullable(),
});

export default schema;
