module.exports = function (bh) {
	bh.match('player__controls', function (ctx) {
		ctx.content({
			block: 'player-controls',
			js: true
		}, true);
	});
};