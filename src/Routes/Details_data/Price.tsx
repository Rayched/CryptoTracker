//암호 화폐의 가격 정보를 보여주는
//Price Components
//Detail 하위 요소

import { useQuery } from "react-query";
import { getCoinTickers } from "../../modules/fetchs";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Price(){
    const {coinID} = useParams();

    const {isLoading, data} = useQuery({
        queryKey: "CoinTickerData",
        queryFn: () => getCoinTickers(coinID)
    });

    useEffect(() => console.log(data), [isLoading]);

    return (
        <div>
            <h4>Price</h4>
        </div>
    );
};

export default Price;