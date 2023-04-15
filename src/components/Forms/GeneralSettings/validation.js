import * as yup from "yup";

const schema = yup
  .object({
    firstName: yup
      .string()
      .nullable()
      .min(4, "Name must be longer")
      .max(30, "Name must be shorter"),
    lastName: yup
      .string()
      .nullable()
      .min(4, "Last name must be longer")
      .max(30, "Last name must be shorter"),
    mobile: yup
      .string()
      .nullable()
      .min(4, "Mobile must be longer")
      .max(30, "Mobile must be shorter"),
    email: yup
      .string()
      .nullable()
      .email("Enter please Email address")
      .required("Email address is required"),
  })
  .required();

export default schema;
