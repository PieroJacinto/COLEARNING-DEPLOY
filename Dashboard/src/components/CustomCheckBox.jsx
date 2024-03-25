import { useField } from "formik";

const CustomCheckBox = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  console.log(field);
  console.log(meta);
  return (
    <div className="checkbox">
      <input type="checkbox" {...field} {...props}
        className={meta.touched && meta.error ? "input-error" : ""} />
      <span>{label}</span>
    </div >
  );
};

export default CustomCheckBox;