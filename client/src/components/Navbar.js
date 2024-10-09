import React from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  function logout()
  {
     localStorage.removeItem('currentUser')
     window.location.href='/login'
  }
  return (
    <div>
      <nav class="navbar navbar-expand-lg "style={{ backgroundColor: 'gray' }}>
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">
            RapidRooms
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <div className="mr-4">
              <span class="navbar-toggler-icon"> 
              <i class ="fa fa-bars"style={{color:'white'}}></i>
              </span>
              </div>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ">
              {user ? (<>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"> 
                    <i className="fa fa-user ">&nbsp;&nbsp;{user.name}&nbsp; </i> 
                     </button>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="/profile">Profile</a>
                    <a className="dropdown-item" href="#"onClick={logout}>Log Out</a>

                  </div>
                </div>
              </>) : (
                <>
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/register">
                      Register
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="/login">
                      Login
                    </a>
                  </li></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
