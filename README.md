# eCommerce-hello-world

#### Pre-requisites:

- Make sure you have Google Chrome Installed. If it is not installed, you can install it form here: [install Chrome](https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en-GB).
- Some familiarity with programming, using GitHub, text-editor/IDE and terminal.

### TronLink

- If you do not have TronLink already installed, you will need to install it from the Chrome Web Store: [install TronLink](https://chrome.google.com/webstore/detail/tronlink/ibnejdfjmmkpcnlpebklmnkoeoihofec?hl=en-US).
- You can view the [TronLink code on GitHub](https://github.com/TronLink/TronLink) if you would like to learn more about how it works.

### NPM

- Make sure you have NPM installed. You can install it by following instructions here: [install NPM](https://www.npmjs.com/get-npm).

### TronBox

- TronBox is a tool developed by the TRON team to help you compile and deploy your contracts quickly.
- Now that you have NPM installed, you can install TronBox globally on your machine by opening up your terminal and entering `npm install -g tronbox`.
- [TronBox GitHub](https://github.com/tronprotocol/tron-box).
- [TronBox Documentation](https://developers.tron.network/docs/tron-box-user-guide).

## Let's begin coding your first dApp on Tron!

### Set up the Project

1. Download or Clone the skeleton for this guide from [here](https://github.com/UjwalBattar/eCommerce-hello-world).
2. From your terminal, cd into this newly created directory.
3. In terminal, run `npm install`.
4. Open up this project in your favorite IDE/text-editor.

### Get Familiar with Application

1. Tour
2. Something
3. Launch the application by running `npm run start` in the terminal.
4. You should now see the application running in the browser

### Set up dotenv file

1. In the root directory of your project, create a file called `.env`
2. Open up this file and paste these lines

```
NODE_PATH='src/'
PK="enter/paste your private key here"
```

3. paste your private key in the `.env` file.
   .. 1. To get your private key, click on the TronLink extension in Chrome.
   .. 2. Make sure you are on the account tab
   .. 3. Click on Export and you should see a pop-up display with your Private Key
   .. 4. copy and paste this key in your `.env` file
4. Lastly, add `.env` in your `.gitignore` file if you plan on publishing this project on GitHub.

### Let us see TronLink and TronWeb in action

1. In the browser, on the top right, you should see the "Account Information" section. This is the first part we will get set up.
2. In your text-editor, navigate to the ./src/components/TronLinkInfo/index.js file.
3. Fetch Account Address:
   .._ Begin by uncommenting the `fetchAccountAddress` function (ln 26 - ln 36).
   .._ Now uncomment the function call on line 19 in the `componentDidMount` function.
   .._ If you go back to the browser, you should now see your account address displaying in Hex format.
   .._ If you would like to see this displayed in ASCii format, uncomment lines 29 to 32 and change the `setState` function on line 33 to look like:

```
this.setState({
accountAddress: accountAddressInASCii
});

```

.._ You should now be able to go to the browser and see your address displayed in ASCii format.
.._ You can click on the TronLink extension and verify that the address being displayed in ASCii format is indeed your account address.

4. Fetch Account Balance:
   .._ Similar to the previous function, uncomment the `fetchAccountBalance` function (ln 39 - ln 47).
   .._ Now uncomment the function call on line 20 in the `componentDidMount` function.
   .._ In the browser you should now see the balance of your account in SUN.
   .._ To view your account balance in TRX, uncomment line 41 and change the `setState` function on line 44 to look like:

```
this.setState({
  accountBalance: balanceInTRX
});
```

5. Fetch Account Bandwidth:
   .._ Uncomment the `fetchAccountBandwidth` function (ln 50 - ln 55).
   .._ Now uncomment the function call on line 21 in the `componentDidMount` function.
   ..\* In the browser, you should now see the bandwidth balance of your account.

## Congratulations! You have completed the first part of this guide! In the next part, we will write out smart contract before moving on to connecting our front-end to our smart-contract on the blockchain!
