//Fetch Function 모음집

const Coins_BasedURL = "https://api.coinpaprika.com/v1";
const CoinDetail_basedURL = "https://ohlcv-api.nomadcoders.workers.dev";

export interface I_Coins {
    id?: string;
    is_active?: boolean;
    is_new?: boolean;
    name?: string;
    rank?: number;
    symbol?: string;
    type?: string;
};

export async function getCoinsData(){
    const CoinDatas: I_Coins[] = await(await(
        await fetch(`${Coins_BasedURL}/coins`)
    ).json()).slice(0, 50);

    return CoinDatas;
};

export async function getCoinDetailData(coinID?: string){
    const CoinDetails = await(await(
        await fetch(`${Coins_BasedURL}/coins/${coinID}`)
    ).json());

    return CoinDetails;
};

export async function getCoinTickers(coinID?:string) {
    const CoinTickers = await(await(
        await fetch(`${Coins_BasedURL}/tickers/${coinID}`)
    ).json());

    return CoinTickers;
};