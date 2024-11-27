//Coin Paprika API 통해서
//Coin Data를 1 ~ 50위까지 묶어서 보여주는 Component
//웹 페이지 접속 시 제일 먼저 보이므로
//'Home'으로 명명하였음.

import { useQuery } from "react-query";
import { getCoinsData, I_Coins } from "../modules/fetchs";
import styled from "styled-components";

const Headers = styled.header`
  padding: 10px 0px;
  background-color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Titles = styled.h3`
  font-size: 19px;
  font-weight: bold;
  color: inherit;
`;

const NavBar = styled.nav``;

const CoinItems = styled.li`
    padding: 3px;
    margin: 5px 0px;
`;

function Home(){
    const {isLoading: CoinsLoading, data: Coins} = useQuery<I_Coins[]>({
        queryKey: "CoinsData",
        queryFn: getCoinsData
    });

    return (
        <div>
            <div>
                <Headers>
                    <Titles>
                        <div>Crypto Tracker mk3</div>
                    </Titles>
                    <NavBar>
                        <button>테마 변경</button>
                    </NavBar>
                </Headers>
            </div>
            <div>
                <ul>
                    {
                        CoinsLoading ? "데이터 가져오는 중..."
                        : (
                            Coins?.map((data) => {
                                return (
                                    <CoinItems>
                                        {data.id} / {data.name}
                                    </CoinItems>
                                );
                            })
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Home;