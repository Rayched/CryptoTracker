//Coin Paprika API 통해서
//Coin Data를 1 ~ 50위까지 묶어서 보여주는 Component
//웹 페이지 접속 시 제일 먼저 보이므로
//'Home'으로 명명하였음.

import { useQuery } from "react-query";
import { getCoinsData, I_Coins } from "../modules/fetchs";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CoinItems = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CoinItem = styled.li`
    width: 700px;
    padding: 3px;
    margin: 5px 0px;
    background-color: ${(props) => props.theme.itemBgColor};
    border: 2px solid ${(props) => props.theme.itemBorderColor};
    border-radius: 15px;

    a {
        display: flex;
        text-decoration: none;
        color: ${(props) => props.theme.itemTextColor};
        align-items: center;
    }

    &:hover {
        scale: 1.05;
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
    width: 200px;
    padding: 10px;
    font-size: 20px;
    font-weight: bold;
`;

function Home(){
    const {isLoading: CoinsLoading, data: CoinList} = useQuery<I_Coins[]>({
        queryKey: "CoinsData",
        queryFn: getCoinsData
    });

    return (
        <>
            <CoinItems>
                <ul>
                    {
                        CoinsLoading ? "데이터 가져오는 중..."
                        : (
                            CoinList?.map((data) => {
                                return (
                                    <CoinItem>
                                        <Link to={`/${data.id}`}>
                                            <CoinImg src={`https://static.coinpaprika.com/coin/${data.id}/logo.png`}/>
                                            <CoinName>{data.name}</CoinName>
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