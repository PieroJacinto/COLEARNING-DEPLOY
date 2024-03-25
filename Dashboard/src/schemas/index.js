import * as yup from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
export const basicSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Required"),
  age: yup.number().positive().integer().required("Required"),
  password: yup.string().min(5).matches(passwordRules, { message: "Please create a stronger password" }).required("required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null]).required("required"),
})

export const advancedSchema = yup.object().shape({
  username: yup.string().min(3, "Username must be at least 3 charactes long").required("Required"),
  jobType: yup.string().oneOf(["designer", "developer", "manager", "other"], "Algo").required("Required"),
  acceptedTos: yup.boolean().oneOf([true], "Please accept the terms of service"),
});
