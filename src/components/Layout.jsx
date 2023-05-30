import React from 'react'
import {NavLink, Outlet} from 'react-router-dom'
export const Layout = () => {
  return (
    <div className='wrapper'>
    <header>
          <ul>
       <li><NavLink to="/">Home</NavLink></li> 
       <li> <NavLink to="/registration">Registration</NavLink></li>
       <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    </header>
      <main>
        <Outlet/>
      </main>
      <footer>
      <p>2023 Lorem Ipsum 2023.</p>
      </footer>
     
    </div>
  )
}
