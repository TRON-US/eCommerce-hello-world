import React, { Component } from "react";
import TronWeb from "tronweb";

import Utils from "utils";
import ECommerce from "components/ECommerce";
import TronLinkInfo from "components/TronLinkInfo";
import TronLinkGuide from "components/TronLinkGuide";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tronweb: {
        installed: false,
        loggedIn: false
      }
    };
  }

  render() {
    // if (!this.state.tronWeb.installed) return <TronLinkGuide />;
    //
    // if (!this.state.tronWeb.loggedIn) return <TronLinkGuide installed />;

    return (
      <div>
        <header className="header-container">
          <div className="resource-links-container">
            <a
              href="https://developers.tron.network/docs"
              rel="noopener noreferrer"
              target="_blank"
            >
              Guide
            </a>
            <a
              href="https://developers.tron.network/docs"
              rel="noopener noreferrer"
              target="_blank"
            >
              API Reference
            </a>
            <a
              href="https://tronscan.org/#/"
              rel="noopener noreferrer"
              target="_blank"
            >
              TronScan
            </a>
            <a
              href="https://tronstation.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              TronStation
            </a>
          </div>
          <TronLinkInfo />
        </header>
        <div>
          <ECommerce />
        </div>
      </div>
    );
  }
}
