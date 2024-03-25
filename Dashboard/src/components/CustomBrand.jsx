import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from 'axios';
import CustomSelect from "./CustomSelect";
import CustomRadioInput from "./CustomRadioInput";

const CustomBrand = ({ label, brands, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="p-1">
      <label>{label}</label>
      <div  className="d-flex flex-row flex-wrap">
      {
        brands && brands.map(brand => (

          <CustomRadioInput
            label={brand.name}
            name={props.name}
            value={brand.id}
            key={brand.id}
            selectedValue={props.value}
          />
        ))
      }
      </div>
      {meta.touched && meta.error && <div className="">{meta.error}</div>}

    </div>
  )
}

export default CustomBrand;
