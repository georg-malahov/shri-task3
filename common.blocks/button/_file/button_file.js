modules.define('button',
	['jquery'],
	function (provide, $, Button) {
		provide(Button.decl({ modName : 'file' }, {
			onSetMod: {
				'js': {
					'inited': function () {
						this.__base.apply(this, arguments);

						var _self = this,
							input = $(this.domElem).find('input');

						input.change(function () {
							if (!input[0].files) {
								console.warn("This browser doesn't seem to support the `files` property of file inputs.");
							}

							var files = input[0].files,
								fileNames = [],
								i;

							for (i = 0; i < files.length; i++) {
								fileNames.push(files[i].name);
							}

							_self._files = files;
							_self._fileNames = fileNames;
							_self.emit('change');
						});
					}
				}
			},
			/**
			 * Return selected files.
			 * @returns {*|files}
			 */
			getFiles: function () {
				return this._files;
			},
			/**
			 * Return selected file names.
			 * @returns {Array|*|fileNames}
			 */
			getFileNames: function () {
				return this._fileNames;
			}
		}));
	}
);