modules.define('player__files-list',
	['i-bem__dom', 'bh', 'player', 'player__file'],
	function (provide, BEMDOM, BH, Player, playerFile) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function () {
						Player.on('loading', this._onListLoading, this);
						Player.on('ready', this._updateFilesList, this);
					}
				}
			},
			_onListLoading: function () {
				this.findBlockInside('spin').setMod('visible', true);
				this.setMod('loading', true);
			},
			_onListLoaded: function () {
				this.findBlockInside('spin').setMod('visible', false);
				this.setMod('loading', false);
			},
			_updateFilesList: function (e) {
				this._onListLoaded();

				var buffers = e.target.__self.getBuffers(),
					trackInfo = [],
					info,
					bufferValue;

				for (var name in buffers) {
					if (buffers[name].isFulfilled()) {
						info = {};
						bufferValue = buffers[name].valueOf();
						info.name = name;
						info.duration = playerFile.getDurationMin(bufferValue.duration);
						trackInfo.push(info);
					}
				}

				BEMDOM.replace(this.domElem,
					BH.apply({
						block: 'player',
						elem: 'files-list',
						content: trackInfo.map(function (info) {
							return {
								block: 'player',
								elem: 'file',
								mix: [{ block: 'i-bem' }],
								js: {
									info: info,
									id: 'file'
								}
							};
						})
					})
				);
			}
		}));
	}
);