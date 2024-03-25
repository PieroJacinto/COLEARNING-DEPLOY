import { useField } from "formik";

const CustomSelect = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="p-1 d-flex">
      <label>{label}</label>
      <select {...field} {...props}
        className={meta.touched && meta.error ? "input-error" : ""} />
      {meta.touched && meta.error && <div className="">{meta.error}</div>}
    </div>

  );
};

export default CustomSelect;