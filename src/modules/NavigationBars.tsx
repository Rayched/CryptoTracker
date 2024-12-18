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
import { inherits } from "util";

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
`;

const OpenImgs = styled.img`
    width: 8vw;
    height: 5vh;
    display: block;
    margin: 0px;
`;

const Vertical_Bars = styled.div``;

function NavBars(){
    const DetailsMatch = useMatch("/:coinID/*");

    const [isBars, setBars] = useState(false);

    const openBars = () => setBars(!isBars);

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
                        isBars ? <CloseImgs onClick={openBars} src="http://localhost:3000/CryptoTracker/icons/CloseImgs.png"/>
                        : <OpenImgs onClick={openBars} src="http://localhost:3000/CryptoTracker/icons/OpenImgs.png"/>
                    }
                </BarOpenBtn>
                <Vertical_Bars></Vertical_Bars>
            </VerticalNavs>
            <SolidBar />
        </NavContainer>
    );
};

export default NavBars;