import React from 'react';
import { useField } from 'formik';

const CustomImageInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const handleChange = (event) => {
    const { files } = event.target;
    helpers.setValue(files[0]);
  };

  return (
    <div className="p-1"> 
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        type="file"
        onChange={handleChange}
        {...props}
        className={meta.touched && meta.error ? "input-error" : ""}
      />
      {meta.touched && meta.error ? (
        <div className="">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default CustomImageInput;
