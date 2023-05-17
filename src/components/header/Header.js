import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import celestiaLogo from './celestia-logo.jpg'
import KeplrIntegration from "../keplr/KeplrIntegration";
import './Header.css'
import {useEffect, useState} from "react";
import Keplr from "../keplr/Keplr";
import {BLOCKSPACERACE_PARAMS} from "../../utils/StylesAndParams";

function Header() {

    const [isKeplrInstalled, setIsKeplrInstalled] = useState(false);

    useEffect(() => {
        if (window.keplr) {
            try {
                window.keplr.enable(BLOCKSPACERACE_PARAMS.chainId)
                setIsKeplrInstalled(true);
            } catch (error) {
                alert("Please Refresh the page");
                setIsKeplrInstalled(false)
            }
        }
    },[])

    return (
        <AppBar position="static" style={{background: "transparent", width: window.innerWidth - 10}}>
            <img src={celestiaLogo} alt="logo" style={{width: 250, height: 50}} className="celestia"/>
            {isKeplrInstalled && <Keplr/>}
            <KeplrIntegration params={BLOCKSPACERACE_PARAMS}/>
        </AppBar>
    );
}

export default Header;
