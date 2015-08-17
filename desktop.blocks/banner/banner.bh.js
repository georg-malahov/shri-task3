module.exports = function (bh) {
	bh.match('banner', function (ctx) {
		ctx.content([
			{
				block : 'button',
				mods : { theme : 'islands', size : 'm', type : 'link' },
				attrs: { target: '_blank' },
				url : 'https://github.com/yuriMalakhov/shri-task3',
				text : 'Watch on GitHub'
			}
		], true);
	});
};