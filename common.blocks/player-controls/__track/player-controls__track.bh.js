module.exports = function (bh) {
	bh.match('player-controls__track', function (ctx) {
		var info = ctx.param('info'),
			content = [];

		if (!info) {
			content.push({
				cls: 'player-controls__track-name',
				content: 'Nothing is playing'
			});
			return ctx.content(content, true);
		}

		content.push({
			cls: 'player-controls__track-name',
			content: info.name
		});

		if (info.timing) {
			content.push(
				{
					cls: 'player-controls__track-timing',
					content: info.timing
				}
			);
		}
		ctx.content(content, true);
	});
};