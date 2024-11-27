//테마 변환 용 ToggleBtn Components

import { useRecoilState } from "recoil";
import { isDarkTheme } from "./atoms";

function ToggleBtn(){
    const [isDarks, setDarks] = useRecoilState(isDarkTheme);

    const ChangeThemes = () => setDarks(isDarks);
    
    return (
        <></>
    );
};

export default ToggleBtn;