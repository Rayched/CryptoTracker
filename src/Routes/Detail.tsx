//Home에서 아무 코인 탭 하나를 클릭 시
//해당 코인의 상세한 정보를 보여주는 Detail Page를 return하는
//Detail Components

import { useParams } from "react-router-dom";

function Detail(){
    const {coinID} = useParams();
    
    return (
        <div>
            <h4>Detail</h4>
            <p>CoinID : {`${coinID}`}</p>
        </div>
    );
};

export default Detail;