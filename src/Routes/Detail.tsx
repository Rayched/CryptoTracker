//Home에서 아무 코인 탭 하나를 클릭 시
//해당 코인의 상세한 정보를 보여주는 Detail Page를 return하는
//Detail Components

import { useQuery } from "react-query";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getCoinDetailData } from "../modules/fetchs";
import LoadingPage from "../modules/LoadingPage";
import styled from "styled-components";
import Chart from "./Details_data/Chart";
import Price from "./Details_data/Price";

const HomeBtn = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;

    font-weight: bold;
    background-color: ${(props) => props.theme.itemBorderColor};
    border: 2px solid ${(props) => props.theme.itemTextColor};
    border-radius: 15px;

    position: fixed;
    top: 93%;
    left: 87%;
    padding: 10px;

    color: ${(props) => props.theme.TextColor};

    a {
        text-decoration: none;
        color: inherit;
    }
    &:hover {
        color: ${(props) => props.theme.itemTextColor};
        background-color: ${(props) => props.theme.itemBgColor};
    }
`;

function Detail(){
    const {coinID} = useParams();

    const {isLoading: DetailLoading, data: DetailData} = useQuery({
        queryKey: "CoinDetailData",
        queryFn: () => getCoinDetailData(coinID)
    });
    
    return (
        <div>
            {
                DetailLoading ? <LoadingPage /> : (
                    <div>
                        <img src={DetailData?.logo}/>
                        <div>이름: {DetailData?.name}</div>
                        <div>심볼: {DetailData?.symbol}</div>
                        <div>랭크: {DetailData?.rank}</div>
                        <div>First Update: {DetailData?.first_data_at}</div>
                        <div>Last Update: {DetailData?.last_data_at}</div>
                        <div>
                            {DetailData?.description}
                        </div>
                    </div>
                )
            }
            <Routes>
                <Route path="price" element={<Price />}/>
                <Route path="chart" element={<Chart />}/>
            </Routes>
            <HomeBtn>
                <Link to={"/"}>
                    ← Home
                </Link>
            </HomeBtn>
        </div>
    );
};

export default Detail;