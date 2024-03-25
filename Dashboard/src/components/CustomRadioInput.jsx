import React from 'react';
import { useField } from 'formik';

const CustomRadioInput = ({ label, selectedValue, ...props }) => {
  const [field, meta] = useField(props);
  return (
      <div className='d-flex flex-row align-items-center p-1'>  
      <label className='p-2' >
        {label}
        </label>
        <input type='radio'{...field} {...props}
          className={meta.touched && meta.error ? "input-error" : ""}
          checked={props.value == field.value}
        />
      
      </div>
  );
};

export default CustomRadioInput;