module.exports = function (bh) {
	bh.match('content', function (ctx) {
		ctx.content({
			elem: 'inner',
			content: ctx.content()
		}, true);
	});
};