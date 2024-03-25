import React from 'react';
import { useField } from 'formik';

const CustomTextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="p-1">
      <label htmlFor={props.id || props.name}>{label}</label>
      <br></br>
      <textarea {...field} {...props}
        className={meta.touched && meta.error ? "input-error" : ""} />
      {meta.touched && meta.error ? (
        <div className="">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomTextAreaInput;
