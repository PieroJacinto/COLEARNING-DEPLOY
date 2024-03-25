import React, { useEffect, useState } from "react";
import Category from "./Category.jsx";

function CategoriesInDb() {
  const [categories, setCategories] = useState([]);

  // const [isLoading, setIsLoading] = useState(true);

  const fetchRes = async () => {
    try {
      const response = await fetch(`http://localhost:3010/api/products/count`);
      const data = await response.json();

      setCategories(data.categories || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("%cse monto el componente", "color:green");
    fetchRes();
  }, []);

  return (

        <div className="col-lg-6 mb-4">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h5 className="m-0 font-weight-bold text-gray-800">Categorías</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {categories.map((cat, i) => {
                  return <Category key={i} {...cat} />;
                })}
              </div>
            </div>
          </div>
        </div>

  );
}

export default CategoriesInDb;
