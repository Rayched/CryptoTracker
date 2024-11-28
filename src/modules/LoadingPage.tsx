//데이터 가져오는 동안 화면에 띄워놓을 Loading Page

import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 10px;
`;

function LoadingPage(){
    return (
        <Wrapper>
            <h4>데이터를 가져오고 있습니다.</h4>
            <h4>잠시만 기다려 주세요...</h4>
        </Wrapper>
    );
};

export default LoadingPage;