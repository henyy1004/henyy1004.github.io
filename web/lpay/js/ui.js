
const ui = () => {
  uiHeader();
  uiTooltip();
  uiMenuList();
};

// header 모션
const uiHeader = () => {
  const Header = document.querySelector('header');
  const Nav = Header.querySelector('nav');
  const GnbAction = Header.querySelector('.gnb-action');
  const GnbActionItem = GnbAction.querySelectorAll('a');
  const Gnb = Header.querySelector('#gnb');
  const LinkLogo = document.querySelector('.link_logo');
  const GnbItem = Gnb.querySelectorAll('a');
  const BtnQr = document.querySelector('#btn-tooltip-qr');
  const GnbHeight = Gnb.offsetHeight;
  const HeaderTween = new TimelineMax();
  let openNav = false;

  // 키코드정의
  const keyCode = {
    TAB: 9,
    ESC: 27,
    SPACE: 32,
    UP: 38,
    DOWN: 40,
    ENTER: 13,
    SHIFP: 16,
  };

  // nav open
  const open = () => {
    if (!openNav) {
      HeaderTween.to(Nav, 0.5, {
        height: GnbHeight,
        onStart: () => {
          GnbAction.style.display = 'none';
          Gnb.style.display = 'block';
        },
      });

      openNav = true;
    }
  };

  // nav close
  const close = () => {
    if (openNav) {
      HeaderTween.to(Nav, 0.5, {
        height: 0,
        onStart: () => {
          GnbAction.style.display = 'block';
          Gnb.style.display = 'none';
        },
      });

      openNav = false;
    }
  };

  // nav에서 마우스 떠났을때 handler
  const mouseleaveHandler = () => {
    close();
  };

  // .gnb-action 작업
  GnbActionItem.forEach((item, index) => {
    const mouseenterHandler = () => {
      open();
    };

    const keyDownkHandler = event => {
      switch (event.keyCode) {
        case keyCode.SPACE:
          open();
          break;
        case keyCode.ENTER:
          open();
          break;
        case keyCode.TAB:
          open();
          break;
      }
    };

    const focusHandler = () => {
      // 펼쳐지기 전 메뉴 첫번째 링크에 포커스되었을떼
      if (index === 0) {
        GnbItem[0].focus();
        open();
      }

      // 펼쳐지기 전 메뉴 마지막 링크에 포커스되었을때
      if (index === GnbActionItem.length - 1) {
        open();
      }
    };

    const blurHandler = () => {
      if (index === GnbActionItem.length - 1) {
        GnbItem[GnbItem.length - 1].focus();
      }
    };

    item.addEventListener('mouseenter', mouseenterHandler);
    item.addEventListener('keydown', keyDownkHandler);
    item.addEventListener('focus', focusHandler);
    item.addEventListener('blur', blurHandler);
  });

  // #gnb 작업
  GnbItem.forEach((item, index) => {
    const keyDownkHandler = event => {
      switch (event.keyCode) {
        case keyCode.UP:
          close();
          break;
        case keyCode.ESC:
          close();
          break;
      }
    };

    const blurHandler = () => {
      if (index === 0) {
        LinkLogo.addEventListener('focus', () => {
          openNav = true;
          close();
        });
      }
      // 마지막 링크에서 outfocus되면 탭닫기
      if (index === GnbItem.length - 1) {
        BtnQr.addEventListener('focus', () => {
          openNav = true;
          close();
        });
      }
    };

    item.addEventListener('blur', blurHandler);
    item.addEventListener('keydown', keyDownkHandler);
  });

  Nav.addEventListener('mouseleave', mouseleaveHandler);
};

// tooltop
// todo: 툴팁과 메뉴리스트의 로직이 비슷하다 공통으로 뽑아낼 수 있는 방법을 생각해보자
const uiTooltip = () => {
  // 툴팁 다 가져오기
  const toolTipArray = document.querySelectorAll('.toolitp-open');

  // 각 툴팁버튼에 이벤트달기
  toolTipArray.forEach((item, index) => {
    // 툴팁 열림닫힘 상태
    let hasPopup = false;
    // 버튼이 제어하는 툴팁노드
    const controls = document.getElementById(item.getAttribute('aria-controls'));
    // 키코드정의
    const keyCode = {
      TAB: 9,
      ESC: 27,
      SPACE: 32,
      UP: 38,
      DOWN: 40,
    };

    const open = () => {
      item.setAttribute('aria-expanded', 'true');
      controls.classList.remove('hide');
      hasPopup = true;
    };

    const close = () => {
      item.setAttribute('aria-expanded', 'false');
      controls.classList.add('hide');
      hasPopup = false;
    };

    const clickHandler = () => {
      if (!hasPopup) {
        open();
      } else {
        close();
      }
    };

    const keyDownkHandler = event => {
      switch (event.keyCode) {
        case keyCode.ESC:
          if (hasPopup) {
            close();
          }
          break;
        case keyCode.DOWN:
          if (hasPopup) {
            close();
          }
          break;
        case keyCode.UP:
          if (!hasPopup) {
            open();
          }
          break;
        case keyCode.SPACE:
          if (!hasPopup) {
            open();
          }
          break;
        case keyCode.TAB:
          if (!hasPopup) {
            open();
          }
          break;
      }
    };

    const blurHandler = () => {
      if (hasPopup) {
        close();
      }
    };

    item.addEventListener('click', clickHandler);
    item.addEventListener('keydown', keyDownkHandler);
    item.addEventListener('blur', blurHandler);
  });
};

// menulist
// todo: 툴팁과 메뉴리스트의 로직이 비슷하다 공통으로 뽑아낼 수 있는 방법을 생각해보자
const uiMenuList = () => {
  // 메뉴리스트버튼 다 가져오기
  const menuListArray = document.querySelectorAll('.btn-menulist');
  // 팝업 열림닫힘 상태
  let hasPopup = false;
  // 키코드정의
  const keyCode = {
    TAB: 9,
    ESC: 27,
    SPACE: 32,
    UP: 38,
    DOWN: 40,
  };

  // 각 메뉴리스트버튼에 이벤트달기
  menuListArray.forEach((item, index) => {
    // 버튼이 제어하는 메뉴리스트노드
    const controls = document.getElementById(item.getAttribute('aria-controls'));
    // 메뉴리스트노드의 마지막 요소
    const controlsLastFocus = controls.querySelector('.last');

    const clickHandler = () => {
      if (!hasPopup) {
        open();
      } else {
        close();
      }
    };

    const keyDownkHandler = event => {
      switch (event.keyCode) {
        case keyCode.ESC:
          if (hasPopup) {
            close();
          }
          break;
        case keyCode.DOWN:
          if (hasPopup) {
            close();
          }
          break;
        case keyCode.UP:
          if (!hasPopup) {
            open();
          }
          break;
        case keyCode.SPACE:
          if (!hasPopup) {
            open();
          }
          break;
        case keyCode.TAB:
          if (!hasPopup) {
            open();
          }
          break;
      }
    };

    const focusHandler = () => {
      if (!hasPopup) {
        open();
      }
    };

    const close = () => {
      item.setAttribute('aria-expanded', 'false');
      controls.classList.add('hide');
      hasPopup = false;
    };

    const open = () => {
      item.setAttribute('aria-expanded', 'true');
      controls.classList.remove('hide');
      hasPopup = true;
    };

    item.addEventListener('click', clickHandler);
    item.addEventListener('keydown', keyDownkHandler);
    item.addEventListener('focus', focusHandler);

    const blurHandler = () => {
      if (hasPopup) {
        close();
      }
    };

    // 마지막 요소에서 focusout되면 팝업닫기
    controlsLastFocus.addEventListener('blur', blurHandler);
  });
};

ui();
