import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import TopBar from './TopBar';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function UserDetail({user, setDisplay, display}) {
  const { idUser } = useParams();
  console.log(idUser);
  const [userDet, setUserDet] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const response = await axios.get(`http://localhost:3010/api/users/${idUser}`);
        console.log(response.data);
        setUserDet(response.data)
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [])

  return (
    <>
      <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
      <TopBar user ={user} setDisplay={setDisplay} display={display}/>
      {isLoading && <p>Loading...</p>}

      {!isLoading &&
        <Link className='linkColor' to="/users">Volver a Usuarios</Link>
      }
      <div className='d-flex flex-column justify-content-center align-items-center'>
      <h5 className="m-0 font-weight-bold text-gray-800">{userDet.first_name || <Skeleton />} {userDet.last_name || <Skeleton />}</h5>
      <img
            className="img-fluid px-3 px-sm-4 mt-3 mb-4"
            src={userDet.image}
            alt={userDet.first_name}
            style={{ maxWidth: '350px ', objectFit: 'cover' }}
          />
      <p><i className="fas fa-at"></i> Email: {userDet.email || <Skeleton count={1} />}</p>
      <p><i className="fas fa-street-view"></i> Dirección: {userDet.address || <Skeleton count={1} />}</p> 
      <p><i className="fas fa-id-badge"></i> Perfil: {userDet.profile || <Skeleton count={1} />}</p> 

      </div>
    </div>
    </div>
    </>
  )
}

export default UserDetail;