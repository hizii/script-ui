(function (win, $, doc) {
	'use strict';
	var initFunc = function (obj, type) {
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
	}
	var bindEvents = function (elements, type) {
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
	};
	
	$(function () {
		initFunc('.bx_accordion', false);
		initFunc('.bx_accordion2', true);
	});
})(window, window.jQuery, window.document);
