modules.define('player',
	['i-bem__dom', 'vow'],
	function (provide, BEMDOM, vow) {
		provide(BEMDOM.decl(this.name, {
			onSetMod: {
				'js': {
					'inited': function () {
						var playerControls = this.findBlockInside('player-controls'),
							fileButton = playerControls.findBlockInside({ block: 'button', mods: { file: true } });
						fileButton.on('change', this._onChangeFiles, this);
						this.findBlockOn('dropbox').on('drop', this._onChangeFiles, this);
					}
				}
			},
			_onChangeFiles: function (e) {
				var _self = this;
				this.__self.processFiles.call(this.__self, e).done(function () {
					_self.emit('ready');
					_self.setMod('state', '');
				});
				this.emit('loading');
			}
		}, {
			_audio: {
				extensions: ['mp3'],
				mimeTypes: ['audio/mpeg', 'audio/x-mpeg', 'audio/mp3', 'audio/x-mp3', 'audio/mpeg3', 'audio/x-mpeg3', 'audio/mpg', 'audio/x-mpg', 'audio/x-mpegaudio']
			},
			createContext: function () {
				try {	this._context = new (window.AudioContext || window.webkitAudioContext)(); }
				catch (e) {	console.error('Web Audio API is not supported in this browser'); }
				return this._context;
			},
			getContext: function () {
				if (this._context) { return this._context;}
				return this.createContext();
			},
			closeContext: function () {
				if (typeof this._context.close !== 'function') { return; }
				this._context.close();
			},
			updateContext: function () {
				this.closeContext();
				return this.createContext();
			},
			getBuffers: function () {
				return this._buffers;
			},
			getBufferByName: function (name) {
				if (!name || !this._buffers || !this._buffers[name]) {
					return console.warn("No name provided or player doesn't have buffer for this file name: ", name);
				}

				var buffer = this._buffers[name];

				if (this._buffers[name].isResolved()) { return buffer.valueOf(); }

				return false;
			},
			processFiles: function (e, /**Array*/ files) {
				var files = files || e.target.getFiles(),
					deferred = vow.defer(),
					i;

				this._buffers = this._buffers || {};

				if (files == null) {
					console.warn("No files to process!");
				}

				if (Object.prototype.toString.apply(files).indexOf('Array') < 0 &&
					Object.prototype.toString.apply(files).indexOf('FileList') < 0) {
					files = [files];
				}


				for (i = 0; i < files.length; i++) {
					this._buffers[files[i].name] = this.getRawAudio(files[i]).then(this.getAudioBuffer, null, null, this);
				}

				vow.allResolved(this._buffers).done(function(buffers) {
					deferred.resolve(buffers);
				}, function (errors) {
					deferred.reject(errors);
				}, null);

				return deferred.promise();
			},
			/**
			 *
			 * @param {File|Blob} file File to process.
			 * @returns {vow.Promise}
			 */
			getRawAudio: function (file) {
				var deferred = vow.defer(),
					reader = new FileReader(),
					msg;
				if (file == null) {
					msg = 'Please provide a file!';
					console.warn(msg);
					deferred.reject(msg);
					return deferred.promise();
				}
				if (this._audio.mimeTypes.indexOf(file.type) < 0) {
					msg = 'Unsupported file was provided!';
					console.warn(msg);
					deferred.reject(msg);
					return deferred.promise();
				}

				reader.onload = function (e) {
					deferred.resolve(e.target.result);
				};

				reader.onerror = function (e) {
					deferred.reject(e.target.error);
				};

				reader.readAsArrayBuffer(file);

				return deferred.promise();
			},
			getAudioBuffer: function (raw) {
				var deferred = vow.defer(),
					msg;
				if (raw == null) {
					msg = 'Please provide a raw file data!';
					console.warn(msg);
					deferred.reject(msg);
					return deferred.promise();
				}
				if (Object.prototype.toString.apply(raw).indexOf('ArrayBuffer') < 0) {
					msg = 'You should provide an instance of ArrayBuffer type!';
					console.warn(msg);
					deferred.reject(msg);
					return deferred.promise();
				}

				this.getContext().decodeAudioData(raw, function (buffer) {
					if (!buffer) { return deferred.reject("Failed to decode. Buffer is null.");	}
					deferred.resolve(buffer);
				});

				return deferred.promise();
			}
		}));
	}
);