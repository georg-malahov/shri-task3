module.exports = function (bh) {
	bh.match('player__visualization', function (ctx) {
		ctx.content({
			tag: 'canvas',
			cls: 'player__visualization-canvas'
		}, true);
	});
};