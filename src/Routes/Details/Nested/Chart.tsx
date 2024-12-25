//암호 화폐의 가격의 변동 과정을 보여주는
//Chart Components
//Detail 하위 요소

import { useQuery } from "react-query";
import styled from "styled-components";
import { getCoin_chartData } from "../../../modules/fetchs";
import { useParams } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkTheme } from "../../../atoms";
import { Helmet } from "react-helmet-async";

interface I_Chart {
    coinNm?: string;
    coinSymbol?: string;
}

interface I_ChartData {
    time_open?: number; 
    time_close?: number; 
    open?: string; 
    high?: string; 
    low?: string; 
    close?: string; 
    volume?: string; 
    market_cap?: number;
};

const ChartBox = styled.div`
    margin-top: 5px;

    @media screen and (max-width: 400px){
        margin-top: 10px;
    }
`;

const ChartTitles = styled.div`
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

const ChartBodys = styled.div`
    margin-top: 2px;
    width: 50vw;
    height: 10vh;

    @media screen and (max-width: 400px){
        margin-top: 3px;
        max-height: 85%;
    }
`;

function Chart({coinNm, coinSymbol}: I_Chart){
    const {coinID} = useParams();

    const {isLoading: chartLoading, data: CoinChart} = useQuery<I_ChartData[]>({
        queryKey: "CoinChartData",
        queryFn: () => getCoin_chartData(coinID)
    });

    const isDarks = useRecoilValue(isDarkTheme);

    return (
        <>
            {
                chartLoading ? `${coinID}의 차트 데이터를 가져오고 있습니다.`
                : (
                    <ChartBox>
                        <ChartTitles>
                            <img src={`https://static.coinpaprika.com/coin/${coinID}/logo.png`}/>
                            <h4>{coinNm} / {coinSymbol} Chart</h4>
                        </ChartTitles>
                        <ChartBodys>
                            {
                                chartLoading ? `${coinID}의 차트를 만들고 있습니다.`
                                : (
                                    <ReactApexChart 
                                        type="candlestick"
                                        series={[
                                            {
                                                name: "Price",
                                                data: CoinChart?.map((price) => ({
                                                    x: new Date(price?.time_open as any),
                                                    y: [
                                                        parseFloat(String(price?.open)),
                                                        parseFloat(String(price?.high)),
                                                        parseFloat(String(price?.low)),
                                                        parseFloat(String(price.close))
                                                    ]
                                                })) as any[]
                                            }
                                        ]}
                                        options={{
                                            plotOptions: {
                                                candlestick: {
                                                    colors: {
                                                        upward: "#ff4757",
                                                        downward: "#5352ed"
                                                    }
                                                }
                                            },
                                            theme: {
                                                mode: isDarks ? "dark" : "light"
                                            },
                                            chart: {
                                                width: "90%",
                                                height: "80%"
                                            },
                                            xaxis: {
                                                type: "datetime",
                                                categories: CoinChart?.map(
                                                    (price) => (price.time_close)
                                                ),
                                                labels: {
                                                    datetimeFormatter: {
                                                        month: "mmm 'yy"
                                                    }
                                                }
                                            }
                                        }}
                                    />    
                                )
                            }
                        </ChartBodys>                
                    </ChartBox>
                )
            }
        </>
    );
}

export default Chart;