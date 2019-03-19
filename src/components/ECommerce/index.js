import React, { Component } from "react";
import Swal from "sweetalert2";

import Utils from "utils";
import eCommerceData from "./eCommerce-data";
import "./ECommerce.scss";

/// Add your contract address here////////////////////////////////
const contractAddress = "41914cd6bea295134c634fceddc45ea2cbb8fc9883";
// base85v = "TPDV2jMWeJWy6c3rTSs6y1RwaYGaFiZGB7"
// hex = "41914cd6bea295134c634fceddc45ea2cbb8fc9883"
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
    item.price = parseFloat(Math.random() * 50).toFixed(0);
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
        console.log(res);
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
      });

    this.setState({
      totalItems: totalItems + 1
    });
    return;
  }

  checkItemsTotal() {
    Utils.contract.checkItemsTotal().send({
      shouldPollResponse: true,
      callValue: 0
    });
    // .then(res => {
    //   console.log(res);
    //   Swal.fire({
    //     title: `There are ${res.total} in this contract's store.`,
    //     type: "success"
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    //   Swal.fire({
    //     title: "Something went wrong in checking the total.",
    //     type: "error"
    //   });
    // });
  }

  checkItem(id) {
    Utils.contract.checkItem(id).send({
      shouldPollResponse: true,
      callValue: 0
    });
    // .then(res => {
    //   console.log(res);
    //   Swal.fire({
    //     title: `Available: ${res.available}.`,
    //     type: res.available ? "success" : "error"
    //   });
    // })
    // .catch(err => {
    //   console.log(err);
    // });
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

  startEventListeners() {
    Utils.contract.Purchased().watch((err, result) => {
      console.log(err);
      if (err) return console.log("Failed to bind event listener", err);
      console.log(result);
      if (result) {
        Swal.fire({
          title: `${result.name} has been purchased for ${result.price}.`,
          html:
            `<p>Seller: ${result.seller}</p>` + `<p>Buyer: ${result.buyer}</p>`,
          type: "success"
        });
      }
    });

    Utils.contract.Added().watch((err, result) => {
      console.log(err);
      if (err) return console.log("Failed to bind event listener", err);
      console.log(result);
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

    Utils.contract.Total().watch((err, result) => {
      console.log(err);
      if (err) return console.log("Failed to bind event listener", err);
      console.log(result);
      if (result) {
        Swal.fire({
          title: `This contract has ${result.totalItems} items.`,
          type: "success"
        });
      }
    });

    Utils.contract.Availability().watch((err, result) => {
      console.log(err);
      if (err) return console.log("Failed to bind event listener", err);
      console.log(result);
      if (result) {
        Swal.fire({
          title: `Available: ${result.available}.`,
          type: result.available ? "success" : "error"
        });
      }
    });
  }

  render() {
    const { allItems, totalItems } = this.state;
    return (
      <div className="eCommerce-component-container">
        <p>This will be the ECommerce Component </p>
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
