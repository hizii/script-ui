# Tab
## Request
1. 선택한 accordion show/hide (== toggle)
2. 선택한 accordion만 show (다른 accordion의 box는 hide)

## Think
TBC
 
## Function & Process
### 1. `initFunc(obj, type)`
요소 정의 및 실행
```javascript
var	setElements = function (obj) {
	var options = {
		item : $(obj).find('li'),
		button : $(obj).find('button'),
		area : $(obj).find('.box')
	};
	if (type) {
		options.activeClass = 'on'
	}
	return options; 
};
bindEvents(setElements(obj), type);
```

### 2. `bindEvents(elements, type)`
click 이벤트 바인딩
```javascript
elements.item.on('click', 'button', function (e) {
	var target = $(e.currentTarget),
			parent = $(e.delegateTarget);

	if (type) {
		elements.item.removeClass(elements.activeClass);
		parent.toggleClass(elements.activeClass);
	} else {
		elements.area.hide();
		target.siblings(elements.area).toggle();
	}
	});
```

## Reference