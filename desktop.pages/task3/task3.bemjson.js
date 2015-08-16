//noinspection BadExpressionStatementJS
module.exports = {
	block: 'page',
	title: 'WebAudio API плеер',
	styles: [
			{ elem: 'css', url: 'task3.css' }
	],
	scripts: [
			{ elem: 'js', url: 'task3.js' }
	],
	content: [
		{
			block: 'header',
			content: [
				{
					elem: 'title',
					tag: 'h1',
					content: 'WebAudio API плеер'
				},
				{
					elem: 'description',
					tag: 'p',
					content: 'Тестовое задание №3 для поступления в Школу разработчкив интерфейсов в Москве.'
				},
				{
					block: 'banner',
					mods: { 'github': true }
				}
			]
		},
		{
			block: 'content',
			content: [
				{
					block: 'player',
					mods: { 'state': 'empty' },
					js: true
				}
			]
		}
	]
};