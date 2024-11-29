//테마 변환 용 ToggleBtn Components

import { useRecoilState } from "recoil";
import { isDarkTheme } from "./atoms";
import styled from "styled-components";

interface I_toggles {
    toggle?: boolean;
}

const BtnContainer = styled.div`
    width: 50px;
    height: 25px;
    border: 3px solid black;
    border-radius: 25px;

    margin-right: 15px;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    transition: all 0.4s ease-in-out;
    cursor: pointer;

    background-color: ${(props) => props.theme.itemTextColor};
`;

const Toggles = styled.div<I_toggles>`
    width: 20px;
    height: 20px;
    border: 2px solid black;
    border-radius: 20px;
    align-items: center;
    text-align: center;

    position: absolute;

    transition: all 0.4s ease-in-out;
    transform: ${(props) => props.toggle ? "translate(11px, 0)" : "translate(-11px, 0)"};
    background-color: ${(props) => props.theme.itemBgColor};
`;

function ToggleBtn(){
    const [isDarks, setDarks] = useRecoilState(isDarkTheme);

    const ChangeThemes = () => setDarks(!isDarks);
    
    return (
        <BtnContainer onClick={ChangeThemes}>
            <Toggles toggle={isDarks}/>
        </BtnContainer>
    );
};

export default ToggleBtn;