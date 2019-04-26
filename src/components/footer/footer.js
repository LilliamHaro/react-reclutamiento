import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <footer>
        <div className="container footer_content">footer copyright</div>
      </footer>
    );
  }
}

export default Footer;
