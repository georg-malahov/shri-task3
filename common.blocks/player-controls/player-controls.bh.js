module.exports = function (bh) {
	bh.match('player-controls', function (ctx) {
		ctx.content([
			{ elem: 'open' },
			{ elem: 'track', content: 'Drag and drop audio files to the player.' },
			{ elem: 'btn' },
			//{ elem: 'equalizer' }
		], true);
	});
};