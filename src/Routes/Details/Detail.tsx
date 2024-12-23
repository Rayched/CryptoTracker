//Home에서 아무 코인 탭 하나를 클릭 시
//해당 코인의 상세한 정보를 보여주는 Detail Page를 return하는
//Detail Components

import { useQuery } from "react-query";
import { Link, Route, Routes, useMatch, useParams } from "react-router-dom";
import { getCoinDetailData, getCoinTickers } from "../../modules/fetchs";
import LoadingPage from "../LoadingPage";
import styled from "styled-components";
import Chart from "./Nested/Chart";
import Price from "./Nested/Price";
import { Helmet } from "react-helmet-async";
import NavBars from "../../modules/NavigationBars";

interface I_MatchCheck {
    isActive: boolean|undefined;
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;

    font-weight: bold;
`;

const Details = styled.div`
    display: flex;
    flex-direction: row;
`;

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px;
    img {
        width: 25vw;
        height: 25vh;

        @media screen and (max-width: 400px){
            width: 15vw;
            height: 15vh;
        }
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.itemTextColor};
    background-color: ${(props) => props.theme.itemBgColor};
    margin: 0px 10px;
    padding: 3px;

    border: 3px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 15px;

    span {
        padding: 3px;
    }
`;

const InfoTitle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 0px 5px;
    align-items: center;
`;

const InfoBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
`;

const DescBox = styled.div`
    margin: 10px 0px;
    padding: 15px;
    width: 80vw;
    text-align: center;
`;

const Nesteds = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;

    width: 80vw;
    padding: 10px 20px;

    background-color: inherit;

    border: 3px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 15px;
`;

const Nested_Items = styled.div<I_MatchCheck>`
    width: 30vw;
    padding: 10px;
    background-color: ${(props) => props.isActive ? props.theme.itemBorderColor : props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 20px;
    a {
        display: block;
        text-decoration: none;
        color: ${(props) => props.isActive ? "black" : props.theme.itemTextColor};;
    };
`;

function Detail(){
    const {coinID} = useParams();

    const priceMatch = useMatch(`/:coinID/price`);
    const chartMatch = useMatch(`/:coinID/chart`);

    const {isLoading: DetailLoading, data: DetailData} = useQuery({
        queryKey: "CoinDetailData",
        queryFn: () => getCoinDetailData(coinID)
    });

    /*
   return (
    <>
        <Helmet>
            <title>{DetailData?.name}</title>
        </Helmet>
        <NavBars />
        {
            DetailLoading ? <LoadingPage />
            : (
                <Wrapper>
                    <Details>
                        <ImgContainer>
                            <img src={DetailData?.logo}/>
                        </ImgContainer>
                        <InfoContainer>
                            <InfoTitle>
                                <span>순위</span>
                                <span>이름</span>
                                <span>심볼</span>
                                <span>출시일</span>
                                <span>1st Update</span>
                                <span>Last Update</span>
                            </InfoTitle>
                            <InfoBody>
                                <span>{DetailData?.rank}</span>
                                <span>{DetailData?.name}</span>
                                <span>{DetailData?.symbol}</span>
                                <span>{DetailData?.started_at}</span>
                                <span>{DetailData?.first_data_at}</span>
                                <span>{DetailData?.last_data_at}</span>
                            </InfoBody>
                        </InfoContainer>
                    </Details>
                    <DescBox>
                        {DetailData?.description}
                    </DescBox>
                    <Nesteds>
                        <Nested_Items isActive={chartMatch !== null}>
                            <Link to={`/${coinID}/chart`}>Chart</Link>
                        </Nested_Items>
                        <Nested_Items isActive={priceMatch !== null}>
                            <Link to={`/${coinID}/price`}>Price</Link>
                        </Nested_Items>
                    </Nesteds>
                    <Routes>
                        <Route path="chart" element={<Chart coinNm={DetailData?.name} coinSymbol={DetailData?.symbol}/>}/>
                        <Route path="price" element={<Price coinSymbol={DetailData?.symbol} />}/>
                    </Routes>
                </Wrapper>
            )
        }
    </>
   );*/
   return null;
};

export default Detail;
