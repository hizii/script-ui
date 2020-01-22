# Sticky
## Request
1. 특정 위치에서 header 고정
2. 메뉴 click시, 해당 section으로 이동(+ animation 효과)
3. wheel로 scroll시, 해당 section에 맞는 메뉴 활성화

## Thinking
### 1. 필요한 이벤트
- scroll : 스크롤할 때 1) 헤더 상태 변경, 2)메뉴 활성화 상태 변경
- click : 메뉴 클릭하면 해당 섹션으로 이동 -> 여기서 scroll 이벤트가 추가로 발생됨

### 2. 코드 재사용의 가능성
각 기능을 클래스 객체로 선언  (prototype 기반)
- StickyComponent
- TabSectionComponent

변경 가능한 요소를 옵션화
  - 기준 영역 : container === `this.obj`
  - sticky 위치 : fixedPosition
  - sticky 클래스 : fixedClass
  - 메뉴 영역 : tabWrap
  - 섹션 영역 : sectionWrap
  - 메뉴 활성 클래스 : activeClass

인스턴스 생성으로 생성자(Constructor) 호출
- 동일한 객체를 기준으로 기능 상속
- 원본 객체와 다른 값은 각 인스턴스 별로 프로퍼티 값 재설정 가능
```javascript
  new StickyComponent('.header_wrap', {
    fixedClass : 'scroll',
  });
  new TabSectionComponent('.wrap', {
    tabWrap: '.gnb',
    sectionWrap: '.contents_wrap',
    activeClass: 'on',
    topBuffer: $('.header_wrap').outerHeight()
  });
```

## Methods & Process
### 1. `StickyComponent.initLayout()`
position이 static/relative 이던 영역이 absolute/fixed로 변경되면 흐름에서 빠지면서 밑에 있는 영역이 고정 영역 크기만큼 쑥 올라오게 됨 <br>
그 현상을 방지하기 위에 기존 영역 크기만큼 흐름에서 확보해주는 과정
```javascript
var stickyWrapClass = this.obj.attr('class').split(' ')[0],
    jsStickyWrapClass = 'js-' + stickyWrapClass;

if (!this.obj.parent().hasClass(jsStickyWrapClass)) {
  this.obj.wrap('<div class="' + jsStickyWrapClass + '" />');
}
this.jsStickyWrap = this.obj.parent();
this.jsStickyWrap.css('height', Math.ceil(this.obj.outerHeight(), 10));
```
고정 영역의 클래스(`stickyWrapClass`)를 기준으로 스크립트 제어용 영역(`this.jsStickyWrap`)으로 감싼 후 높이를 인라인 스타일로 지정

### 2. `StickyComponent.bindEvent(true)`
헤더 고정을 위한 scroll 이벤트 바인딩
```javascript
$(win).on(this.changeEvents('scroll'), $.proxy(this.onScrollFunc, this));
// $(win).on('scroll', $.proxy(this.onScrollFunc, this));
```

### 3. `TabSectionComponent.setSectionOffset()`
문서를 기준으로 각 섹션(`this.sectionItem`)의 Y 좌표를 배열(`this.sectionOffset`)에 저장
```javascript
var _self = this;
this.sectionItem.each(function(index) {
  _self.sectionOffset[index] = $(this).offset().top - _self.opts.topBuffer;
});
```

### 4. `TabSectionComponent.bindEvent(true)`
GNB 내 click 이벤트 바인딩
```javascript
this.tabItem.on(this.changeEvents('click'), this.tabAnchor, $.proxy(this.onClickAnchor, this));
$(win).on(this.changeEvents('scroll'), $.proxy(this.onScrollFunc, this))
```

### 5. 이벤트 발생
1. Scroll Event
    1. 현재 스크롤 위치가 지정한 위치보다 크면 헤더 고정 클래스 추가, 작으면 제거 (`StickyComponent.onScrollFunc()`)
    2. 0.05초 뒤에 (`TabSectionComponent.onScrollFunc()`)<br>
    현재 스크롤 위치와 섹션의 좌표값을 비교하고, 현재 인덱스 변경 (`TabSectionComponent.scrollEndFunc()`)
    3. 변경된 인덱스를 기준으로 GNB 활성화 상태 변경 (`TabSectionComponent.activeGnbFunc()`)
2. Click Event
    1. 현재 인덱스를 클릭한 타겟의 인덱스로 변경 (`TabSectionComponent.onClickAnchor()`)
    2. 현재 인덱스를 기준으로 스크롤 위치 이동(`TabSectionComponent.activeSectionFunc()`)
    3. scroll 이벤트가 발생하여 1에 있는 메소드가 실행됨

## Add Feature
탭 해시 적용 (예정)

## Reference
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
- https://d2.naver.com/helloworld/1855209