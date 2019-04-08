import React, { Component } from "react";
import Swal from "sweetalert2";

import Utils from "../../utils";
import eCommerceData from "./eCommerce-data";
import "./ECommerce.scss";

/// Add your contract address here////////////////////////////////
const contractAddress = "411496a93f7a5315b5c6682c34891704fbd067e0c9";
// base85v = "TBr511mcvfqosnyKdYFxqbVfTvRCdHUjUs"
// hex = "411496a93f7a5315b5c6682c34891704fbd067e0c9"
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
  }

  async componentDidMount() {
    await Utils.setContract(window.tronWeb, contractAddress);
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

    Utils.contract
      .addItem(item.name, item.price)
      .send({
        shouldPollResponse: true
      })
      .then(res => {
        Swal.fire({
          title: `${res.name} was added at index ${res.id}`,
          html:
            `<p>Price: ${res.price / 1000000} TRX (${res.price} SUN)</p>` +
            `<p>Seller: ${res.seller}</p>` +
            `<p>Available: ${res.available}</p>`,
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Unable to add item.",
          type: "error"
        });
      });

    this.setState({
      totalItems: totalItems + 1
    });
  }

  checkItemsTotal() {
    Utils.contract
      .checkItemsTotal()
      .send({
        callValue: 0
      })
      .then(res => {
        Swal.fire({
          title: `There are ${res.total} in this contract's store.`,
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Something went wrong in checking the total.",
          type: "error"
        });
      });
  }

  checkItem(id) {
    Utils.contract
      .checkItem(id)
      .send({
        shouldPollResponse: true,
        callValue: 0
      })
      .then(res => {
        Swal.fire({
          title: `Available: ${res.available}.`,
          type: res.available ? "success" : "error"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Unable to check item.",
          type: "error"
        });
      });
  }

  buyItem(id, price) {
    Utils.contract
      .buyItem(id)
      .send({
        shouldPollResponse: true,
        callValue: price * 1000000
      })
      .then(res => {
        Swal.fire({
          title: `You have purchased ${res.name} for ${res.price /
            1000000} TRX (${res.price} SUN).`,
          html: `<p>Seller: ${res.seller}</p>` + `<p>Buyer: ${res.buyer}</p>`,
          type: "success"
        });
      })
      .catch(err => {
        console.log(err);
        Swal.fire({
          title: "Unable to purchase item.",
          type: "error"
        });
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
// <button onClick={this.testClick}>T E S T</button>
// <p>This will be the ECommerce Component </p>
//
// <div className="eCommerce-component-dash">
//   <div>Total Items In Store: {totalItems}</div>
//   <button onClick={this.checkItemsTotal}>Total Contract Items</button>
//   <button onClick={this.addItem}>Add Item</button>
// </div>
// <div className="eCommerce-item-container">{allItems}</div>
