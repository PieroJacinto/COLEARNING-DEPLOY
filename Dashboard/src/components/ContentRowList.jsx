import React, { useState, useEffect, useRef } from 'react';
import SmallCard from './SmallCard';

function ContentRowList(){
    const [products, setProducts] = useState();
    const [categories, setCategories] = useState();
    const [users, setUsers] = useState();

    // const [isLoading, setIsLoading] = useState(true);

    const fetchCount = async () => {
          try {
            const response = await fetch(`http://localhost:3010/api/products/count`);
            const data = await response.json();          
            setProducts(data.countProd || null);
            setCategories(data.countCat || null);
            setUsers(data.countUser || null);
          } catch (error) {
            console.log(error);
          }
        }
        useEffect(() => {
            console.log("%cse monto el componente", "color:green");
            fetchCount()
        }, []);
        const cardsList = [{title:'Productos',color:'primary',cuantity: products,icon:'fa-clipboard', link:'/products'},{title:'Categorías',color:'success',cuantity: categories,icon:'fa-list', link:'/categories'},{title:'Usuarios',color:'warning',cuantity: users,icon:'fa-users', link:'/users'},]
       
        return (
    
        <div className="row">
            
            {cardsList.map( (item, i) => {

                return <SmallCard {...item} key={i}/>
            
            })}

        </div>
    )
}

export default ContentRowList;