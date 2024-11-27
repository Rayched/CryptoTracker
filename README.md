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