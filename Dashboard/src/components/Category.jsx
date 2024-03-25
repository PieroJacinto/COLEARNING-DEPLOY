import { Link } from 'react-router-dom';


function Category(props) {
    return(
    <div className="col-lg-6 mb-4">
    <div className="card bg-dark text-white shadow">
     <Link to={`/categories/${props.id}`}> <div className="card-body">{props.name} ({props.products.length})</div></Link>
    </div>
  </div> 
    )
}

export default Category;