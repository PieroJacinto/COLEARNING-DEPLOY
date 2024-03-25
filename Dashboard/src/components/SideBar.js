import image from "../assets/images/cosmica_logo_almostwhite.png";
import React, { useState,useEffect } from "react";
import ContentWrapper from "./ContentWrapper";
import CategoriesInDb from "./CategoriesInDb";
import ContentRowList from "./ContentRowList";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import ProductsCategory from "./ProductsCategory";
import UserList from "./UserList";
import UserDetail from "./UserDetail";
//import Post from "./Post";

import NotFound from "./NotFound";
import { Link, Route, Routes } from "react-router-dom";
import ProductCreate from "./ProductCreate";
import ProductUpdate from "./ProductUpdate";
import LoginForm from "./LoginForm";

function SideBar() {
  const [user,setUser] = useState([])
  const [options, setOptions] = useState(false)
  const [display, setDisplay] = useState(true)


  const handleLogOut = ()=>{
    setUser([])
    window.sessionStorage.removeItem('userLogged');
  }
  const displayOptions = ()=>{
    setOptions(!options)
  }

  useEffect(()=>{
    const userLogged = window.sessionStorage.getItem('userLogged')
    if(userLogged != null){
      setUser(JSON.parse(userLogged))}
  }, [])
  return (
    <React.Fragment >
      {/*<!-- Sidebar -->*/}
      <ul
        className={`navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion ${display ? 'd-none': '' } d-md-block`}
        id="accordionSidebar"
      >
        {/*<!-- Sidebar - Brand -->*/}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >
          <div className="sidebar-brand-icon">
            <img className="w-100" src={image} alt="Digital House" />
          </div>
        </Link>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider my-0" />

        {/*<!-- Nav Item - Dashboard -->*/}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard - Cosmica</span>
          </Link>
        </li>

        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider" />

        {/*<!-- Heading -->*/}

        { user.length > 0 &&

          (<>
<div className="sidebar-heading">Actions</div>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">
              <i className="fas fa-fw fa-folder"></i>
              <span>Categorías</span>
            </Link>
          </li>
  
          {/*<!-- Nav Item - Tables -->*/}
          <li className="nav-item nav-link">
            <Link className="nav-link" to="/options">
              <i className="fas fa-fw fa-table"></i>
              <span>Opciones</span>
            </Link>
          </li>
          <li className="nav-item nav-link">
            <Link className="nav-link" onClick={displayOptions}>
              <i className="fas fa-fw fa-table"></i>
              <span>Productos</span>
            </Link>
          </li>
          {options && (
          <>
          <li className="nav-item nav-link">
            <Link className="nav-link" to='/products'>
              <i className="fas fa-fw fa-arrow-right"></i>
              <span>Lista de Productos</span>
            </Link>
          </li><li className="nav-item nav-link">
            <Link className="nav-link" to='/products/create'>
              <i className="fas fa-fw fa-plus"></i>
              <span>Crear Un Producto</span>
            </Link>
          </li>
          </>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/users">
              <i className="fas fa-fw fa-users"></i>
              <span>Usuarios</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/' onClick={handleLogOut}>
              <span>Cerrar Sesión</span>
            </Link>
          </li>
          </>
          )}
        {/*<!-- Nav Item - Pages -->*/}
        {/*<!-- Divider -->*/}
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
      {/*<!-- End of Sidebar -->*/}

      {/*<!-- Microdesafio 1 -->*/}
      {/*<!--<Route exact path="/" >
                <ContentWrapper />
            </Route>
            <Route path="/GenresInDb">
                <GenresInDb />
            </Route>
            <Route path="/LastMovieInDb">
                <LastMovieInDb />
            </Route>
            <Route path="/ContentRowMovies">
                <ContentRowMovies />
            </Route>*/}
      {/*<!-- End Microdesafio 1 -->*/}

      {/*<!-- End Microdesafio 2 -->*/}
      <Routes>
        <Route exact path="/" element={!user.length>0 ? <LoginForm setUser={setUser}/> : <ContentWrapper user={user} setDisplay={setDisplay} display={display} />} />
        <Route path="/login" element={!user.length>0 ? <LoginForm setUser={setUser}/> : <ContentWrapper  user={user} setDisplay={setDisplay} display={display}/>} />
        {user.length>0 && (
          <>
        <Route path="/categories" element={<CategoriesInDb />} />
        <Route path="/options" element={<ContentRowList />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/:idProduct" element={<ProductDetail user={user} setDisplay={setDisplay} display={display}/>} />
        <Route path="/products/:idProduct/update" element={<ProductUpdate />} />
        <Route path="/products" element={<Products user={user} setDisplay={setDisplay} display={display} />} />
        <Route path="/categories/:idCat" element={<ProductsCategory user={user} setDisplay={setDisplay} display={display} />} />
        <Route path="/users" element={<UserList user={user} setDisplay={setDisplay} display={display} />} />
        <Route path="/users/:idUser" element={<UserDetail user={user} setDisplay={setDisplay} display={display} />} />
        </>
        )}
        <Route element={NotFound} />

      </Routes>
      {/*<!-- End Microdesafio 2 -->*/}
    </React.Fragment>
  );
}
export default SideBar;
