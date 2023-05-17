export const namespaceAriaLabel = 'Namespace ID';
export const dataAriaLabel = 'Data';
export const customRandomnessFactor = 'Custom Randomness Factor';
export const PFB_URL = `https://blacknodelabs.one/api/sendTx`;
export const marginTop10Class = {
    marginTop: 10,
}
export const margin10BottomClass = {
    marginBottom: 10
}
export const BLOCKSPACERACE_PARAMS = {
    chainId: 'blockspacerace',
    chainName: 'Blockspace Race Testnet',
    rpc: 'https://rpc-blockspacerace.pops.one',
    rest: 'https://api-blockspacerace.pops.one'
}

export const BlockspaceAddRequestChainInfo =
    {
        chainId: BLOCKSPACERACE_PARAMS.chainId,
        chainName: BLOCKSPACERACE_PARAMS.chainName,
        rpc: BLOCKSPACERACE_PARAMS.rpc,
        rest: BLOCKSPACERACE_PARAMS.rest,
        bip44: {
            coinType: 118,
        },
        bech32Config: {
            bech32PrefixAccAddr: "celestia",
            bech32PrefixAccPub: "celestia" + "pub",
            bech32PrefixValAddr: "celestia" + "valoper",
            bech32PrefixValPub: "celestia" + "valoperpub",
            bech32PrefixConsAddr: "celestia" + "valcons",
            bech32PrefixConsPub: "celestia" + "valconspub",
        },
        currencies: [
            {
                coinDenom: "TIA",
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                coinGeckoId: "celestia",
            },
        ],
        feeCurrencies: [
            {
                coinDenom: "TIA",
                coinMinimalDenom: "utia",
                coinDecimals: 6,
                coinGeckoId: "celestia",
                gasPriceStep: {
                    low: 0.01,
                    average: 0.025,
                    high: 0.04,
                },
            },
        ],
        stakeCurrency: {
            coinDenom: "TIA",
            coinMinimalDenom: "utia",
            coinDecimals: 6,
            coinGeckoId: "celestia",
        },
    }

