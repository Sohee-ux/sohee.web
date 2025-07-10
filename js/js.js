//////// 💡 skills 스킬 동적 요소
////무한히 흐르는 스크롤을 구현함, CSS 애니메이션의 duration과 translateX 값으로 조정함
document.querySelectorAll('.skills_group').forEach(group => {
  const items = Array.from(group.querySelectorAll('.skills_item'));
  const track = document.createElement('div');
  track.className = 'scroll-track';

  // 원본 아이템 추가
  items.forEach(item => track.appendChild(item.cloneNode(true)));
  // 복제본 추가 (연속 효과를 위해)
  items.forEach(item => track.appendChild(item.cloneNode(true)));

  // 기존 요소 교체
  group.innerHTML = '';
  group.appendChild(track);
});


//////// 💡 side_menu 스크롤시 없어지는 동적 요소
window.addEventListener('scroll', function () {
  const firstMenuItem = document.querySelector('#header ul.side_menu li:first-child');
  const btCom = firstMenuItem.querySelector('.bt_com');

  if (window.scrollY > 300) {
    firstMenuItem.style.backgroundColor = 'transparent';
    firstMenuItem.style.color = 'var(--black)';
    if (btCom) btCom.style.display = 'none';
  } else {
    firstMenuItem.style.backgroundColor = '';
    firstMenuItem.style.color = '';
    if (btCom) btCom.style.display = 'block';
  }
});

///////////////////// 💡 모바일전용 side_menu 스크롤시 없어지는 동적 요소
document.addEventListener('DOMContentLoaded', () => {
  const introMenu = document.querySelector('.intro_side_menu');

  window.addEventListener('scroll', () => {
    if (window.scrollY >= 100) {
      introMenu.style.display = 'none';
    } else {
      introMenu.style.display = '';
    }
  });
});



///////// 💡 career tabmenu 색깔 표시 전환 기능
document.addEventListener('DOMContentLoaded', function() {
  const tabItems = document.querySelectorAll('#career .career_tabmenu ul li');
  const tabs = document.querySelectorAll('#career .career_tabmenu ul li a');
  const contents = document.querySelectorAll('#career .career_content');

  function activateTab(index) {
    tabItems.forEach(li => li.classList.remove('active'));
    tabs.forEach(a => a.classList.remove('active'));
    contents.forEach(content => (content.style.display = 'none'));

    tabItems[index].classList.add('active');
    tabs[index].classList.add('active');
    if (contents[index]) contents[index].style.display = 'block';
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', function(event) {
      event.preventDefault();
      activateTab(index);
    });
  });

  // 초기 활성화
  if (tabs.length > 0) activateTab(0);
});


///////////// 💡 project 체크박스 집합체 보여주기 기능 구현
const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
const projects = document.querySelectorAll('.project');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      // 활성 체크된 값들 모으기
      const checkedValues = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

      // 필터링 실행
      projects.forEach(project => {
        const role = project.dataset.role;
        const tech = project.dataset.tech;

        // 체크된 값 중 하나라도 role 또는 tech에 해당하면 보이기
        const isVisible = checkedValues.includes(role) || checkedValues.includes(tech);

        project.style.display = isVisible ? 'block' : 'none';
      });

      // 체크가 아무것도 안됐으면 전체 다 보여주기
      if (checkedValues.length === 0) {
        projects.forEach(project => {
          project.style.display = 'block';
        });
      }
    });
});



///////////// 💡 project 체크박스 하나만 선택되는 동작
////////////// ‘change’ 이벤트 : if (this.checked) → 체크되었을 때만 실행 나머지 체크박스를 other.checked = false 처리하여 전부 해제
/////////////  이벤트 체이닝 : 체크박스가 바뀔 때마다 filterProjects()를 실행하여 필터링 로직도 자동 반영

document.addEventListener('DOMContentLoaded', () => {
  const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');

  // 체크박스를 exclusive하게 동작하도록 이벤트 추가
  checkboxes.forEach(cb => {
    cb.addEventListener('change', function() {
      if (this.checked) {
        // 하나가 체크되면 나머지 체크박스 모두 해제
        checkboxes.forEach(other => {
          if (other !== this) other.checked = false;
        });
      }
      // 변경됐으니, 기존 필터 적용 함수도 호출
      filterProjects(); // 이미 정의된 함수
    });
  });

  // 기존의 필터 로직을 여기에 다시 정의하거나 링크하세요
  function filterProjects() {
    const checked = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    projects.forEach(project => {
      const { role, tech } = project.dataset;
      const show = checked.length === 0
        ? true
        : checked.includes(role) || checked.includes(tech);
      project.style.display = show ? 'block' : 'none';
    });
  }

  // 초기 실행
  filterProjects();
});




///////////// 💡 두개의 탭 메뉴 기능 구현
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');
const filters = document.querySelector('.filters');
const p = document.querySelector('.project_p');
const p2 = document.querySelector('.project_p_02');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;

    // 모든 탭/콘텐츠 초기화
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    // 현재 탭 활성화
    tab.classList.add('active');
    document.getElementById(tabId).classList.add('active');

    // filters 보이기/숨기기 조건 처리
    if (tabId === 'web') {
      filters.style.display = 'flex';
      p.style.display = 'block';
      p2.style.display = 'none';
    } else {
      filters.style.display = 'none';
      p.style.display = 'none';
      p2.style.display = 'block';
    }
  });
});


///////////// 💡 두개의 탭 메뉴 기능 구현
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab2');
  const contents = document.querySelectorAll('.tab-content2');

  function activateTab(tabName) {
    // 탭 활성화
    tabs.forEach(tab => {
      if (tab.dataset.tab === tabName) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    // 컨텐츠 표시 전환
    contents.forEach(content => {
      if (content.id === tabName) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  }

  // 초기 활성화 (필요 시 수정)
  const initial = document.querySelector('.tab2.active');
  if (initial) activateTab(initial.dataset.tab);

  // 탭 클릭 리스너
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      activateTab(target);
    });
  });
});


/////////// 💡 햄버거 클릭 이벤트
document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const side = document.querySelector('.side_menu');
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      side.classList.toggle('active');
    });
});
