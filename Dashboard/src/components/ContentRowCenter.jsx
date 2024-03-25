import React, {useEffect,useState} from 'react';
import LastProductInDb from './LastProductInDb';
import CategoriesInDb from './CategoriesInDb';

function ContentRowCenter(){
    const [product, setProduct] = useState([]);

    const fetchLastProduct = async () => {
        try {
          const response = await fetch(`http://localhost:3010/api/products/last`);
          const data = await response.json();    
          setProduct(data[0] || []);
        } catch (error) {
          console.log(error);
        }
      }
      useEffect(() => {
          console.log("%cse monto el componente", "color:green");
          fetchLastProduct()
      }, []);


    return (
        <div className="row flex-row">
            
            {/*<!-- Last Movie in DB -->*/}
            <LastProductInDb  {...product}/>
            {/*<!-- End content row last movie in Data Base -->*/}

            {/*<!-- Genres in DB -->*/}
            <CategoriesInDb />

        </div>
    )
}

export default ContentRowCenter;