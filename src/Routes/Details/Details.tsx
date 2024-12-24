import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch, useParams } from "react-router-dom";
import styled from "styled-components";
import { getCoinDetailData } from "../../modules/fetchs";
import { useEffect } from "react";
import LoadingPage from "../LoadingPage";
import NavBars from "../../modules/NavigationBars";
import Chart from "./Nested/Chart";
import Price from "./Nested/Price";

interface I_NestedBtn {
    isActives: boolean;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100vw;
    max-height: 100vh;
    margin-top: 10px;
    font-weight: bold;

    @media screen and (max-width: 500px){
        font-size: 18px;
    }

    @media screen and (max-width: 400px){
        font-size: 16px;
    }
`;

const CoinDetails = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80vw;
    height: 25vh;

    @media screen and (max-width: 400px){
        height: 20vh;
    };
`;

const CoinImgs = styled.img`
    display: block;
    width: 35vw;
    height: 35vh;
    padding: 3px;
    margin: 0px 3px;
    @media screen and (max-width: 500px){
        width: 25vw;
        height: 25vw;
    }
    @media screen and (max-width: 400px){
        width: 18vw;
        height: 15vh;
    }
`;

const CoinData = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .Box {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 0px 5px;

        span {
            padding: 5px;
        }
    }
    width: 50vw;
    height: 20vh;
    color: ${(props) => props.theme.itemTextColor};
    background-color: ${(props) => props.theme.itemBgColor};
    border-radius: 15px;

    @media screen and (max-width: 400px){
        width: 55vw;
        height: 17vh;
    }
`;

const Desc = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    padding: 5px;
    width: 90vw;
    height: 15vh;

    color: ${(props) => props.theme.TextColor};
    background-color: ${(props) => props.theme.itemBgColor};
    border-radius: 15px;
`;

const NestedContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px;
    background-color: ${(props) => props.theme.itemBgColor};
    margin-top: 10px;
    border-radius: 15px;
`;

const NestedBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-size: 18px;

    width: 12vw;
    height: 3vh;
    margin: 0px 10px;

    background-color: ${(props) => props.theme.itemBorderColor};

    a {
        display: block;
        text-decoration: none;
        padding: 0px 10px;
        color: ${(props) => props.theme.TextColor};
    }

    &:hover {
        a {
            color: ${(props) => props.theme.itemTextColor};
        }
        background-color: ${(props) => props.theme.itemBgColor};
        border: 2px solid ${(props) => props.theme.itemBorderColor};
    }

    @media screen and (max-width: 400px){
        width: 60px;
    }
`;

const NestedPages = styled.div``;

function Details(){
    const {coinID} = useParams();

    const isChart = useMatch("/:coinID/chart");
    const isPrice = useMatch("/:coinID/price");

    const {isLoading: DetailsLoading, data: DetailData} = useQuery({
        queryKey: "CoinDetailData",
        queryFn: () => getCoinDetailData(coinID)
    });

    const ConvertDateTimes = (targetDt?: string) => {
        const DateTimes = new Date(String(targetDt));

        const Converts = (target: number) => {
            if (target < 10){
                return "0" + String(target);
            } else {
                return String(target);
            };
        }

        const Years = String(DateTimes.getFullYear());
        const Months = Converts(DateTimes.getMonth() + 1);
        const Dates = Converts(DateTimes.getDate());

        const FullDates = [Years, Months, Dates];

        return FullDates.join("-");
    }

    useEffect(() => {
        console.log(DetailData);
    }, [DetailsLoading]);

    return (
        <>
            <Helmet>
                <title>{DetailData?.name}</title>
            </Helmet>
            <NavBars />
            {
                DetailsLoading ? <LoadingPage />
                : (
                    <Wrapper>
                        <CoinDetails>
                            <CoinImgs src={DetailData?.logo}/>
                            <CoinData>
                                <div className="Box">
                                    <span>순위</span>
                                    <span>이름</span>
                                    <span>심볼</span>
                                    <span>출시일</span>
                                </div>
                                <div className="Box">
                                    <span>{DetailData?.rank}</span>
                                    <span>{DetailData?.name}</span>
                                    <span>{DetailData?.symbol}</span>
                                    <span>{ConvertDateTimes(DetailData?.started_at)}</span>
                                </div>
                            </CoinData>
                        </CoinDetails>
                        <Desc>{DetailData?.description}</Desc>
                        <NestedContainer>
                            <NestedBtn>
                                <Link to={`/${coinID}/chart`}>Chart</Link>
                            </NestedBtn>
                            <NestedBtn>
                                <Link to={`/${coinID}/price`}>Price</Link>
                            </NestedBtn>
                        </NestedContainer>
                        <NestedPages>
                            <Routes>
                                <Route 
                                    path="chart" 
                                    element={
                                        <Chart 
                                            coinNm={DetailData?.name} 
                                            coinSymbol={DetailData?.symbol}
                                        />
                                    }
                                />
                                <Route 
                                    path="price"
                                    element={<Price />}
                                />
                            </Routes>
                        </NestedPages>
                    </Wrapper>
                )
            }
        </>
    );
};

export default Details;