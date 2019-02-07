import React from 'react';

import TronLinkLogo from './TronLinkLogo.png';
import './TronLinkGuide.scss';

const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

const logo = (
    <div className='logo'>
        <img src={ TronLinkLogo } alt='TronLink logo' />
    </div>
);

const openTronLink = () => {
    window.open(WEBSTORE_URL, '_blank');
};

const TronLinkGuide = props => {
    const {
        installed = false
    } = props;

    if(!installed) {
        return (
            <div className='tronLink' onClick={ openTronLink }>
                <div className='info'>
                    <h1>TronLink Required</h1>
                    <p>
                        To create a post or tip others you must install TronLink. TronLink is a TRON wallet for the browser
                        that can be <a href={ WEBSTORE_URL } target='_blank' rel='noopener noreferrer'>installed from the Chrome Webstore</a>.
                        Once installed, return back and refresh the page.
                    </p>
                </div>
                { logo }
            </div>
        );
    }

    return (
        <div className='tronLink hover' onClick={ openTronLink }>
            <div className='info'>
                <h1>Log in Required</h1>
                <p>
                    TronLink is installed but you must first log in. Open TronLink from the browser bar and set up your
                    first wallet or decrypt a previously-created wallet.
                </p>
            </div>
            { logo }
        </div>
    );
};

export default TronLinkGuide;