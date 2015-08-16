module.exports = function (bh) {
	bh.match('player-controls__btn', function (ctx) {
		ctx.mix([{ block: 'i-bem' }]).js(true, true).mods({state: 'pause'}).content({
			cls: 'player-controls__btn-inner',
			content: {
				block: 'button',
				mods: { theme: 'islands', size : 'm', view : 'action' },
				text: 'play'
			}
		}, true);
	});
};