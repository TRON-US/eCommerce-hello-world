import React, { Component } from "react";
import Swal from "sweetalert2";

import Utils from "../../utils";
import eCommerceData from "./eCommerce-data";
import "./ECommerce.scss";

/// Add your contract address here////////////////////////////////å
const contractAddress = "4175e28fbf92bcd5afae462bb93a217f1ef3b9b2af";
// base85v = "TLiXUGoitF1qPM6Z2c8g6fygiawoEyLXWL"
// hex = "4175e28fbf92bcd5afae462bb93a217f1ef3b9b2af"
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
    this.checkItem = this.checkItem.bind(this);
    this.checkItemsTotal = this.checkItemsTotal.bind(this);
    this.startEventListeners = this.startEventListeners.bind(this);
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
    this.startEventListeners();
  }

  addItem() {
    const { totalItems, dataLength, allItems } = this.state;

    if (totalItems >= dataLength) {
      Swal({
        title: "No more items in data to add.",
        type: "error"
      });
      return;
    }

    let item = eCommerceData[totalItems];
    item.price = parseFloat(Math.random() * 10).toFixed(0);
    item.id = totalItems;

    allItems.push(
      <div className="eCommerce-item" key={item.id}>
        <img className="item-image" src={item.image} alt={item.name} />
        <div className="item-name">{item.name}</div>
        <div className="price-buy-container">
          <div className="item-price">{item.price} TRX</div>
          <button
            className="buy-button"
            onClick={() => this.buyItem(item.id, item.price)}
          >
            Buy
          </button>
          <button
            className="buy-button"
            onClick={() => this.checkItem(item.id)}
          >
            Check
          </button>
        </div>
      </div>
    );

    this.setState({
      totalItems: totalItems + 1
    });

    Utils.contract.addItem(item.name, item.price).send({
      shouldPollResponse: true
    });
  }

  async checkItemsTotal() {
    Utils.contract.checkItemsTotal().send({
      callValue: 0
    });

    let checkTotal = await Utils.contract.Total().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `This contract has ${result.totalItems} items.`,
          type: "success"
        });
        checkTotal.stop();
      }
    });
  }

  async checkItem(id) {
    Utils.contract.checkItem(id).send({
      callValue: 0
    });

    let checkAvailability = await Utils.contract
      .Availability()
      .watch((err, { result }) => {
        if (err) return console.log("Failed to bind event listener", err);
        if (result) {
          Swal.fire({
            title: `Available: ${result.available}.`,
            type: result.available ? "success" : "error"
          });
          checkAvailability.stop();
        }
      });
  }

  buyItem(id, price) {
    Utils.contract.buyItem(id).send({
      shouldPollResponse: true,
      callValue: price * 1000000 // converted to SUN
    });
  }

  startEventListeners() {
    Utils.contract.Purchased().watch((err, { result }) => {
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

    Utils.contract.Added().watch((err, { result }) => {
      if (err) return console.log("Failed to bind event listener", err);
      if (result) {
        Swal.fire({
          title: `${result.name} has been added for ${result.price}.`,
          html:
            `<p>Seller: ${result.seller}</p>` +
            `<p>Added: ${result.exists}</p>` +
            `<p>Available: ${result.available}</p>`,
          type: "success"
        });
      }
    });
  }

  render() {
    const { allItems, totalItems } = this.state;
    return (
      <div className="eCommerce-component-container">
        <div className="eCommerce-component-dash">
          <div>Total Items In Store: {totalItems}</div>
          <button onClick={this.checkItemsTotal}>Total Contract Items</button>
          <button onClick={this.addItem}>Add Item</button>
        </div>
        <div className="eCommerce-item-container">{allItems}</div>
      </div>
    );
  }
}
