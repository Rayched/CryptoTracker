//Light / Dark 테마 모음

import { StoreID } from "recoil";

interface I_Theme {
    BgColor: string;
    TextColor: string;
    itemBgColor: string;
    itemTextColor: string;
    itemBorderColor: string;
};

export const LightTheme: I_Theme = {
    BgColor: "#f1f2f6",
    TextColor: "black",
    itemBgColor: "#ED4C67",
    itemTextColor: "#f7f1e3",
    itemBorderColor: "#FDA7DF"
};

export const DarkTheme: I_Theme = {
    BgColor: "#2f3542",
    TextColor: "#dfe4ea",
    itemBgColor: "#485460",
    itemTextColor: "#dfe4ea",
    itemBorderColor: "#747d8c"
};