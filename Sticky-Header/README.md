# Sticky
## Request
1. 특정 위치에서 header 고정
2. 메뉴 click시, 해당 section으로 이동(+ animation 효과)
3. wheel로 scroll시, 해당 section에 맞는 메뉴 활성화

## Thinking
### 1. 필요한 이벤트
- scroll : 스크롤할 때 1) 헤더 상태 변경, 2)메뉴 활성화 상태 변경
- click : 메뉴 클릭하면 해당 섹션으로 이동 -> 여기서 scroll 이벤트가 추가로 발생됨

### 2. 주요 메소드 및 실행 순서
1. 헤더 고정을 위한 scroll 이벤트 바인딩 (`StickyComponent.bindEvent(true)`)
2. 문서를 기준으로 각 섹션의 Y 좌표를 배열에 저장(`TabSectionComponent.setSectionOffset()`)
3. GNB 내 click 이벤트 바인딩
4. 이벤트 발생
	1. scroll
		1. 현재 스크롤 위치가 지정한 위치보다 크면 헤더 고정 클래스 추가, 작으면 제거 (`StickyComponent.onScrollFunc()`)
		2. 0.05초 뒤에 (`TabSectionComponent.onScrollFunc()`)<br>
		현재 스크롤 위치와 섹션의 좌표값을 비교하고, 현재 인덱스 변경 (`TabSectionComponent.scrollEndFunc()`)
		3. 변경된 인덱스를 기준으로 GNB 활성화 상태 변경 (`TabSectionComponent.activeGnbFunc()`)
	2. click
		1. 현재 인덱스를 클릭한 타겟의 인덱스로 변경 (`TabSectionComponent.onClickAnchor()`)
		2. 현재 인덱스를 기준으로 스크롤 위치 이동(`TabSectionComponent.activeSectionFunc()`)
		3. scroll 이벤트가 발생하여 4-1에 있는 메소드가 실행됨

## Add Feature
1. 플러그인화
	변경 가능한 요소를 옵션화
	- 고정 영역 : container
	- 고정 위치 : fixedPosition
	- 고정 클래스 : fixedClass
	- 활성 클래스 : activeClass
2. 탭 해시 적용 (예정)