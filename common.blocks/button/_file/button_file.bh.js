module.exports = function (bh) {
	bh.match('button_file', function (ctx) {
		var content = [];
		content.push(ctx.content());
		if (ctx.param('icon') != null) {
			content.push(ctx.param('text'));
		}
		if (ctx.param('text') != null) {
			content.push({
				elem: 'text',
				content: ctx.param('text')
			});
		}
		content.push({
			tag: 'input',
			attrs: { type: 'file', multiple: 'multiple' }
		});
		ctx.tag('label').content(content, true);
	});
};