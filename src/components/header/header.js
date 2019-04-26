import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logoCircuit from '../../assets/logo-circuit.svg'

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let bg = {
      backgroundImage: "url(" + this.props.bgimage + ")"
    };
    return (
      <header style={bg}>
        <nav className="container">
          <Link to="/">
          <img className="header_nav_icon" src={logoCircuit} alt=""/>
          </Link>
        </nav>

        <h1 className="header_title">{this.props.title}</h1>
        <h3 className="header_subtitle">{this.props.subtitle}</h3>
      </header>
    );
  }
}

export default Header;
