/**
 * PC 버전, 모바일 버전 따로 구현하기
 * 
 * pc 
 * Crypto Tracker Title
 * [Home 버튼 / 테마 버튼]
 * 
 * Mobile
 * [버튼] => 테마 (Light / Dark)
 *           홈 버튼
 */

import styled from "styled-components";
import ToggleBtn from "./ToggleBtn";
import { Link, useMatch } from "react-router-dom";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { isDarkTheme } from "../atoms";

interface I_VerticalNavs {
    Opens?: boolean;
    isOpens?: boolean;
}

const NavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const HorizontalNavs = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 500px){
        display: none;
    }
`;

const HomeBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 8vw;
    height: 3vh;
    padding: 2px;
    background-color: white;
    border-radius: 20px;
    a {
        display: block;
        text-decoration: none;
        font-weight: bold;
    };
`;

const SolidBar = styled.div`
  background-color: ${(props) => props.theme.itemBgColor};
  width: 90vw;
  height: 3px;
`;

const VerticalNavs = styled.div<I_VerticalNavs>`
    @media screen and (max-width: 500px){
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 1%;
        right: 0.5%;
        width: 35vw;
        height: 845vh;
        background-color: ${
            (props) => props.Opens 
            ? "rgba(189, 195, 199, 0.7)"
            : "inherit"
        };
        border-radius: 20px;
    };

    @media screen and (max-width: 400px){
        top: 0.4%;
    }
`;

const BarOpenBtn = styled.div<I_VerticalNavs>`
    display: inherit;
    justify-content: ${(props) => props.isOpens ? "left" : "right"};
    align-items: center;
    padding-top: 3vh;
    padding-right: 2vw;
    padding-left: 2vw;

    @media screen and (min-width: 501px){
        display: none;
    }
`;

const CloseImgs = styled.img`
    width: 8vw;
    height: 5vh;
    display: block;
    margin: 0px;

    @media screen and (max-width: 400px){
        width: 8vw;
        height: 3.5vh;
    }
`;

const OpenImgs = styled.img`
    width: 8vw;
    height: 5vh;
    display: block;
    margin: 0px;

    @media screen and (max-width: 400px){
        width: 8vw;
        height: 3.5vh;
    }
`;

const Vertical_Bars = styled.div<I_VerticalNavs>`
    display: ${(props) => props.Opens ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0px;
`;

const ThemeState = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 50%;
    padding: 4px;
    margin-bottom: 5px;

    color: black;
    border: 1px solid rgb(178, 190, 195);
    border-radius: 15px;
    background-color: rgba(178, 190, 195, 0.8);

    span {
        padding: 0px 5px;
        text-align: center;
        font-weight: bold;
    }
`;

const ThemeSelector = styled.select`
    width: 90%;
    height: 60%;
    padding: 4px;
    border-radius: 15px;
    font-weight: bold;

    option {
        font-weight: bold;
    }
`;

const ReturnedHomeBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    border: 1px solid rgb(178, 190, 195);
    border-radius: 15px;
    background-color: rgb(178, 190, 195);
    margin: 40px 0px;
    padding: 5px;
    width: 80%;

    a {
        text-decoration: none;
        font-weight: bold;
        color: inherit;
        display: block;
    }

    &:hover {
        background-color: rgb(200, 200, 200);
    }
`;

function NavBars(){
    const DetailsMatch = useMatch("/:coinID/*");

    const [isBars, setBars] = useState(false);

    const [themes, setThemes] = useRecoilState(isDarkTheme);

    const openBars = () => setBars(!isBars);

    const ChangeThemes = (event: React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        
        if(value === "Light"){
            setThemes(false);
        } else if(value==="Dark"){
            setThemes(true)
        } else {
            return;
        }
    };

    return (
        <NavContainer>
            <HorizontalNavs>
                {
                    DetailsMatch ? (
                        <HomeBtn>
                            <Link to={"/"}>Home</Link>
                        </HomeBtn>
                    ) : null
                }
                <ToggleBtn />
            </HorizontalNavs>
            <VerticalNavs Opens={isBars}>
                <BarOpenBtn isOpens={isBars}>
                    {
                        isBars ? <CloseImgs onClick={openBars} src={`${process.env.PUBLIC_URL}/icons/CloseImgs.png`}/>
                        : <OpenImgs onClick={openBars} src={`${process.env.PUBLIC_URL}/icons/OpenImgs.png`}/>
                        //icons/CloseImgs.png
                    }
                </BarOpenBtn>
                <Vertical_Bars Opens={isBars}>
                    <ThemeState>
                        <span>현재 테마</span>
                        <span>{themes ? "Dark" : "Light"}</span>
                        </ThemeState>
                    <ThemeSelector onChange={ChangeThemes}>
                        <option>Light</option>
                        <option>Dark</option>
                    </ThemeSelector>
                    {
                        DetailsMatch ? (
                            <ReturnedHomeBtn>
                                <Link to={"/"}>Home</Link>
                            </ReturnedHomeBtn>
                        ) : null
                    }
                </Vertical_Bars>
            </VerticalNavs>
            <SolidBar />
        </NavContainer>
    );
};

export default NavBars;