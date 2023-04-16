import * as yup from "yup";

const schema = yup
  .object({
    city: yup
      .string()
      .nullable()
      .min(2, "City must be longer")
      .max(20, "City must be shorter"),
    country: yup
      .string()
      .nullable()
      .min(2, "Country must be longer")
      .max(30, "Country must be shorter"),
    street: yup
      .string()
      .nullable()
      .min(2, "Street must be longer")
      .max(50, "Street must be shorter"),
    flatNumber: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .positive("Flat number must be a positive number")
      .integer("Flat number must be an integer number")
      .min(1, "Flat number can not be a 0"),
    houseNumber: yup
      .string()
      .nullable()
      .max(10, "House number must be shooter than 10 chars"),
    postalCode: yup
      .string()
      .nullable()
      .max(20, "Postal code must be shooter than 20 chars"),
  })
  .required();

export default schema;
