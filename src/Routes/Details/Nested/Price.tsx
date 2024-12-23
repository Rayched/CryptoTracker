//암호 화폐의 가격 정보를 보여주는
//Price Components
//Detail 하위 요소

import { useQuery } from "react-query";
import { getCoinTickers } from "../../../modules/fetchs";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

interface I_Priceprops {
    coinSymbol?: string;
}

const Wrapper = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const PriceTitles = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    img {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }
`;

const TickerBox = styled.div`
    margin-top: 10px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 3px solid ${(props) => props.theme.itemBgColor};
    background-color: ${(props) => props.theme.itemBorderColor};
    border-radius: 10px;
    width: 350px;
`;

const Ticker_Item = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 5px;
    width: 150px;

    span {
        padding: 3px;
    }
`;

function Price(){
    const {coinID} = useParams();

    const {isLoading: TickerLoading, data: TickerData} = useQuery({
        queryKey: "CoinTickerData",
        queryFn: () => getCoinTickers(coinID)
    });

    return (
        <>
            {
                TickerLoading ? `${coinID}의 가격 정보를 가져오고 있습니다.`
                : (
                    <Wrapper>
                        <PriceTitles>
                            <img src={`https://static.coinpaprika.com/coin/${coinID}/logo.png`}/>
                            <h4>{TickerData?.name} Price</h4>
                        </PriceTitles>
                        <TickerBox>
                            <Ticker_Item>
                                <span>가격</span>
                                <span>1 Hour</span>
                                <span>24 Hour</span>
                                <span>주간</span>
                                <span>월간</span>
                                <span>년간</span>
                            </Ticker_Item>
                            <Ticker_Item>
                                <span>$ {TickerData?.quotes?.USD?.price.toFixed(2)}</span>
                                <span>{TickerData?.quotes.USD.percent_change_1h + "%"}</span>
                                <span>{TickerData?.quotes.USD.percent_change_24h + "%"}</span>
                                <span>{TickerData?.quotes.USD.percent_change_7d + "%"}</span>
                                <span>{TickerData?.quotes.USD.percent_change_30d + "%"}</span>
                                <span>{TickerData?.quotes.USD.percent_change_1y + "%"}</span>
                            </Ticker_Item>
                        </TickerBox>
                    </Wrapper>
                )
            }
        </>
    );
};

export default Price;