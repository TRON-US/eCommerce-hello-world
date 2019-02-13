import React, { Component } from "react";

import eCommerceData from "./eCommerce-data";
import "./ECommerce.scss";

export default class ECommerce extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="eCommerce-component-container">
        <p>This will be the ECommerce Component </p>
      </div>
    );
  }
}
