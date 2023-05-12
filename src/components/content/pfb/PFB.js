import {Button, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {createRandomnessFactorAndData} from "./CreateRandomness";
import {BLOCKSPACERACE_PARAMS, customRandomnessFactor, marginTop10Class} from "../../../utils/StylesAndParams";
import SendTx from "./SendTx";
import {set} from "lodash";
import axios from '../../../utils/axiosBase';
import toastError, {toastSuccess} from "../../../utils/toast";

const gridStyle = {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
};

const PFB = () => {

    const [customRandomness, setCustomRandomness] = useState(null);
    const [namespaceId, setNamespaceId] = useState(null);
    const [data, setData] = useState(null);

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
        await axios
            .post(`sendTx`, JSON.stringify(tx), {
                headers: {"Content-Type": "application/json"}
            }).catch((error) => {
                toastError(error.toString());
            }).then((res) => {
                transactionResponseTemplate(res);
            });
    }

    const transactionResponseTemplate = (res) => {
        console.log(res)
        if (res) res.status === 200 ? toastSuccess(res.data) : toastError(res.data);
    }

    return <div style={gridStyle}>
        <TextField fullWidth type="number" label={customRandomnessFactor}
                   onChange={(value) => setCustomRandomness(value)}> Custom Randomness Factor: </TextField>
        <Typography style={marginTop10Class}> Namespace ID: </Typography> {namespaceId}
        <Typography style={marginTop10Class}> Data: </Typography> {data}
        <Button style={marginTop10Class} onClick={handleCustomRandomnessFactorClicked} variant="contained"
                color="success">Generate Random Again And Calculate</Button>
        <SendTx params={BLOCKSPACERACE_PARAMS} handleSubmitTx={handleSubmitTx}/>
    </div>

}

export default PFB;