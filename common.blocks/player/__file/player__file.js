modules.define('player__file',
	['i-bem__dom', 'jquery', 'player', 'tick'],
	function (provide, BEMDOM, $, Player, tick) {
		var progressbarBlock, playerControlsBlock;
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function () {

						var _self = this,
							__self = this.__self;

						playerControlsBlock = this.findBlockOutside('player').findBlockInside('player-controls');
						progressbarBlock = this.findBlockOutside('player').findBlockInside('progressbar');

						Player.on('ready', __self.initAudioApi, this.__self);

						this.domElem.click(function () {
							var fileElm = $(this),
								name = fileElm.data('name'),
								buffer = __self.getSourceBufferByName(name);

							__self.stop();

							__self._name = name;
							__self.setSource(buffer);

							_self.domElem.removeClass('player__file_active');
							fileElm.addClass('player__file_active');

							playerControlsBlock.setTrackInfo({
								name: name,
								timing: '-' + __self.getDurationMin(buffer.duration)
							});

							__self.play();
							playerControlsBlock.setButtonMod('visible', true);
							playerControlsBlock.setButtonMod('state', 'play');
						});
					}
				}
			}
		},{
			padDigits: function (number, digits) {
				return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
			},
			getDurationMin: function (duration) {
				return [Math.floor(duration / 60), this.padDigits(Math.round(duration % 60), 2)].join(':');
			},
			getSourceBufferByName: function (name) {
				var buffer = Player.getBufferByName(name);
				if (!buffer) {
					return console.warn("Couldn't find file audio buffer by its name.");
				}
				if (Object.prototype.toString.apply(buffer).indexOf('AudioBuffer') < 0) {
					return console.warn("Found buffer value is not of type 'AudioBuffer': ", buffer);
				}
				return buffer;
			},
			initAudioApi: function () {
				this._context = Player.getContext();
				this._source = this._source || this._context.createBufferSource();
			},
			setSource: function (buffer) {
				this._context = Player.updateContext();
				this._source = this._context.createBufferSource();
				this._analyserNode = this._context.createAnalyser();

				this._source.buffer = buffer;
				this._source.connect(this._analyserNode);
				this._source.connect(this._context.destination);
				return this._source;
			},
			play: function (startTime) {
				if (!this._context || this._isPlaying) { return; }
				this._isPlaying = true;
				this._currentTime = startTime || 0;
				this._source.start(this._currentTime);
				this._startTick();
			},
			stop: function () {
				if (!this._context || !this._isPlaying) { return; }
				this._isPlaying = false;
				this._source.stop();
				this._stopTick();
			},
			suspend: function () {
				if (!this._context || !this._isPlaying) { return; }
				if (typeof this._context.suspend == 'function') {
					this._context.suspend();
				} else {
					this._source.stop();
				}
				this._isPlaying = false;
				this._stopTick();
			},
			resume: function () {
				if (!this._context || this._isPlaying) { return; }
				if (typeof this._context.resume == 'function') {
					this._context.resume();
				} else {
					this.setSource(this._source.buffer);
					this.play(this._currentTime);
				}
				this._isPlaying = true;
				this._startTick();
			},
			_startTick: function () {
				var __self = this;
				tick.on('tick', function (e) {
					__self._onTick.call(__self, e);
				}).start()
			},
			_stopTick: function () {
				tick.stop();
			},
			_onTick: function () {
				if (!this._context) { return; }
				this._currentTime = this._context.currentTime;
				if (progressbarBlock) {
					progressbarBlock.setVal(this._context.currentTime / this._source.buffer.duration * 100);
				}
				if (playerControlsBlock) {
					var __self = this;
					playerControlsBlock.setTrackInfo({
						name: this._name,
						timing: '-' + __self.getDurationMin(this._source.buffer.duration - this._context.currentTime)
					});
				}
				if (this._source.buffer.duration - this._context.currentTime == 0) {
					var nextTrack = $('.player__file_active').next();
					if (!nextTrack.length) {
						this._stopTick();
					} else {
						nextTrack.click();
					}
				}

				this._draw.call(this);
			},
			_draw: function () {
				var canvas, context, width, height, barWidth, barHeight, barSpacing, frequencyData, barCount, loopStep, i, hue;

				canvas = $('.player__visualization-canvas')[0];
				context = canvas.getContext('2d');
				width = canvas.width;
				height = canvas.height;
				barWidth = 5;
				barSpacing = 1;

				context.clearRect(0, 0, width, height);
				frequencyData = new Uint8Array(this._analyserNode.frequencyBinCount);
				this._analyserNode.getByteFrequencyData(frequencyData);
				barCount = Math.round(width / (barWidth + barSpacing));
				loopStep = Math.floor(frequencyData.length / barCount);

				for (i = 0; i < barCount; i++) {
					barHeight = frequencyData[i * loopStep];
					hue = parseInt(120 * (1 - (barHeight / 255)), 10);
					context.fillStyle = 'hsl(' + hue + ',75%,50%)';
					context.fillRect(((barWidth + barSpacing) * i) + (barSpacing / 2), height, barWidth - barSpacing, -barHeight);
				}
			}
		}));
	}
);