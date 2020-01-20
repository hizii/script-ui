(function (win, $, doc) {
	'use strict';
	var UTIL = win.Common.util;
	win.TabComponent = function (container, args) {
		var defParams = {
			container: container || 'body',
			tabWrap: '.tab',
			panelItem: '.tab_box',
			activeClass: 'is-active',
			customEvent : '.' + (new Date()).getTime(),
		};
		this.opts = UTIL.def(defParams, (args || {}));
		if (!(this.obj = $(this.opts.container)).length) return;
		this.init();
	};
	win.TabComponent.prototype = {
		init : function () {
			this.setElements();
			this.bindEvents(true);
		},
		setElements : function () {
			this.tabList = this.obj.children(this.opts.tabWrap);
			this.tabItem = this.tabList.children();
			this.tabAnchor = this.tabItem.children('a').length ? this.tabItem.children('a') : this.tabItem.children('button');
			this.panelItem = this.obj.find(this.opts.panelItem);
			this.activeIndex = null;
		},
		changeEvents : function (event) {
			var events = [],
					eventNames = event.split(' ');
			for (var key in eventNames) {
				events.push(eventNames[key] + this.opts.customEvent);
			}
			return events.join(' ');
		},
		bindEvents : function (type) {
			if (type) {
				this.tabItem.on(this.changeEvents('click'), this.tabAnchor, $.proxy(this.onClickAnchor, this));
			} else {
				this.tabItem.off(this.changeEvents('click'));
			}
		},
		onClickAnchor : function (e) {
			e.preventDefault();
			var target = $(e.delegateTarget);
			this.activeIndex = target.index();
			this.activeTabFunc();
			this.activePanelFunc();
		},
		activeTabFunc : function () {
			this.tabItem.removeClass(this.opts.activeClass);
			this.activeIndex === null ? false : this.tabItem.eq(this.activeIndex).addClass(this.opts.activeClass);
		},
		activePanelFunc : function () {
			this.panelItem.hide();
			this.activeIndex === null ? false : this.panelItem.eq(this.activeIndex).show();
		}
	};

	// 플러그인 생성
	var	pluginName = 'tabPlugin',
			pluginInstances = [];

	$.fn[pluginName] = function (args) {
		var _this = this;
		for (var i = 0, max = this.length; i < max; i++) {
			pluginInstances[i] = new TabComponent(_this.eq(i), args);
		}
	};
	$(function () {
		// 플러그인 호출 Default : 해당 선택자를 탐색하여 선택자의 개수만큼 인스턴스 생성
		// $('.tab_area')[pluginName]();

		// 플러그인 기본 옵션 변경 : 전체 적용
		$('.tab_area')[pluginName]({
			activeClass: 'on'
		});

		// 옵션 객체 병합 : 각 인스턴스 별 옵션 지정
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

		console.log(pluginInstances);
	});
})(window, window.jQuery, window.document);