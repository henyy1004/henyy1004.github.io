---
layout: post
title:  "브라우저 렌더링"
date:   2020-01-23 18:05:55 +0300
---

마크업 개발하는 사람들중 브라우저 렌더링 과정에 대해서 말해보세요! 하면 막상 대답할 수 있는 사람들이 별로 없을것이다.
왜냐하면 신입시절 나도 그랬다. 브라우저에 화면을 그리는 일을 하면서 정작 그 화면이 어떻게 그려지는지 알고싶어하지 않았다. 브라우저가 어떻게 동작하는지를 알게 되면 마크업 이슈가 왜 생겼는지 알 수 있게되고 근본적인 부분을 해결하며 같은 이슈가 발생해도 유연하게 대처할 수 있다. 또한 웹 성능의 향상을 위해서는 내가 그린 화면에서 어떤 부분이 어떻게 느린가를 알 수 있어야하는데 이 부분 또한 브라우저의 동작을 이해하면 잘 파악할 수 있다.
때문에 마크업 개발자라면 브라우저 렌더링 과정을 숙지하고 있어야 하는 것 같다.
이부분이 렌더링의 전부는 아니다. 더 복잡하고 세밀하다. 계속 공부중이며 이해진행중이다. 다만 이정도의 개념정도는 인지하고 있을 수 있도록 정리해보았다.

브라우저마다 화면을 렌더링해주는 렌더링 엔진이 다르다. 때문에 작업과정명같은 부분이 조금씩 다를 수 있지만 보통 비슷한 과정으로 렌더링이 진행된다.

아래 과정은 `Webkit`엔진을 기준으로 설명한다.

## 브라우저 렌더링 엔진 종류
- 크롬 : Blink (크롬 버전 28+ Webkit에서 Blink로 변경)
- 사파리 : Webkit
- 파이어폭스 : Gecko
- 오페라 : Blink (오페라 15부터 Presto에서 Blink로 변경)
- 인터넷 익스플로러 : Trident
- MS Edge : Blink (2020년 1월 EdgeHTML에서 Blink로 변경)

이렇게 브라우저마다 렌더링 엔진이 다르기 때문에 브라우저마다 화면을 다르게 그리기때문에 크로스브라우징이 필요하다.또한 `벤더프리픽스`를 추가하여 css를 제어하는 이유도 여기에 있다.

### 벤더 프리픽스(Vendor Prefix)
- 크롬, 사파리, MS Edge : -webkit-
- 파이어폭스 : -moz-
- 오페라 : -o-
- 인터넷 익스플로러 : -ms-

## 브라우저 렌더링 과정
브라우저는 아래 과정을 거쳐 화면을 그린다.
```
    파싱 > 스타일 > 레이아웃 > 페인트 > 합성
```

### 1. 파싱(Parcing)
브라우저 검색창에 주소를 치면(요청) 서버는 해당 주소에 맞는 HTML 문서를 보낸다(응답). HTML문서는 기계가 해석할 수 없기때문에 브라우저는 기계가 읽을 수 있는 언어로 HTML문서를 해석한다(파싱). 그리고 HTML문서를 기반으로 `DOM`트리를 생성한다.

#### DOM이란
문서 객체 모델`DOM(Document Object Model)`은 자바스크립트나 CSS가 HTML태그 요소의 스타일을 변경하거나 생성 수정 삭제를 가능할 수 있도록 접근하게 연결시켜주는 역할을 담당한다.

DOM은 구조화된 nodes와 property 와 method 를 갖고 있는 objects로 문서를 표현한다.

- HTML은 DOM이 아니다
- View Source는 DOM이 아니다
- DevTools의 코드는 DOM이고 쉽게 시각화한 것이다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <link href="style.css" rel="stylesheet">
    <title>Critical Path</title>
  </head>
  <body>
    <p>Hello <span>web performance</span> students!</p>
    <div><img src="awesome-photo.jpg"></div>
  </body>
</html>
```
![DOM Tree](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/dom-tree.png?hl=ko)


파싱 중 `script`,`link`,`img` 리소스를 만나면 요청하고 다운로드한다.
또한 css 리소스를 만나게 되면 브라우저는 DOM을 생성하는 동안 css를 다운받고 `*CSSOM`트리를 생성한다.

### CSSOM이란
`CSS Object Model`의 약자로, DOM이 자바스크립트의 HTML태그 요소에 접근하는 객체라면 CSSOM은 자바스크립트가 CSS를 조작할 수 있게 해주는 객체이다. DOM과는 별도의 독립적인 객체이다.

```css
body { font-size: 16px }
p { font-weight: bold }
span { color: red }
p span { display: none }
img { float: right }
```
![CSSOM Tree](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/cssom-tree.png?hl=ko)

### 2. 스타일(Style)
생성된 DOM과 CSSOM는 결합하여 `Render Tree`를 형성한다.

#### Render Tree란
DOM과 CSSOM는 결합하여 형성된것이며 각 요소의 레이아웃을 계산하는데 사용되고 픽셀을 화면에 렌더링하는 페인트 프로세스에 대한 입력으로 처리된다.

- `head`,`script`,`meta` 등 일부태그들은 제외된다.
- `display : none`속성의 요소는 제외된다.

![Render Tree](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=ko)

### 3. 레이아웃(Layout)
생성된 `Render Tree`를 참고하여 노드의 정확한 위치와 크기를 계산한다. 노드의 정확한 크기와 위치를 파악하기 위해 루트부터 노드를 순회하면서 계산하고, 레이아웃 결과로 각 노드의 정확한 위치와 크기를 픽셀값으로 렌더트리에 반영한다.
만약 CSS에서 크기 값을 %로 지정하였다면, 레이아웃 단계를 거친 후 % 값은 계산되고 측정 가능한 픽셀 단위로 변환된다.
![레이아웃](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/layout-viewport.png?hl=ko)

위 이미지에서 `viewport`가 `1200px`이라면 `div`는 `600px`, `div>div`는 `300px`인 정확한 수치로 픽셀로 변환된다.

### 4. 페인트(Paint)
노드들이 레이아웃을 통해 위치나 크기가 정해져 배치가 되면 배치된 영역의 픽셀을 채워넣는 작업을 하는데 그 과정이 바로 페인트다. 레이아웃과정에서 설정되는 크기나 위치 속성을 제외한 css속성들이 적용된다.(ex: background-color, transparent 등)
그리고 픽셀로 변환된 결과는 포토샵의 레이어처럼 생성되어 개별 레이어로 관리된다. 단, 각각의 엘리먼트가 모두 레이어가 되는 것은 아니다. transform 속성 등을 사용하면 엘리먼트가 레이어화 되는데, 이 과정을 페인트라고 한다

### 5. 합성(Composite)
페인트 단계에서 생성된 레이어를 합성하여 스크린을 업데이트한다. 합성과 렌더 단계가 끝나면 화면에서 웹 페이지를 볼 수 있다.

## Reflow와 Repaint
초기에 화면을 그린 후 브라우저는 생성된 `DOM`과 `CSSOM`의 변경을 감지하면 `Render Tree`를 재구성 하고 변경된 `Render Tree`를 참고하여 화면을 다시 그린다. 이 과정을 `Reflow`와 `Repaint`라고한다.


 Reflow와 Repaint의 발생은 `웹 퍼포먼스에 저하를 발생`시키는 요인으로
 최대한 이부분을 최적화할 수 있도록 작업을 진행하여야 한다.

### Reflow
```
javaScript > style > 레이아웃 > 페인트 > 합성
```
브라우저가 위의 과정을 다시 반복하는 것을 `Reflow`라고 한다.
`javaScript`가 `DOM`,`CSSOM`을 변경하면 `Render Tree`가 재구성되고 나머지 과정이 진행된다.
Reflow 발생시 브라우저는 전체 노드의 위치와 크기를 재계산하기때문에 `Repaint`보다 웹 퍼포먼스에 심각한 저하를 일으키는 프로세스이다.

#### Reflow 발생 원인
- Node를 추가, 제거 또는 변경
- CSS 스타일 추가, 제거 또는 변경
- 윈도우 리사이징
- 폰트의 변화
- :hover와 같은 CSS Pseudo Class
- 클래스 Attribute의 동적 변화
- 엘리먼트에 대한 offsetWidth / offsetHeight (화면에서 보여지는 좌표) 계산시

### Repaint

```
javascript > style > 페인트 > 합성
```
브라우저가 위의 과정을 다시 반복하는 것을 `Repaint`라고 한다.
노드의 크기나 위치에 영향을 주지 않지만 가시성에는 영향을 주는 엘리먼트가 변경되면 발생한다.
(ex : opacity, background-color, visibility, outline, color)
Repaint는 노드들의 위치와 크기를 재계산하는 레이아웃의 과정이 빠져있기 때문에 `Reflow`보다는 웹 퍼포먼스의 저하가 덜하다. 

#### Repaint 발생요소
```javascript
const el = document.querySeletor('.test');

el.style.backgroundColor = 'red'; // Reflow 발생

```

## 추가 내용
- 렌더링 과정은 점진적으로 진행된다.
- 레이아웃은 노드별로 진행된다.
- 이미지가 로드되면 브라우저는 이미지를 화면에 드롭하고 내용을 리플로우한다.
- transform, opacitiy, cursor, orphans, perspective 등은 Reflow와 Repaint과정을 생략한다. 따라서 렌더링이 빠르다. `transform`을 사용하여 크기나 위치에 변화를 주면 성능 향상에 도움이 된다.
- 엘리먼트가 `display: none` 스타일을 가지고 있으면 DOM 조작과 스타일을 변경하더라도 레이아웃과 리페인트가 발생하지 않는다.