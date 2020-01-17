(function (win, $, doc) {
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	win.Common = (function () {
			return {
					util : {
							def : function (org, src) {
									for (var prop in src) {
											if (!hasOwnProperty.call(src, prop)) continue;
											if ('object' === $.type(org[prop])) {
													org[prop] = ('array' === $.type(org[prop])) ? src[prop].slice(0) : this.def(org[prop], src[prop]);
											} else {
													org[prop] = src[prop];
											}
									}
									return org;
							},
							winSize : (function () {
									var isWinSafari = (function () {
											var appNetscape = (navigator.appName === "Netscape"),
													appVersionMac = (navigator.appVersion.indexOf("Mac") !== -1),
													userAgentSafari = (navigator.userAgent.indexOf("Safari") !== -1),
													userAgentChrome = (navigator.userAgent.indexOf("Chrome") !== -1);
											return (appNetscape && !appVersionMac && userAgentSafari && !userAgentChrome);
									})();
									if (isWinSafari) {
											return function () {
													var win_wh = {
															w : $(win).width(),
															h : $(win).height()
													};
													return win_wh;
											}
									} else {
											return function () {
													var win_wh = {
															w : win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth,
															h : win.innerHeight || doc.documentElement.clientHeight || doc.body.clientHeight
													};
													return win_wh;
											}
									}
							})(),
							requestAFrame : (function () {
									return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame || win.msRequestAnimationFrame ||
											function (callback) {
													return win.setTimeout(callback, 1000 / 60);
											};
							})(),
							cancelAFrame : (function () {
									return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.webkitCancelRequestAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame || win.msCancelAnimationFrame ||
											function (id) {
													win.clearTimeout(id);
											};
							})(),
							imgLoaded : function (selector) {
									var deferred = $.Deferred();
									if (selector.length) {
											var imgs = selector.find('img'),
													imgs = selector[0].tagName === 'IMG' ? imgs.add(selector) : imgs,
													minLength = 0,
													maxLength = imgs.length,
													data = {},
													dataFunc = function (index, element) {
															data[index] = {
																	IMG : element
															};
													},
													completeFunc = function () {
															if (minLength === maxLength) {
																	deferred.resolve(data);
															}
													};
											if (!maxLength) {
													completeFunc();
											} else {
													for (var i = 0, max = maxLength; i < max; i++) {
															(function (index) {
																	var img = imgs.eq(index),
																			imgDOM = img[0];
																	if (imgDOM.complete || img.height() > 0) {
																			dataFunc(minLength, imgDOM);
																			minLength++;
																			completeFunc();
																	} else {
																			img.on('load error', function () {
																					dataFunc(minLength, imgDOM);
																					minLength++;
																					completeFunc();
																					img.off('load error');
																			});
																	}
															})(i);
													}
											}
									} else {
											deferred.resolve();
									}
									return deferred.promise();
							},
							scrollMoveFunc : function (target, callback) {
									if (!target.length) return;
									var scrollTop = Math.ceil(target.offset().top),
											winTop = $(win).scrollTop(),
											totalMoveTop = scrollTop + 1,
											cb = (callback || function () {});
									if (totalMoveTop === winTop) {
											cb.apply(this);
									} else {
											$('html, body').stop().animate({
													'scrollTop' : totalMoveTop
											}, 500, function () {
													cb.apply(this);
											});
									}
							},
							pageReposition : function () {
									var instance = win.JEJUAIR['pageReposition'];
									for (var i = 0, max = instance.length; i < max; i++) {
											instance[i].reInit();
									}
							},
							objectLength : function (obj) {
									var len = 0;
									for (var key in obj) {
											len++;
									}
									return len;
							},
							findFocus : function (target) {
									if (!target.length) return;
									target.attr({
											'role' : 'dialog',
											'tabIndex' : -1
									}).focus();
									target.on('focusout', function (e) {
											var _this = $(e.currentTarget);
											_this.removeAttr('tabIndex');
											_this.off('focusout');
									});
									win.setTimeout($.proxy(function () {
											target.removeAttr('role');
									}, this), 150);
							},
							scrollLock : function () {
									// scrollLock
							}
					}
			}
	})();
})(window, window.jQuery, window.document);