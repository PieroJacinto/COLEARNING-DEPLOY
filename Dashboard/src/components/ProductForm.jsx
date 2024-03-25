import { Formik, Form, } from "formik";
import { useEffect, useState } from "react";
import * as yup from 'yup';
import axios from 'axios';
import CustomInput from "./CustomInput";
import CustomTextAreaInput from "./CustomTextAreaInput";
import CustomImageInput from "./CustomImageInput";
import CustomSelect from "./CustomSelect";
import CustomColor from "./CustomColor";
import CustomBrand from "./CustomBrand";
import { useNavigate } from 'react-router-dom';


const ProductForm = ({ idProduct }) => {
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState(null);
  const [brands, setBrands] = useState();
  const [categories, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const fetchApi = async () => {
      try {
        const responseBrand = await axios.get("http://localhost:3010/api/brands");
        setBrands(responseBrand.data.data || null);
        const responseCategory = await axios.get("http://localhost:3010/api/categories");
        setCategory(responseCategory.data.data || null);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();

  }, []);

  useEffect(() => {

    console.log("El product id es:", idProduct);
    if (idProduct) {
      fetchProduct(idProduct);
    } else {
      setInitialValues({
        name: "",
        description_short: "",
        description_long: "",
        brand_id: "",
        ingredients: "",
        price: "",
        product: null,
        category_id: "",
        colorStocks: [],
        discount: ""
      });
    }
  }, [idProduct]);

  const onSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description_short', values.description_short);
      formData.append('description_long', values.description_long);
      formData.append('brand_id', values.brand_id);
      formData.append('category_id', values.category_id);
      formData.append('ingredients', values.ingredients);
      formData.append('price', values.price);
      formData.append('discount', values.discount);
      if (values.product) {
        formData.append('product', values.product);
      }
      formData.append('colorStocks', JSON.stringify(values.colorStocks));
      let response;
      if (idProduct) {
        response = await axios.put(`http://localhost:3010/api/products/${idProduct}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status == 200 && response.data.data) {
          navigate(`../products/${idProduct}`);
        }
      } else {
        response = await axios.post("http://localhost:3010/api/products/create", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        if (response.status == 200 && response.data.data) {
          const id = response.data.data.id;
          navigate(`../products/${id}`);
        }
      }

      // Restablecer el formulario después de enviar los datos
      if (response.status == 200)
        actions.resetForm();
    } catch (error) {
      console.error(error);
    }
    finally {
      actions.setSubmitting(false);
    }
  }

  const fetchProduct = async (id) => {
    try {
      console.log("Entre al llamado");
      const response = await axios.get(`http://localhost:3010/api/products/${id}`);
      const productData = response.data.data;
      console.log("productData", productData);
      setInitialValues({
        name: productData.name,
        description_short: productData.description_short,
        description_long: productData.description_long,
        brand_id: productData.brand_id,
        ingredients: productData.ingredients,
        price: productData.price,
        product: "", // No cargamos la imagen al actualizar
        category_id: productData.category_id + "",
        colorStocks: productData.stocks,
        // colorStocks: productData.colors.map(color => ({
        //   color_id: color.color_id,
        //   stock: color.stock
        // })),
        discount: productData.discount
      });
    } catch (error) {
      console.error(error);
    }
  };

  console.log(brands);
  console.log(idProduct);
  let productCreateSchema;
  if (idProduct !== undefined) {
    productCreateSchema = !isLoading && yup.object().shape({
      name: yup.string().trim().min(5, "El nombre debe tener al menos 5 letras.").required("Debe ingresar el nombre del producto"),
      description_short: yup.string().trim().min(20, "La descripcion corta debe tener 20 letras como minimo.").required("Debe ingresar la descripcion corta"),
      description_long: yup.string().trim().min(20, "La descripcion larga debe tener 20 letras como minimo").required("Debe ingresar la descripcion larga."),
      brand_id: yup.number().oneOf(brands.map(brand => brand.id || ""), "Marca no existente.").required("Debe seleccionar una marca."),
      ingredients: yup.string().trim().required("Tiene que ingresar los ingredientes del producto"),
      price: yup.number().required("Debe ingresar el precio del producto."),
      product: yup.mixed()
        .when(idProduct, {
          is: value => value,
          then: (schema) => schema.test('fileType', "Solo imagenes son permitidas.", (value) => {
            if (!value) return true;
            return value && ['image/jpeg', 'image/png'].includes(value.type);
          })
        })
      ,
      category_id: yup.number().oneOf(categories.map(category => category.id || ""), "Categoria no existente.").required("Debe seleccionar una categoria."),
      colorStocks: yup.array()
        .when('category_id', { // Condicionamos la validación a 'category_id'
          is: value => value, // Validamos si 'category_id' tiene un valor (es decir, si se ha seleccionado una categoría)
          then: (schema) => schema.min(1, 'Debes seleccionar al menos un color.') // Aplicamos la validación solo si 'category_id' tiene un valor
        }),

    });
  } else {
    productCreateSchema = !isLoading && yup.object().shape({
      name: yup.string().trim().min(5, "El nombre debe tener al menos 5 letras.").required("Debe ingresar el nombre del producto"),
      description_short: yup.string().trim().min(20, "La descripcion corta debe tener 20 letras como minimo.").required("Debe ingresar la descripcion corta"),
      description_long: yup.string().trim().min(20, "La descripcion larga debe tener 20 letras como minimo").required("Debe ingresar la descripcion larga."),
      brand_id: yup.number().oneOf(brands.map(brand => brand.id || ""), "Marca no existente.").required("Debe seleccionar una marca."),
      ingredients: yup.string().trim().required("Tiene que ingresar los ingredientes del producto"),
      price: yup.number().required("Debe ingresar el precio del producto."),
      product: yup.mixed().required("Tiene que cargar una imagen").test('fileType', "Solo imagenes son permitidas.", (value) => {
        if (!value) return true;
        return value && ['image/jpeg', 'image/png'].includes(value.type);
      }),
      category_id: yup.number().oneOf(categories.map(category => category.id || ""), "Categoria no existente.").required("Debe seleccionar una categoria."),
      colorStocks: yup.array()
        .when('category_id', { // Condicionamos la validación a 'category_id'
          is: value => value, // Validamos si 'category_id' tiene un valor (es decir, si se ha seleccionado una categoría)
          then: (schema) => schema.min(1, 'Debes seleccionar al menos un color.') // Aplicamos la validación solo si 'category_id' tiene un valor
        }),
    });

  }

  // const productCreateSchema = !isLoading && yup.object().shape({
  //   name: yup.string().trim().min(5, "El nombre debe tener al menos 5 letras.").required("Debe ingresar el nombre del producto"),
  //   description_short: yup.string().trim().min(20, "La descripcion corta debe tener 20 letras como minimo.").required("Debe ingresar la descripcion corta"),
  //   description_long: yup.string().trim().min(20, "La descripcion larga debe tener 20 letras como minimo").required("Debe ingresar la descripcion larga."),
  //   brand_id: yup.number().oneOf(brands.map(brand => brand.id || ""), "Marca no existente.").required("Debe seleccionar una marca."),
  //   ingredients: yup.string().trim().required("Tiene que ingresar los ingredientes del producto"),
  //   price: yup.number().required("Debe ingresar el precio del producto."),
  //   product: yup.mixed().required("Tiene que cargar una imagen").test('fileType', "Solo imagenes son permitidas.", (value) => {
  //     if (!value) return true;
  //     return value && ['image/jpeg', 'image/png'].includes(value.type);
  //   }),
  //   category_id: yup.number().oneOf(categories.map(category => category.id || ""), "Categoria no existente.").required("Debe seleccionar una categoria."),
  //   colorStocks: yup.array()
  //     .when('category_id', { // Condicionamos la validación a 'category_id'
  //       is: value => value, // Validamos si 'category_id' tiene un valor (es decir, si se ha seleccionado una categoría)
  //       then: (schema) => schema.min(1, 'Debes seleccionar al menos un color.') // Aplicamos la validación solo si 'category_id' tiene un valor
  //     }),
  // });



  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && <Formik
        initialValues={initialValues}
        validationSchema={productCreateSchema}
        onSubmit={onSubmit}
      >

        {({ isSubmitting }) => (
          <Form className="d-flex flex-column p-4 formCreate">
            <CustomInput
              label="Nombre"
              name="name"
              type="text"
              placeholder="Ingrese el nombre del producto"
            />

            <CustomTextAreaInput
              label="Descripcion Corta"
              name="description_short"
              placeholder="Descripcion corta del producto"
            />

            <CustomTextAreaInput
              label="Descripcion Larga"
              name="description_long"
              placeholder="Descripcion Larga del producto"
            />

            <CustomTextAreaInput
              label="Ingredientes"
              name="ingredients"
              placeholder="Ingredientes del producto."
            />

            <CustomInput
              label="Precio"
              name="price"
              type="number"
              placeholder="$12.34"
            />

            <CustomInput
              label="Descuento"
              name="discount"
              type="number"
              placeholder="10"
            />

            <CustomImageInput
              name="product"
              label="Imagen"
            />

            <CustomSelect
              label="Categoria"
              name="category_id"
            >
              <option value=""> Selecciona una categoria</option>
              {categories && categories.map(category => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))
              }
            </CustomSelect>

            <CustomColor
              label="Colores"
              name="colorStocks"
              type="checkbox"
            />

            <CustomBrand
              label="Marcas"
              name="brand_id"
              brands={brands}
              value={initialValues.brand_id}
            />
            <button disabled={isSubmitting} className="btn btn-info" type="submit">Submit</button>
          </Form>
        )}
      </Formik>}
    </>
  )
}


export default ProductForm;