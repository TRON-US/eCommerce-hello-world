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

  addItem() {
    const { totalItems, dataLength, allItems } = this.state;

    if (totalItems >= dataLength) {
      Swal({
        title: "All items in data have been added to store.",
        type: "error"
      });
      return;
    }

    let item = eCommerceData[totalItems];

    item.price = `${parseFloat(Math.random() * 100).toFixed(1)} TRX`;

    allItems.push(
      <div className="eCommerce-item" key={totalItems}>
        <img className="item-image" src={item.image} alt={item.name} />
        <div className="item-name">{item.name}</div>
        <div className="price-buy-container">
          <div className="item-price">{item.price}</div>
          <button className="buy-button" onClick={this.handlePurchase}>
            Buy
          </button>
        </div>
      </div>
    );
    Utils.contract
      .addItem(item.name, item.price)
      .send({
        shouldPollResponse: true
      })
      .then(({ result }) => {
        Swal.fire({
          title: `${result.name} was added at index ${result.id}`,
          html:
            `<p>Price: ${result.price} SUN</p>` +
            `<p>Seller: ${result.seller}</p>` +
            `<p>Available: ${result.available}</p>`,
          type: "success"
        });
      });

    totalItems += 1;
    return;
  }

  totalItems() {
    Utils.contract
      .checkItemsTotal()
      .then(({ result }) => {
        Swal.fire({
          title: `There are ${result.totalItems} in this contract's store.`,
          type: "success"
        });
      })
      .catch(err => {
        Swal.fire({
          title: "Something went wrong in checking the total.",
          text: err,
          type: error
        });
      });
  }

  startEventListener() {
    Utils.contract.buyItem().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);

      if (result) {
        Swal.fire({
          title: `${result.name} has been purchased for ${result.price}.`,
          html:
            `<p>Seller: ${result.seller}</p>` + `<p>Buyer: ${result.buyer}</p>`,
          type: "success"
        });
      }
    });
  }

  render() {
    const { allItems, totalItems } = this.state;
    return (
      <div className="eCommerce-component-container">
        <div>Total Items In Store: {totalItems}</div>
        <div className="eCommerce-item-container">{allItems}</div>
      </div>
    );
  }
}
// <p>This will be the ECommerce Component </p>
// <div className="eCommerce-item-container">{allItems}</div>
