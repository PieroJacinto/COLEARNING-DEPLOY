import React from 'react';
import { Link} from 'react-router-dom';
import imagenFondo from '../assets/images/mandalorian.jpg';

function LastProductInDb(props){
    return(
        <div className="col-lg-6 mb-4 ">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Ultimo producto en Base de Datos</h5>
                </div>
                <div className="card-body">
                    <div className="text-center">
                    <h5 className="m-0 font-weight-bold text-gray-800">{props.name}</h5>
                        <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: 25 +'rem'}} src={`http://localhost:3010/img/products/${props.image}`} alt=" Star Wars - Mandalorian "/>
                    </div>
                    <p>{props.description_short}</p>
                    <Link to={`/products/${props.id}`} className="btn btn-info" rel="nofollow" href="/">Ver detalle</Link>
                </div>
            </div>
        </div>
    )
}

export default LastProductInDb;
