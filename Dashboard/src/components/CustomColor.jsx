import { useField, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import axios from 'axios';

const CustomColor = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [colors, setColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const {
    values: { category_id, colorStocks },
    setFieldValue,
  } = useFormikContext();

  useEffect(() => {
    const fetchColors = async () => {
      try {
        if (category_id.trim() !== "") {
          const responseColors = await axios.get(`http://localhost:3010/api/categories/${category_id}/colors`);
          setColors(responseColors.data.data || null);
        }
        else {
          setColors([]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchColors();
  }, [category_id])

  useEffect(() => {
    const initialSelectedColors = colorStocks.map(color => color.color_id);
    setSelectedColors(initialSelectedColors);
  }, [colorStocks])

  const handleColorChange = (colorId, checked) => {
    console.log("El colorId es:", colorId);
    console.log("checked es:", checked);
    if (checked) {
      setSelectedColors(prevState => [...prevState, colorId]);
      colorStocks.push({ color_id: colorId, stock: 0 })
      setFieldValue(props.name, colorStocks);

    } else {
      setSelectedColors(prevState => prevState.filter(id => id !== colorId));
      const updatedColorStocks = colorStocks.filter(color => {
        console.log(color);
        console.log(color.color_id);
        if (color.color_id !== colorId) {
          return color
        }
      });
      console.log(updatedColorStocks);
      setFieldValue(props.name, updatedColorStocks);
    }
  };

  const handleStockChange = (colorId, stock) => {
    const updatedColorStocks = colorStocks.map(color => {
      if (color.color_id == colorId) {
        return { ...color, stock };
      }
      return color;
    });

    setFieldValue(props.name, updatedColorStocks);
    // const colorStock = colorStocks.find(color => color.color_id === colorId);
    // if (colorStock) {
    //   colorStock.stock = stock;
    // }
    // else {
    //   colorStocks.push({ color_id: colorId, stock })
    // }
    // setFieldValue(props.name, colorStocks);
  };
  console.log(colorStocks);
  console.log(selectedColors);
  return (
    <div className="d-flex flex-colum align-items-start p-1">
      {colors && colors.map((color) => (
        <div className="d-flex flex-row align-items-center" key={color.id}>
          <input
            type="checkbox"
            id={color.id}
            name={props.name}
            checked={selectedColors.includes(color.id)}
            // checked={colorStocks.find(c => c.color_id == color.id) && selectedColors.push(color.id)}
            value={color.id}
            onChange={(e) => handleColorChange(color.id, e.target.checked)}
            className="p-2"
          />
          <label className="p-2" htmlFor={color.id}>{color.name}</label>
          {selectedColors.includes(color.id) && (
            <input
              type="number"
              name="stocks"
              value={colorStocks.find(c => c.color_id == color.id)?.stock || ""}
              // value={selectedColors.find(id => id === color.id)}
              onChange={(e) => handleStockChange(color.id, e.target.value)}
              placeholder="Stock"
              className="max"
            />
          )}
        </div>
      ))}
      {meta.touched && meta.error && <div className="">{meta.error}</div>}

    </div>
  )
}

export default CustomColor;
