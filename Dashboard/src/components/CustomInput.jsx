import { useField } from "formik";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="p-1">
      <label>{label}</label>
      <input {...field} {...props}
        className={meta.touched && meta.error ? "input-error" : ""} />
      {meta.touched && meta.error && <div className="">{meta.error}</div>}
    </div>

  );
};

export default CustomInput;