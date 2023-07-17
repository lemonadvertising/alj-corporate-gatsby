import React from 'react';
import GlobalSearch from "../Search/GlobalSearch"
import { Link } from "gatsby"


export default function Header() {
  return (
    <>
    <div className='header'>


 



<nav className="navbar navbar-expand-sm bg-light">
  <div className="container">
    <a className="navbar-brand" href="javascript:void(0)">JM</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
      <ul className="navbar-nav me-auto">
      <li className="nav-item">
      <Link to="/en/home"> Home</Link> &nbsp; &nbsp;
      </li>
      <li className="nav-item">
      <Link to="/en/news"> News </Link> &nbsp; &nbsp;
      </li>
      <li className="nav-item">
      <Link to="/en/insights"> In Sights </Link> &nbsp; &nbsp;
      </li>
      <li className="nav-item">
      <Link to="/en/in-the-news"> In The News </Link>&nbsp; &nbsp;
      </li>
      <li className="nav-item">
      <Link to="/en/become-a-partner"> Become a Partner </Link> &nbsp; &nbsp;
      </li>
      
      <li className="nav-item">
      <Link to="/en/contact-us"> Contact us </Link> &nbsp; &nbsp;
      </li>
      </ul>
      <div className='d-flex justify-content-end'>
        <GlobalSearch />
        </div>
    </div>
  </div>
</nav>




    </div>
    </>
  );
}
