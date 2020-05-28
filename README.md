## 김진근

- Email : wlsrms9300@naver.com

## 프로젝트 소개
### MovyNoty

React, Node 기반의 MEGABOX, CGV, LOTTE 3사의 개봉예정작을 크롤링 해오고 USER가 알람신청시 ADMIN이 GCM을 통해 개봉하루 전 웹알람을 보내주는 사이트입니다.

## 이미지

<div display="inline">
  <img src="https://user-images.githubusercontent.com/53656336/83128870-f92c3d80-a116-11ea-9c15-300d6a2bf6bf.PNG" width="350px">
</div>
<div display="inline">
  <img src="https://user-images.githubusercontent.com/53656336/83130240-f894a680-a118-11ea-8894-e66a45c1f4a9.PNG" width="350px">
</div>
<div display="inline">
  <img src="https://user-images.githubusercontent.com/53656336/83129284-8a031900-a117-11ea-8acf-0d0345ee88c4.PNG" width="350px">
</div>
<div display="inline">
  <img src="https://user-images.githubusercontent.com/53656336/83129666-1c0b2180-a118-11ea-95fb-81dbade81eb8.PNG" width="350px">
</div>

## 기능
- 회원가입/로그인 
   + React-Router를 통해 로그인/회원가입 각 컴포넌트를 로드합니다.
   + 로그인 시 jsonWebToken을 이용해 토큰을 발급, 쿠키를 통해 인증합니다.
- 영화관 3사 크롤링
   + Node의 Puppeteer, Cheerio를 활용한 크롤링으로 ADMIN이 UPDATE버튼을 누르면 영화관 3사의 개봉예정작 정보를 가져와 DB의 내용을 갱신합니다. DB는 MongoDB Cloud를 통해 구현했습니다.
- 영화목록 조회
   + MEGABOX, CGV, LOTTE버튼클릭시 연결된 API를 통해 해당영화관의 목록을 DB에서 불러옵니다. 영화관의 이름을 Redux store에 저장해놓고 정렬옵션 적용 시 사용합니다.
- 알람신청
   + ADMIN이 PUSH버튼을 누르면 DB에서 개봉하루전인(D-1)인 영화의 알람신청USER에게 알람을 보내줍니다.
- 게시글 등록/수정/삭제

## 웹사이트 이용
- <b>유저</b> : 
   + 영화관 리스트 조회
   + 셀렉트 박스를 이용한 정렬
   + 알람신청
   + 글작성/수정/삭제

- <b>관리자</b> : 
   + UPDATE - 크롤링
   + PUSH - 알람
