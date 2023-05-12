import {marginTop10Class} from "../../../utils/StylesAndParams";
import {Button} from "@mui/material";
import {isEmpty} from "lodash";
import {useContext} from "react";
import WalletAccountContext from "../../../context/WalletAccountContext";
import toastError, {toastInfo} from "../../../utils/toast";

const message = "Please sign this message to prove your ownership on this address, \n This will not cost you any transaction fees.";
const toastInfoMessage = "Transaction is being sent... You will notified when it is completed.";
const SendTx = (props) => {

    const {account} = useContext(WalletAccountContext);

    const handleSendTx = async (signature) => {
        let tx = {
            address: account[0].address.toString(), // we do not need to send this to the backend, we are obtaining it from signature, just for another procaution.
            signature: signature,
            signedMessage: message
        }
        await props.handleSubmitTx(tx);
    }

    const handleSendTxClicked = async () => {
        if (!isSendTxButtonDisabled()) {
            await window.keplr.signArbitrary(
                props.params.chainId.toString(),
                account[0].address.toString(),
                message
            ).catch((error) => {
                toastError(error.toString());
            }).then((res) => {
                toastInfo(toastInfoMessage);
                handleSendTx(res);
            });
        }
    }

    const isSendTxButtonDisabled = () => {
        return !account || isEmpty(account[0].address);
    }

    return <>
        <Button style={marginTop10Class} variant="contained" disabled={isSendTxButtonDisabled()}
                color="success" onClick={handleSendTxClicked}>Send Tx</Button>
    </>
}

export default SendTx;