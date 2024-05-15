import React from 'react';
import 'bootstrap/js/dist/dropdown';
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Nav({ Toggle }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-white bg-white px-3">
      <div className="container-fluid">
        <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            {user && (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user.username}
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Profile</a></li>
                  <li><a className="dropdown-item" href="#">Setting</a></li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
            {!user && (
              <li className="nav-item">
                <a className="nav-link" href="/DonorLogin">Login</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
