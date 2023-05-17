import styles from './Keplr.module.css'
import React, {useEffect, useState} from 'react';
import {BlockspaceAddRequestChainInfo} from "../../utils/StylesAndParams";

const KeplrIntegration = ({params}) => {

    const [chainExists, setChainExists] = useState(false);

    const checkChainExists = async () => {
        if (window.keplr && window.getOfflineSigner) {
            try {
                await window.keplr.enable(params.chainId);
                setChainExists(true);
            } catch (error) {
                setChainExists(false);
            }}
    }

    useEffect(() => {
        checkChainExists();
    }, [params.chainId, chainExists]);

    async function add() {
        if (!window.keplr) {
            alert("Please install keplr extension");
        } else if (window.keplr.experimentalSuggestChain) {
            try {
                await window.keplr.experimentalSuggestChain(BlockspaceAddRequestChainInfo)
            } catch {
                alert("Failed to suggest the chain");
            }
            const chainId = params.chainId;
            // Enabling before using the Keplr is recommended.
            // This method will ask the user whether to allow access if they haven't visited this website.
            // Also, it will request that the user unlock the wallet if the wallet is locked.
            await window.keplr.enable(chainId);
            setChainExists(true);
        }
    }

    return (
        <div className="center">
            { !chainExists &&
                <button className={styles.keplrButton} onClick={add}>Add/Switch To {params.chainName}</button>}
        </div>
    )
}

export default KeplrIntegration;
