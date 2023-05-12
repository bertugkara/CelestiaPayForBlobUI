import {Button, Paper} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import {isEmpty} from "lodash";
import '../header/Header.css'
import {Logout, Wallet} from "@mui/icons-material";
import WalletAccountContext from "../../context/WalletAccountContext";

const Keplr = () => {

    const {account, setAccount} = useContext(WalletAccountContext);

    const handleConnectKeplr = async () => {
        const offlineSigner = await window.getOfflineSigner("blockspacerace");
        let accountData = await offlineSigner.getAccounts();
        setAccount(accountData);
    }

    const keplrButtonTemplate = <Button onClick={handleConnectKeplr}>Connect Keplr <Wallet/> </Button>

    const walletInfoDisconnectButtonTemplate = () => {
        return <>
            <Paper variant="outlined" className="celestia">{account[0]?.address}</Paper>
            <Button onClick={() => setAccount(null)}>Disconnect Wallet <Logout/> </Button>
        </>
    }

    return <>
        {isEmpty(account) ? keplrButtonTemplate : walletInfoDisconnectButtonTemplate()}
    </>
}

export default Keplr;