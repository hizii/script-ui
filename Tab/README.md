# Tab
## Request
1. page안에 tab이 1개일 경우 (구조1, 구조2 모두 풀어주세요.)
2. page안에 동일한 스타일의 tab이 2개 이상일 경우

## Think
구조가 다른 경우 대응
  - 탭의 태그가 `<button>`이 아닌 `<a>`일 경우 대응
  - 인접 요소에 의존하지 않고 타겟을 지정해서 적용
  - 기준 인덱스로 탭, 패널 제어

변경 가능한 요소를 옵션화
  - 기준 영역 : container
  - 탭 영역 : tabWrap
  - 탬 패널 영역 : sectionWrap
  - 메뉴 활성 클래스 : activeClass
  
플러그인 생성
  - Constructor : `TabComponent`
  - 플러그인명 : tabPlugin
  <br>
```javascript
var	pluginName = 'tabPlugin',
    pluginInstances = [];

$.fn[pluginName] = function (args) {
  var _this = this;
  for (var i = 0, max = this.length; i < max; i++) {
    pluginInstances[i] = new TabComponent(_this.eq(i), args);
  }
};
```

플러그인 사용
  ```javascript
  // 1. 기본
  $(selector)['tabPlugin']();

  // tab_area 클래스를 가진 요소들에 플러그인 적용
  $('.tab_area')['tabPlugin']();

  // 2. 플러그인 기본 옵션 변경 : 전체 플러그인에 적용
  $('.tab_area')[pluginName]({
    activeClass: 'on'
  });

  // 3. 각 인스턴스 별 옵션 지정
  // 원래 옵션 객체랑 새 옵션 객체 병합 후 재호출
  function overwriteOption (options, ...elements) {
    for (var i = 0, max = elements.length; i < max; i++) {
      Object.assign(elements[i].opts, options);
      elements[i].init();
    }
  }
  overwriteOption({
    tabWrap: '.tab2',
    panelItem: '.tab_box2'
  }, pluginInstances[1]);

  overwriteOption({
    tabWrap: '.tab3',
    panelItem: '.tab_box3'
  }, pluginInstances[2], pluginInstances[3]);
  ```

## Methods & Process
### 1. `TabComponent.bindEvents(true)`
Tab 내 click 이벤트 바인딩
```javascript
this.tabItem.on(this.changeEvents('click'), this.tabAnchor, $.proxy(this.onClickAnchor, this));
```

### 2. `TabSectionComponent.onClickAnchor()`
현재 인덱스를 클릭한 타겟의 인덱스로 변경
```javascript
e.preventDefault();
var target = $(e.delegateTarget);
this.activeIndex = target.index();
this.activeTabFunc();
this.activePanelFunc();
```

### 3. `TabSectionComponent.activeTabFunc()`
변경된 인덱스를 기준으로 Tab 활성화 상태 변경 
```javascript
this.tabItem.removeClass(this.opts.activeClass);
this.activeIndex === null ? false : this.tabItem.eq(this.activeIndex).addClass(this.opts.activeClass);
```

### 4. `TabSectionComponent.activePanelFunc()`
변경된 인덱스를 기준으로 Tab box 활성화 상태 변경
```javascript
this.panelItem.hide();
this.activeIndex === null ? false : this.panelItem.eq(this.activeIndex).show();
```

## Reference
- https://api.jquery.com/jQuery.fn.extend/
- https://poiemaweb.com/jquery-plugin
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters