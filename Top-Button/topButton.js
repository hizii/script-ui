(function (win, $, doc) {
	'use strict';
	var TopButton = (function () {
		var defParams = {
			container: 'html, body',
			headerWrap: '.header_wrap',
			tabWrap: '.gnb',
			sectionWrap: '.contents_wrap',
			topButton: '.top',
			fixedPosition : 0,
			activeClass: 'on',
			fixedClass: 'scroll',
			moveSpeed: '400'
		};
		return {
			init : function () {
				this.setElements();
				this.setSectionOffset();
				this.initLayout();
				this.bindEvents();
				this.onScrollFunc();
			},
			setElements: function () {
				this.headerWrap = $(defParams.headerWrap);
				this.container = $(defParams.container); 
				this.tabList = $(defParams.tabWrap);
				this.tabItem = this.tabList.find('li');
				this.tabAnchor = this.tabList.find('a');
				this.sectionWrap = $(defParams.sectionWrap);
				this.sectionItem = this.sectionWrap.find('section');
				this.sectionOffset = [];
				this.footerOffset = null;
				this.activeIndex = null;
				this.topButton = $(defParams.topButton);
				this.topBuffer = this.headerWrap.outerHeight();
			},
			setSectionOffset : function () {
				var _self = this;
				this.sectionItem.each(function(index) {
					_self.sectionOffset[index] = $(this).offset().top - _self.topBuffer;
				});
				this.footerOffset = $(doc).height() - $(win).height();
			},
			initLayout : function () {
				var stickyWrapClass = this.headerWrap.attr('class').split(' ')[0],
						jsStickyWrapClass = 'js-' + stickyWrapClass;
	
				if (!this.headerWrap.parent().hasClass(jsStickyWrapClass)) {
					this.headerWrap.wrap('<div class="' + jsStickyWrapClass + '" />');
				}
				this.jsStickyWrap = this.headerWrap.parent();
				this.jsStickyWrap.css('height', Math.ceil(this.headerWrap.outerHeight(), 10));
			},
			bindEvents : function (e) {
				$(win).on('scroll', $.proxy(this.onScrollFunc, this));
				this.tabItem.on('click', this.tabAnchor, $.proxy(this.onClickAnchor, this));
				this.topButton.on('click', $.proxy(this.onClickTopButton, this));
			},
			onScrollFunc : function (e) {
				var winTop = $(win).scrollTop();
				this.stickyHeaderFunc(winTop);
				this.moveTopButtonFunc(winTop);
				win.clearTimeout(this.scrollEndTime);
				this.scrollEndTime = win.setTimeout($.proxy(this.scrollEndFunc, this), 50);
			},
			stickyHeaderFunc : function (scrollTop) {
				this.headerWrap.toggleClass(defParams.fixedClass, scrollTop > defParams.fixedPosition);
			},
			moveTopButtonFunc : function (scrollTop) {
				this.topButton.css('bottom', scrollTop >= this.footerOffset ? '180px' : '50px');
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
				this.tabItem.removeClass(defParams.activeClass);
				this.activeIndex === null ? false : this.tabItem.eq(this.activeIndex).addClass(defParams.activeClass);
			},
			activeSectionFunc : function () {
				this.container.stop().animate({
					scrollTop : this.sectionOffset[this.activeIndex]
				});
			},
			onClickAnchor : function (e) {
				e.preventDefault();
				var target = $(e.delegateTarget);
				this.activeIndex = target.index();
				this.activeSectionFunc();
			},
			onClickTopButton : function (e) {
				e.preventDefault();
				this.container.stop().animate({
					scrollTop : 0
				}, defParams.moveSpeed);
			}
		}
	})();

	$(function () {
		TopButton.init();
	});
})(window, window.jQuery, window.document);
