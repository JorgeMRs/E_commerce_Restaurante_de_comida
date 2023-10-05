import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../img/carrito.jpg";
import Login from './login';
import cartIcon from "../../img/cart.png";
import { Modal, Button } from "react-bootstrap";
import "../../styles/cartDropdown.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
// import useMediaQuery from "./useMediaQuery";
import MediaQuery from 'react-responsive'

const getIsAdminFromLocalStorage = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  return isAdmin === 'true';
};

export const Navbar = ({ setSeccionActiva }) => {

  const [isAdmin, setIsAdmin] = useState(getIsAdminFromLocalStorage());
  const [forceUpdate, setForceUpdate] = useState(false);

  const { store, actions } = useContext(Context);
  const [showModal, setShowModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  let navigate = useNavigate();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [cart, setCart] = useState({ items: [], totalCost: 0 });

  const handleLoginError = (errorMessage) => {
    console.error(errorMessage);
  };

  useEffect(() => {
    setIsAdmin(getIsAdminFromLocalStorage());
  }, [store.isAuthenticated, forceUpdate]);

  useEffect(() => {
    setCart(store.cart);
  }, [store.cart]);


  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    actions.initializeAuth();
  }, [store.isAuthenticated, store.email]);

  const { email, password } = formData;

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (email, password) => {
    let logged = await actions.login(email, password);
    if (logged) {
      setIsAdmin(getIsAdminFromLocalStorage()); // Aquí actualizamos el estado isAdmin
      setSuccessMessage("Login exitoso, cerrando ventana...");
      setTimeout(() => {
        navigate('/');
        handleCloseModal();
        setSuccessMessage("");
      }, 2000);
    }
  };

  // const matches = useMediaQuery("(min-width: 980px)");


  const handleLogout = () => {
    actions.logout();
    setForceUpdate(!forceUpdate);
  };

  const welcomeMessage = store.email ? store.email.split("@")[0] : "";

  const handleMouseEnter = () => {
    setShowCartDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowCartDropdown(false);
  };

  const handleIncrementNavbar = (order_id) => {
    actions.handleIncrement(order_id);
  };

  const handleDecrementNavbar = (order_id) => {
    actions.handleDecrement(order_id);
  };

  const renderProfileIcon = () => {
    const initial = store.email ? store.email.charAt(0).toUpperCase() : '';
    return (
      <Link to="/usuarioEstandar" className="nav-link">
        <span
          className="perfil-inicial"
          style={{
            backgroundColor: '#7a7a7a',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '24px'
          }}
        >
          {initial}

        </span>
      </Link>
    );
  };

  const renderProfileIcon2 = () => {
    const initial = store.email ? store.email.charAt(0).toUpperCase() : '';
    return (
      <Link to="/usuarioEstandar" className="nav-link">
        <span
          className="perfil-inicial"
          style={{
            // backgroundColor: '#7a7a7a',
            // borderRadius: '50%',
            // width: '40px',
            // height: '40px',
            // display: 'flex',
            // alignItems: 'center',
            // justifyContent: 'center',
            color: '#ffffff',
            fontSize: '20px'
          }}
        >
          <span className="administrar_N">perfil</span>
        </span>
      </Link>
    );
  };



  // let mql = window.matchMedia("(max-width: 600px)");

  // if (mql == true) {

  //   document.querySelector("cerrar_sesion").innerText = "cerrar"
  // }

  // document.querySelector("cerrar_sesion").innerHTML = "cerrar"


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">

        <MediaQuery minWidth={901}>

          <div className="row w-100 ">
            {/* <div className="navbar-header">CARRITO EL TATIN</div> */}
            <div className=" col-12 mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
              <div className="d-flex align-items-center">
                <img src={Logo} alt="Logo" className="logo" />
                <h5 className="nombre_logo_N">Carrito el tatin</h5>
              </div>
              <button
                className="navbar-toggler boton_Nav"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className=" col-12 collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto navb_UL">
                  <li className="nav-item navbgg">
                    <Link to="/" className="nav-link etiquet_N" onClick={() => setSeccionActiva("Inicio")}>
                      <span className="administrar_N">Inicio</span>
                    </Link>
                  </li>
                  <li className="nav-item navbgg">
                    <Link to="/" className="nav-link etiquet_N" onClick={() => setSeccionActiva("Catalogo")}>
                      <span className="administrar_N">Catálogo</span>
                    </Link>
                  </li>
                  <li className="nav-item navbgg">
                    <Link to="/" className="nav-link etiquet_N" onClick={() => setSeccionActiva("Contacto")}>
                      <span className="administrar_N">Contacto</span>
                    </Link>
                  </li>
                  {isAdmin && (
                    <li className="nav-item navbgg">
                      <Link
                        to="/usuarioAdmin"
                        className="nav-link"
                        onClick={() => setSeccionActiva("Administrar")}
                      >
                        <span className="administrar_N navbgg"> Administrar</span>
                      </Link>
                    </li>
                  )}
                  <div className="iconos align-items-center justify-content-center">
                    <p className="parrafo_bienvenida"></p>
                    <div className="perfil-icon d-flex align-items-center" style={{ marginLeft: '10px' }}>
                      {store.isAuthenticated && renderProfileIcon()}
                    </div>
                    <Button
                      variant="btn-light"
                      className=" boton-C"
                      onClick={store.isAuthenticated ? handleLogout : handleShowModal}
                    >
                      <span className="align-self-center Cerrar_se cerrar_sesion">{store.isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}</span>
                    </Button>
                    {store.isAuthenticated &&
                      <div
                        className="cart-container"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Button variant="link hoverEffect" onClick={() => navigate('/cart')}>
                          <img src={cartIcon} alt="cart" className="border-dark ms-2" width={30} />
                        </Button>
                        <div className={`cart-dropdown ${showCartDropdown ? 'show' : ''}`}>
                          {cart && cart.items && cart.items.length > 0 ? (
                            cart.items.map((item, index) => (
                              <div className="cart-item" key={item.order_id}>
                                <span className="item-name">{`${index + 1} - ${item.name}`}</span>
                                <span className="item-quantity">
                                  {' x '}
                                  {item.quantity}
                                </span>
                                <button className="item-increment" onClick={() => handleIncrementNavbar(item.order_id)}>
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <button className="item-decrement" onClick={() => handleDecrementNavbar(item.order_id)}>
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                              </div>
                            ))
                          ) : <div className="cart-empty">El carrito está vacío.</div>}
                          {cart && cart.items && cart.items.length > 0 && (
                            <div className="cart-total">
                              Total: ${cart.totalCost}
                            </div>
                          )}
                        </div>
                      </div>
                    }
                  </div>
                </ul>
              </div>
            </div>
          </div>

        </MediaQuery>
        <MediaQuery maxWidth={900}>

          <div className="row w-100 ">
            {/* <div className="navbar-header">CARRITO EL TATIN</div> */}
            <div className=" col-12 mb-3 d-flex align-items-center justify-content-between w-100 position-relative">
              <div className="d-flex align-items-center">
                <img src={Logo} alt="Logo" className="logo" />
                <h5 className="nombre_logo_N">Carrito el tatin</h5>
              </div>
              <button
                className="navbar-toggler boton_Nav"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            <div className=" col-12 collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto navb_UL">
                <li className="nav-item navbgg">
                  <Link to="/" className="nav-link etiquet_N" onClick={() => setSeccionActiva("Inicio")}>
                    <p className="administrar_N">Inicio</p>
                  </Link>
                </li>
                <li className="nav-item navbgg">
                  <Link to="/" className="nav-link etiquet_N" onClick={() => setSeccionActiva("Catalogo")}>
                    <p className="administrar_N">Catálogo</p>
                  </Link>
                </li>
                <li className="nav-item navbgg">
                  <Link to="/" className="nav-link etiquet_N" onClick={() => setSeccionActiva("Contacto")}>
                    <p className="administrar_N">Contacto</p>
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item navbgg">
                    <Link
                      to="/usuarioAdmin"
                      className="nav-link vvcxc"
                      onClick={() => setSeccionActiva("Administrar")}
                    >
                      <p className="administrar_N">Administrar</p>
                    </Link>
                  </li>
                )}

                <li className="nav-item navbgg">
                  <div
                    className=" boton-C"
                    onClick={store.isAuthenticated ? handleLogout : handleShowModal}
                  >
                    <span className="align-self-center cerrar_sesion">{store.isAuthenticated ? "Cerrar sesión" : "Iniciar sesión"}</span>
                  </div>
                </li>

                <li className="nav-item navbgg">
                  <div className="perfil-icon  align-items-center" style={{ marginLeft: '10px' }}>
                    {store.isAuthenticated && renderProfileIcon2()}
                  </div>
                </li>

                <li className="nav-item navbgg">

                  {store.isAuthenticated &&
                    <div
                      className="cart-container"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <Button variant="link hoverEffect" onClick={() => navigate('/cart')}>
                        <img src={cartIcon} alt="cart" className="border-dark ms-2" width={30} />
                      </Button>
                      <div className={`cart-dropdown ${showCartDropdown ? 'show' : ''}`}>
                        {cart && cart.items && cart.items.length > 0 ? (
                          cart.items.map((item, index) => (
                            <div className="cart-item" key={item.order_id}>
                              <span className="item-name">{`${index + 1} - ${item.name}`}</span>
                              <span className="item-quantity">
                                {' x '}
                                {item.quantity}
                              </span>
                              <button className="item-increment" onClick={() => handleIncrementNavbar(item.order_id)}>
                                <FontAwesomeIcon icon={faPlus} />
                              </button>
                              <button className="item-decrement" onClick={() => handleDecrementNavbar(item.order_id)}>
                                <FontAwesomeIcon icon={faMinus} />
                              </button>
                            </div>
                          ))
                        ) : <div className="cart-empty">El carrito está vacío.</div>}
                        {cart && cart.items && cart.items.length > 0 && (
                          <div className="cart-total">
                            Total: ${cart.totalCost}
                          </div>
                        )}
                      </div>
                    </div>
                  }
                </li>

              </ul>
            </div>
          </div>

        </MediaQuery>
      </nav>
      <Login
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        successMessage={successMessage}
        loginError={handleLoginError}

      />
    </>
  );
};
