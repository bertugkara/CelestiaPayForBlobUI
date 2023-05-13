import {Button, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createRandomnessFactorAndData} from "./CreateRandomness";
import {BLOCKSPACERACE_PARAMS, customRandomnessFactor, marginTop10Class, PFB_URL} from "../../../utils/StylesAndParams";
import SendTx from "./SendTx";
import {isEmpty, set} from "lodash";
import axios from '../../../utils/axiosBase';
import toastError, {toastSuccess} from "../../../utils/toast";
import TxConclusionTemplate from "./TxConclusionTemplate";

const gridStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
};

const PFB = () => {

    const [customRandomness, setCustomRandomness] = useState(null);
    const [namespaceId, setNamespaceId] = useState(null);
    const [data, setData] = useState(null);
    const [txResult, setTxResult] = useState(null);
    const [isLoadingScreenVisible, setIsLoadingScreenVisible] = useState(false);

    const handleCustomRandomnessFactorClicked = (customRandomness) => {
        const {nID, msg} = createRandomnessFactorAndData(customRandomness);
        setNamespaceId(nID);
        setData(msg);
    }

    useEffect(() => {
        handleCustomRandomnessFactorClicked() // create randomness at rendering
    }, []);

    useEffect(() => {
        handleCustomRandomnessFactorClicked(customRandomness) // custom randomness factor
    }, [customRandomness]);

    const handleSubmitTx = async (tx) => {
        set(tx, "namespaceId", namespaceId);
        set(tx, "data", data);
        console.log(tx);
        setIsLoadingScreenVisible(true);
        await axios
            .post(PFB_URL, JSON.stringify(tx), {
                headers: {"Content-Type": "application/json"}
            }).catch((error) => {
                toastError(error.toString());
            }).then((res) => {
                transactionResponseTemplate(res);
            });
    }

    const transactionResponseTemplate = (res) => {
        if (res && res.status === 200 && res.data) {
            toastSuccess(res.data)
            setTxResult(res.data);
        } else if (res && res.status === 401) {
            console.log(res)
            toastError("You are owner of this Node.");
        } else {
            toastError("Something went wrong.");
            console.log(res)
        }
    }

    return <div style={gridStyle}>
        <TextField fullWidth type="number" label={customRandomnessFactor}
                   onChange={(value) => setCustomRandomness(value)}> Custom Randomness Factor: </TextField>
        <Typography style={marginTop10Class}> Namespace ID: </Typography> {namespaceId}
        <Typography style={marginTop10Class}> Data: </Typography> {data}
        <Button style={marginTop10Class} onClick={handleCustomRandomnessFactorClicked} variant="contained"
                color="success">Generate Random Again And Calculate</Button>
        <SendTx params={BLOCKSPACERACE_PARAMS} handleSubmitTx={handleSubmitTx}/>
        {!isEmpty(txResult) ? <div style={marginTop10Class}>
            <TxConclusionTemplate txResult={txResult}/>
        </div> : <h2 hidden={!isLoadingScreenVisible}>Loading...</h2>
        }
    </div>

}

export default PFB;