import React, { Component } from "react";
import Swal from "sweetalert2";

import Utils from "utils";
import eCommerceData from "./eCommerce-data";
import "./ECommerce.scss";

/// Add your contract address here////////////////////////////////
// const contractAddress = "410a69562aa3bfeb43e6b684e3faefe0707a47e7af";
// base58= TAvFwtg7xdcZuVS3Mnki7bxXkzuW3Hhp8b
// hex= 410a69562aa3bfeb43e6b684e3faefe0707a47e7af
/////////////////////////////////////////////////////////////////

export default class ECommerce extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataLength: eCommerceData.length,
      allItems: [],
      totalItems: 0
    };

    this.addItem = this.addItem.bind(this);
    this.buyItem = this.buyItem.bind(this);
    this.totalItems = this.totalItems.bind(this);
    this.startEventListener = this.startEventListener.bind(this);
  }

  componentDidMount() {
    this.startEventListener();
  }
  }

  render() {
    return (
      <div className="eCommerce-component-container">
        <p>This will be the ECommerce Component </p>
      </div>
    );
  }
}
