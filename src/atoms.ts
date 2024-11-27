//전역 상태 관리용 파일

import { atom } from "recoil";

export const isDarkTheme = atom({
    /**
     * 현재 테마가 Dark 테마인지의 여부를 확인하는 recoil state
     * 테마: Dark => true
     * 테마: Light => false
     */
    key: "isDarkTheme",
    default: false
});