import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import TopBar from './TopBar';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProductDetail({user,setDisplay, display}) {
  const { idProduct } = useParams();
  console.log(idProduct);
  const [product, setProduct] = useState({});
  const [colors, setColors] = useState([])
  const [stocks, setStocks] = useState([])
  const [brand, setBrand] = useState([])
  const [category, setCategory] = useState([])

  const [isLoading, setIsLoading] = useState(true);

  const deleteFetch = async()=>{
    try {
      const response = await fetch(`http://localhost:3010/api/products/${idProduct}`, {
          method: "DELETE",
        });
        const data = await response.json();
        console.log(data);
      
    } catch (error) {
      console.log(error);
    }
  }
  const confirmDelete = ()=>{
    const confirmar = prompt('Seguro?')
    if(confirmar === 'si'){
      deleteFetch()
    }
  }
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {

        const response = await axios.get(`http://localhost:3010/api/products/${idProduct}`);
        setProduct(response.data.data || null);
        console.log(response.data.data);
        setColors(response.data.data.colors)
        setStocks(response.data.data.stocks)
        setBrand(response.data.data.brand)
        setCategory(response.data.data.category)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [])

  return (
    <div>
      <TopBar user ={user} setDisplay={setDisplay} display={display}/>
      {isLoading && <p>Loading...</p>}

      
      <div className='p-2 mx-4'>
      <h2>{product.name || <Skeleton />}</h2>
      <img
            className="img-fluid px-3 mt-3 mb-4"
            src={product.image}
            alt={product.name}
            style={{ objectFit: 'cover' }}
          />
      <p>Marca: {brand.name || <Skeleton count={3} />}</p>
      <p>Categoría: {category.name || <Skeleton count={3} />}</p>
          <p>Precio: ${product.final_price || <Skeleton count={2} />}</p>
          <p>Descuento: {product.discount}%</p>
<ul>
      {colors.map((color,i)=>{
        return (<li key={i}>Color: {color.name} -
        {stocks.map((stock)=>{
          return (stock.color_id === color.id ? ' Stock: '+ stock.stock : '')})}
        </li>)
      })}
      </ul>
      <p>{product.description_short || <Skeleton count={2} />}</p>
      <p>{product.description_long || <Skeleton count={3} />}</p>
      <div className='d-flex flex-row'>
      <Link to={`/products/${product.id}/update`} className="btn btn-info m-1" rel="nofollow" href="/">Editar</Link>
      <Link onClick={confirmDelete} to={'/'} className="btn btn-info m-1" rel="nofollow" href="/">Eliminar</Link>
    </div>
    </div>
    <br />
    {!isLoading &&
        <Link className='linkColor' to="/products">Volver a Productos</Link>
      }
    </div>
  )
}

export default ProductDetail;