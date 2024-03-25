
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Link } from "react-router-dom";

const UserCard = (props) => {
  return (

    <div className="card shadow mb-4" >
      <div className="card-header py-3">
        <Link to={`/users/${props.id}`}>
        <h5 className="m-0 font-weight-bold text-gray-800">{props.name || <Skeleton />}</h5>
        </Link>
      </div>
      <div className="card-body">
        <div className="text-center">
        </div>
        <p>{props.email || <Skeleton />}</p>
      </div>
    </div>

  );
};

export default UserCard;