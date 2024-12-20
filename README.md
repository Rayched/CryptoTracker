## Crypto Tracker mk3

- Nomadcoders, React Master class 강의 2주 챌린지
- 암호화폐의 정보들을 모아서 보여주는 웹 페이지 개발하기
- **[강의 URL](https://nomadcoders.co/react-masterclass)**
- **📆 개발 기간: 2024.11.27 ~ 2024.11.29**
    - **프로젝트 마감: 2024.11.30 오전 6시**

---

#### 💻 사용 기술 목록
- 고정: `TypeScript`, `React`
- CSS : `styled-components`
- 상태 관리: `recoil`
- Routing: `react-router-dom version 6`
- API Data Fetch: `react-query`

---

### 📆 Day 1 작업 요약 (2024.11.27 수요일)

- **📑 "Project-Repository Connected"**
    - Crypto-Tracker mk3 Project File, Github 저장소 생성
    - Project Package, Github 저장소 연동

- **📑 "추가 Package 설치, 테마 변환 간략하게 구현"**
    - `styled-components`, `recoil`, `react-router-dom`, `react-query` 설치
    - 간단한 테마 변환 버튼 만들고 계속 테마를 변환하면서 <br/>
        각 테마 별로 적절한 색상 선정하였음.

- **📑 "Home 화면 구현 시작 (Coins data fetch)"**
    - Package 명 일부 변경, (`/modules`, `/routes → /Routes`)
    - Home 화면 구현 시작
        - Coin Paprika API로 암호화폐 1위부터 50위까지 가져옴
        - 그리고 가져온 정보를 웹 페이지에 출력 (id / name)
        - 테스트 용 Title 화면 추가 (전역으로 바꿀 예정)

### 📆 Day 2 작업 요약 (2024.11.28 목요일)

- **📑 "Home 화면 디자인 v1, 테마 변경 Toggle Button 추가**
    - **1. Home 화면 디자인 v1**
        - 코인 아이템에 코인 이름, 이미지 나오게 업데이트
        - 저번 회차에서는 코인에 마우스를 갖다댈 시 <br/>
            배경색을 살짝 밝게해서 하이라이트한 느낌이 나게 했지만 <br/>
        - 이번에는 코인 아이템의 배경색을 건드리지 않고 <br/>
            대신 `CSS scale` 속성의 값을 살짝 올리는 걸로 <br/>
            다른 형태로 하이라이트를 구현해봤다.

    - **2. 테마 변경 Toggle Button**
        - 저번에는 테마 변경 기능을 단순한 버튼으로만 구현했지만 <br/>
            이번에는 슬라이드 버튼 형식으로 구현해봤다.
        - 테마의 상태에 따라 `CSS transform` 속성을 통해 <br/>
            버튼이 실제로 움직이는 느낌의 Animation을 추가하였다.

- **📑 "Detail Page 작업 시작"**
    - `Home` 화면에서 `coinID`를 `state`로 `<Detail />`에게 전달
    - `Detail` 페이지에서 `useParam()` Hook을 통해 <br/>
        `coinID` 받아오고, 이를 활용해서 해당 코인의 상세 정보를 받아옴
    - API 통해서 받아온 코인의 상세한 데이터 중 <br/>
        일부를 웹 페이지 화면에 출력하고, Detail Page 최하단에 <br/>
        `Home`으로 돌아가는 버튼을 추가하였음.

- **📑 "Detail Page, nested route setting"**
    - `Detail Page`에 `<Chart />`, `<Price />` 두 Component를 <br/>
        `nested route`로 추가하였음.
    - `<Detail />` Component 내부에 아래와 같이 작성, `nested` 설정함.
    - `nested route` 설정을 완료하고, `<Price />` Component에서 <br/>
        API를 통해서 해당 코인의 가격 정보 데이터를 받아오는 부분까지만 <br/>
        코드를 작성하였음. (화면 출력 X, `console`에만 출력해서 확인하였음.)

``` tsx
/*
    Routes.tsx에서 Detail Page의 path를 아래와 같이 설정
    Nested Route가 문제 없이 동작한다.
    path="/:coinID/*" (* => 일종의 대입 연산자 비슷한 거라고 생각하자.)
*/
function Detail(){
    return (
        <>
            <Routes>
                <Route path="chart" element={<Chart />}/>
                <Route path="price" element={<Price />}/>
            </Routes>
        </>
    );
}
``` 

### 📆 Day 3. 작업 요약 (2024.11.29 금요일)

- **📑 "Detail Page CSS Style, Price Tab 작업"**
    - **1. Detail Page CSS Style**
        - Detail Page에서 띄울 데이터를 선정했고 <br/>
            이제 이를 좀 더 깔끔하게 보여주기 위해서 <br/>
            `CSS style` 설정을 진행하였다.
        - 화면에 출력할 데이터는 다음과 같다.
        - `순위`, `이름`, `심볼`, `출시일` <br/>
         `최초 업데이트`, `마지막 업데이트`
        - 이 외에도 코인 이미지, 해당 코인에 대한 설명도 추가하였다.
        - 그리고 `Chart`/`Price` Tab 전환 버튼을 추가하였다.

    - **2. Price Tab 작업**
        - Coin Paprika의 가격 정보를 API로 받아왔다.
        - `가격`,`시간 별 가격 변동률(1h, 1일, 주간, 월간, 년간)`
        - 데이터를 표(Table)의 형태로 화면에 출력시켰다.

- **📑 "Chart Component 작업 1, 현재 탭 확인하기 (Chart/Price)"**
    - **1. 현재 탭 확인하는 기능 업데이트**
    ``` tsx
    import {useMatch} from "react-router-dom";

    const Nesteds = styled.div``;
    const Nested_Items = styled.div`
        /*
            isActive의 값에 따라, 해당 탭의 버튼, 글자 색이
            다른 색으로 표시함으로써 사용자가 현재 탭을
            확인할 수 있게 설정하였다.
        */
    `;

    function Detail(){
        /*react-router-dom*/
        const chartMatch = useMatch("/:coinID/chart");
        const priceMatch = useMatch("/:coinID/price");
        
        return (
            <>
                <Nesteds>
                    <Nested_Items isActive={chartMatch !== null}>
                        <Link to={`/${coinID}/chart`}>Chart</Link>
                    </Nested_Items>
                    <Nested_Items isActive={priceMatch !== null}>
                        <Link to={`/${coinID}/price`}>Price</Link>
                    </Nested_Items>
                </Nesteds>
            </>
            );
        }
    ```
    - `react-router-dom`의 `useMatch()` Hook을 활용했다.
    - 현재 URL과 인자로 전달한 URL이 일치하는 경우 <br/>
        해당 URL의 정보를 return하고, 아닌 경우엔 `null`을 return하는
        `react-router-dom`의 Hook이다.

    - **2. Chart Components 구현**
        - 저번 Code Challenge에서, Chart Component 구현하는데 <br/>
            제일 오랜 시간이 걸렸고, 힘이 들었다.
        - 다른 컴포넌트를 구현할 때는 재밌었지만 <br/>
            Chart 컴포넌트는 구현하는 과정이 많이 어렵기 때문에
        - 전에 작성해놓은 코드를 복사+붙여넣기 했다...

- **📑 Project Publishing**
    - 약 3일동안 개발한 세번째 Crypto-Tracker Project
    - 이제 과제 제출을 위해 `gh-pages`를 설치하고 <br/>
        script code setting을 하고 배포 시도
    - 배포 처리가 완료되고 확인하니, 하얀 화면만 나온다.
    - 몇번 새로고침을 해봤지만 그대로였고
    - 패닉이 와서 바로 구글링을 시도하였다.
    - 일단 Homepage는 제대로 설정해놨고 <br/>
        혹시나해서 `package.json`에 설정해놓은 script 코드도 <br/>
        순서를 수정하고 다시 deploy
    - 결과는 여전히 하얀 화면이 나왔고 멘탈이 반쯤 나갔었다.
    - 해결법을 찾기 위해 머리를 싸매다가 <br/>
        울며 겨자먹기로 Github 저장소 이름을 변경하고 <br/>
        이에 맞춰서 `homepage`에도 반영시키고 다시 `deploy`
    - 다행히도 이번엔 문제 없이 프로젝트가 배포된 것을 확인할 수 있었다.

### 📆 Day 4. 작업 요약 (2024.12.17 화요일)

- **📑 Project, Responsive Web Design Update**
    - 저번주에 `반응형 웹 디자인`에 대한 기본적인 부분을 학습했고 <br/>
        이를 저번 Challenge 때 만든 `Crypto Tracker`에 적용하면서 <br/>
        `반응형 웹 디자인`에 대해 감을 잡아보기로 했다.
    
    - 기존 `index.html` 파일에서 `viewport`와 관련된 <br/>
        `<meta />` 태그를 다시 추가하였다. <br/>
        (원래는 없었음...)
    
    