module.exports = function (bh) {
	bh.match('player__progress', function (ctx) {
		ctx.content({
			block : 'progressbar',
			mods : { theme : 'islands' },
			val : 0
		}, true)
	});
};