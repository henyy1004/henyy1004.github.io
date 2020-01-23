---
layout: post
title: '클론코딩 - L.Pay'
permalink: /works/:name
thumbs: '/assets/img/portfolio/thumb_lpay.jpg'
---

롯데의 페이서비스인 l.pay의 웹사이트를 클론코딩 하였습니다.
기존 l.pay사이트의 웹접근성을 고려하지 않고 마크업작업된 부분들을 보완하여 클론코딩하였습니다.
`gnb`영역의 애니매이션은 tweenMax를 적용했습니다.

**보완부분**

- skip navigation 추가
- 대체텍스트 적용
- 팝업요소에 wai-aria 적용
- 탭키를 사용해 컨트롤할 수 있도록 스크립트 적용
- 아이콘이있는 바로가기 링크나, 툴팁레이어, 셀렉트박스 등 재사용성을 고려하여 css,html 작업

---

- [**URL**](https://henyy1004.github.io/web/lpay/index.html){:target="\_blank"}
- 작업 기간 : 3일
- 크로스브라우징
  - PC : 익스,크롬 등 기타브라우저 최신버전
- 기여도 : 100%
- es6문법을 지원하지 않는 브라우저에서도 적용될 수 있도록 babel설정
- webpack을 사용한 js번들링