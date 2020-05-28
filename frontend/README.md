
### 황경태
- email : forthezorba@gmail.com
- Github: https://github.com/forthezorba

## 프로젝트
### 무비노티(MOVYNOTY)

'Movie Notification'란 뜻으로, 영화관 3사의 개봉예정작들을 보고 알람을 받을 수 있는 웹앱입니다. 리액트와 노드를 기반으로 설계했습니다.
- (www.forthezorba.com)

## 이미지
<div>
<img src="https://user-images.githubusercontent.com/59009409/83016217-8fe7f400-a05c-11ea-89e6-e5a64ea90ea4.jpg" width="220px" >
<img src="https://user-images.githubusercontent.com/59009409/83016213-8eb6c700-a05c-11ea-9514-e79d0f95946a.jpg" width="220px" >
<img src="https://user-images.githubusercontent.com/59009409/83016592-2c11fb00-a05d-11ea-98d1-63526093d8e4.jpg" width="320px" >
</div>


## 웹사이트 구성
- 헤더컴포넌트 : 메인로고, 로그인, 문의하기가 위치하고 있습니다.
- NAV 컴포넌트 : 
   - CGV/MEGABOX/LOTTE 각 영화관을 클릭해 리스트를 받아올 수 있습니다.
   - (admin)update 버튼을 통해 매일 리스트 갱신 가능(크롤링->진행중...표시가 사라지면 완료)합니다.
   - (admin)push 버튼을 통해 알람정보 푸쉬 가능합니다.(구글크롬 브라우저만)
- LIST 컴포넌트 : 
   - cgv/megabox/lotte 개봉예정작 리스트를 가까운 날짜 순으로 보여줍니다.
   - 로그인 후 알람신청을 하면 신청완료로 버튼이 바뀝니다.

## 사용기술
- 로그인/회원가입 : react-router를 이용해 /login, /register 각 컴포넌트를 로딩합니다.
- 권한 : jsonWebToken을 이용해 토큰을 발급, 쿠키를 통해 인증합니다.
- 글쓰기 : quill을 활용해 구현했습니다.
- DB : mongoDB cloud를 통해 구현했습니다.
- 서버 : koa, koa-router를 통해 서버에서의 로직을 구현했습니다.
- 라우팅/도메인 : AWS ROUTE, certificate를 통해 https 인증 받았습니다.(fcm - https only)
- UPDATE 버튼(크롤링) : ADMIN 로그인 후 UPDATE 버튼을 누르면, puppeteer와 cheerio를 통해 각 사이트에서 <영화 더보기>를 클릭, 동적으로 영화정보를 가져와 DB에 저장하도록 구현했습니다.
- PUSH 버튼(GCM) : ADMIN 로그인 후 PUSH 버튼을 누르면, DB에서 개봉예정 날짜 D-DAY 1 인 알람정보를 CGM을 통해 알람을 보내줍니다.

## 사이트 이용
- USER (user / 123)   
   - 각 영화관을 누르면 개봉예정작 리스트 조회 가능.
   - 셀렉트 박스를 통해 날짜/이름순 정렬 가능.
   - 복수 알람신청 가능.
- ADMIN (admin / 123)
   - UPDATE / PUSH 버튼 사용 가능.
