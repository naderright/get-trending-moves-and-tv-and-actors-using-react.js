import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar (props) {
  return (
    <div className='position-fixed w-100 bg-dark'style={{zIndex:100}}>
      <nav class="navbar navbar-expand-lg navbar-dark bg-transparent ">
        <div class="container-fluid">
          <Link class="navbar-brand fw-bold" to="home">NOXE</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              {
                props.userData ? <>
                  <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to="home">Home</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to="movies">Movies</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to="Tv">Tv</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to="about">About</Link>
                  </li>
                  
                </> : ''
              }


            </ul>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className='nav-item me-3 d-flex align-items-center'>
                <i className='fab mx-2 fa-instagram'></i>
                <i className='fab mx-2 fa-facebook'></i>
                <i className='fab mx-2 fa-spotify'></i>
                <i className='fab mx-2 fa-twitter'></i>

              </li>
              {
                props.userData ? <>
                  <li class="nav-item">
                    <span onClick={props.logOut} class="nav-link " aria-current="page" >Log Out</span>
                  </li>
                </> : <>
                  <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to="register">Register</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link " aria-current="page" to="login">Login</Link>
                  </li>

                </>
              }

            </ul>

          </div>
        </div>
      </nav>
    </div>
  )
}
