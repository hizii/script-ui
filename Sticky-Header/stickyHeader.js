(function (win, $, doc) {
	'use strict';
	win.Common = win.Common || {};
	var UTIL = win.Common.util;

	win.StickyComponent = function (container, args) {
		var defParams = {
			container: container,
			fixedPosition : 0,
			fixedClass: 'is-sticky',
			customEvent : '.stickyComponent' + (new Date()).getTime(),
		};
		this.opts = UTIL.def(defParams, (args || {}));
		if (!(this.obj = $(this.opts.container)).length) return;
		this.init();
	};
	win.StickyComponent.prototype = {
		init : function () {
			this.initLayout();
			this.bindEvents(true);
			this.onScrollFunc();
		},
		initLayout : function () {
			var stickyWrapClass = this.obj.attr('class').split(' ')[0],
			jsStickyWrapClass = 'js-' + stickyWrapClass;

			if (!this.obj.parent().hasClass(jsStickyWrapClass)) {
					this.obj.wrap('<div class="' + jsStickyWrapClass + '" />');
			}
			this.jsStickyWrap = this.obj.parent();
			this.jsStickyWrap.css('height', Math.ceil(this.obj.outerHeight(), 10));
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
				$(win).on(this.changeEvents('scroll'), $.proxy(this.onScrollFunc, this));
			} else {
				$(win).off(this.changeEvents('scroll'));
			}
		},
		onScrollFunc : function () {
			var winTop = $(win).scrollTop();
			this.obj.toggleClass(this.opts.fixedClass, winTop > this.opts.fixedPosition);
		}
	};

	win.TabSectionComponent = function (container, args) {
		var defParams = {
			container: container || 'body',
			tabWrap: null,
			sectionWrap: null,
			activeClass: 'is-active',
			customEvent : '.' + (new Date()).getTime(),
			topBuffer: 0
		};
		this.opts = UTIL.def(defParams, (args || {}));
		if (!(this.obj = $(this.opts.container)).length) return;
		this.init();
	};
	win.TabSectionComponent.prototype = {
		init : function () {
			this.setElements();
			this.bindEvents(true);
			this.setSectionOffset();
		},
		setElements : function () {
			this.tabList = this.obj.find(this.opts.tabWrap);
			this.tabItem = this.tabList.find('li');
			this.tabAnchor = this.tabList.find('a');
			this.sectionWrap = this.obj.find(this.opts.sectionWrap);
			this.sectionItem = this.sectionWrap.find('section');
			this.sectionOffset = [];
			this.activeIndex = null;
		},
		setSectionOffset : function () {
			var _self = this;
			this.sectionItem.each(function(index) {
				_self.sectionOffset[index] = $(this).offset().top - _self.opts.topBuffer;
			});
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
				$(win).on(this.changeEvents('scroll'), $.proxy(this.onScrollFunc, this))
			} else {
				this.tabItem.off(this.changeEvents('click'));
				$(win).off(this.changeEvents('scroll'));
			}
		},
		onClickAnchor : function (e) {
			e.preventDefault();
			var target = $(e.delegateTarget);
			this.activeIndex = target.index();
			this.activeSectionFunc();
		},
		onScrollFunc : function (e) {
			win.clearTimeout(this.scrollEndTime);
			this.scrollEndTime = win.setTimeout($.proxy(this.scrollEndFunc, this), 50);
		},
		scrollEndFunc : function () {
			var winTop = $(win).scrollTop();
			for (var i = 0, max = this.sectionOffset.length; i < max; i++) {
				if (winTop >= this.sectionOffset[i]) {
						this.activeIndex = i;
				} else if (winTop < this.sectionOffset[0]) {
						this.activeIndex = null;
				}
			}
			this.activeGnbFunc();
		},
		activeGnbFunc : function () {
			this.tabItem.removeClass(this.opts.activeClass);
			this.activeIndex === null ? false : this.tabItem.eq(this.activeIndex).addClass(this.opts.activeClass);
		},
		activeSectionFunc : function () {
			$('html, body').stop().animate({
				scrollTop : this.sectionOffset[this.activeIndex]
			});
		}
	};
})(window, window.jQuery, window.document);

$(function () {
	var commonHeader = new StickyComponent('.header_wrap', {
				fixedClass : 'scroll',
			}),
			commonGnb = new TabSectionComponent('.wrap', {
				tabWrap: '.gnb',
				sectionWrap: '.contents_wrap',
				activeClass: 'on',
				topBuffer: $('.header_wrap').outerHeight()
			});
	console.log(commonHeader, commonGnb);
});