import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <h1>{this.props.title}</h1>
          </Link>
        </div>
      </nav>
    );
  }
}
export default Header;
