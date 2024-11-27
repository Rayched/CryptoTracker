//Fetch Function 모음집

const Coins_BasedURL = "https://api.coinpaprika.com/v1";

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
    const CoinsFetch: I_Coins[] = await(await(
        await fetch(`${Coins_BasedURL}/coins`)
    ).json()).slice(0, 50);

    return CoinsFetch;
};

export async function getCoinDetailData(){
    const CoinDetailFetch = await(await(
        await fetch(``)
    ).json());

    return CoinDetailFetch;
};