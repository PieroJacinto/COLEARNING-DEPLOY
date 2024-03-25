import React, { useState, useEffect } from "react";
import axios from "axios";
import TopBar from "./TopBar";
import { Link } from "react-router-dom";

function UserList({ user, setDisplay, display }) {
  const [users, setUsers] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3010/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div id="content-wrapper" className="d-flex flex-column">
      <div id="content">
        <TopBar user={user} setDisplay={setDisplay} display={display} />
        <div className="container-fluid p-3">
          <h5 className="m-0 font-weight-bold text-gray-800 py-2">Usuarios</h5>
          <table className="table table-danger table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Detalle</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {users.length > 0 &&
                users.map((user, i) => {
                  return (
                    <tr key={i}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Link to={`/users/${user.id}`}>
                          <i className="fas fa-link"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserList;
