import {Button, Card, CardContent, Typography} from "@mui/material";

const TxConclusionTemplate = (props) => {

    const txResult = props.txResult;

    const handleOnClickExplorerRouter = () => {
        window.open(`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txResult.txhash}`, '_blank');
    }

    return <Card sx={{ minWidth:750, maxWidth: 1000, margin: 'auto' }}>
        <CardContent>
            <Typography variant="h5" component="h2">
                Transaction Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Blockchain Height:</strong> {txResult.height}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Transaction Hash:</strong> {txResult.txhash}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Data:</strong> {txResult.data}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <strong>Gas Used:</strong> {txResult.gas_used}
            </Typography>
            <Button onClick={handleOnClickExplorerRouter}>View on Mintscan</Button>
        </CardContent>
    </Card>

}

export default TxConclusionTemplate;