module.exports = function (bh) {
	bh.match('player__file', function (ctx) {
		var info = ctx.param('js').info;
		if (!info) {
			return ctx.content('file');
		}
		ctx.attrs({ 'data-name': info.name }).content([
			{
				cls: 'player__file-name',
				content: info.name
			},
			{
				cls: 'player__file-duration',
				content: info.duration
			}
		], true);
	});
};