//Coin Paprika API 통해서
//Coin Data를 1 ~ 50위까지 묶어서 보여주는 Component
//웹 페이지 접속 시 제일 먼저 보이므로
//'Home'으로 명명하였음.

import { useQuery } from "react-query";
import { getCoinsData, I_Coins } from "../modules/fetchs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import LoadingPage from "./LoadingPage";
import { Helmet } from "react-helmet-async";
import NavBars from "../modules/NavigationBars";

const CoinItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CoinItem = styled.li`
    width: 80vw;
    padding: 3vw;
    margin: 10px 0px;
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 25px;

    a {
        display: flex;
        text-decoration: none;
        color: ${(props) => props.theme.itemTextColor};
        align-items: center;
    }

    &:hover {
        scale: 1.04;
    }
`;

const CoinImg = styled.img`
    width: 50px;
    height: 50px;
    padding: 10px;
    margin: 0px 10px;
`;

const CoinName = styled.div`
    display: inline-block;
    width: 40vw;
    padding: 5vw;
    font-size: 1.5em;
    font-weight: bold;
`;

function Home(){
    const {isLoading: CoinsLoading, data: CoinList} = useQuery<I_Coins[]>({
        queryKey: "CoinsData",
        queryFn: getCoinsData
    });

    return (
        <>
            <NavBars />
            <Helmet>
                <title>Crypto Tracker</title>
            </Helmet>
            <CoinItems>
                <ul>
                    {
                        CoinsLoading ? <LoadingPage />
                        : (
                            CoinList?.map((data) => {
                                return (
                                    <CoinItem key={data?.id}>
                                        <Link to={`/${data?.id}`} state={data?.name}>
                                            <CoinImg src={`https://static.coinpaprika.com/coin/${data?.id}/logo.png`}/>
                                            <CoinName>{data?.name}</CoinName>
                                        </Link>
                                    </CoinItem>
                                );
                            })
                        )
                    }
                </ul>
            </CoinItems>
        </>
    );
};

export default Home;