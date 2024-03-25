import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import TopBar from './TopBar';
import ProductCard from './ProductCard';
import CardSkeleton from './CardSkeleton';


function Products({user,setDisplay, display}) {
  console.log('entre al componente');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const limit = 10;

  const handleSearch = (query) => {
    console.log("Buscar productos con:", query);
    setCurrentPage(1);
    setQuery(query);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3010/api/products?page=${currentPage}&limit=${limit}&name=${query}`);
        setProducts(response.data.data.products || []);
        setTotalPages(Math.ceil(response.data.data.count / limit) || 0)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    console.log('entre al useEffect');
    fetchProducts();
  }, [currentPage, query]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }


  return (
<div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
                    <TopBar user ={user} setDisplay={setDisplay} display={display}/>
    <div className="container-fluid">
      <SearchBar onSearch={handleSearch} />
      <div className="row">
        {isLoading && <CardSkeleton cards={8} />}
        {
          products.length > 0 && products.map(product => {
            return (
              <ProductCard product={product} key={product.id} />
              // <div className="col-sm-6 col-md-3 my-4" key={product.id}>
              //   <div className="card shadow mb-4">
              //     <Link className="nav-link" to={{ pathname: `products/${product.id}`, state: { product } }}>
              //       <div className="card-header py-3">
              //         <h5 className="m-0 font-weight-bold text-gray-800">{product.name || <Skeleton />}</h5>
              //       </div>
              //     </Link>
              //     <div className="card-body">
              //       <div className="text-center">
              //         <img
              //           className="img-fluid px-3 px-sm-4 mt-3 mb-4"
              //           src={`http://localhost:3010/img/products/${product.image}`}
              //           alt={product.name}
              //           style={{ width: '90%', height: '400px', objectFit: 'cover' }}
              //         />
              //       </div>
              //       <p>{product.description_short || <Skeleton />}</p>
              //     </div>
              //   </div>
              // </div>
            )
          })
        }
      </div>
      <div className='row btn-width align-items-start'>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} className='btn btn-info btn-sm' >Anterior</button>
        <span className='pageindicator'>Pág. {currentPage} de {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} className='btn btn-info btn-sm'>Siguiente</button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Products;