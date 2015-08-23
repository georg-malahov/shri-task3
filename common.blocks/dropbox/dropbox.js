modules.define('dropbox',
    ['i-bem__dom'],
    function (provide, BEMDOM) {
        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        this.bindTo('dragover', this._onDragOver);
                        this.bindTo('dragenter', this._onDragEnter);
                        this.bindTo('dragleave', this._onDragLeave);
                        this.bindTo('drop', this._onDrag);
                    }
                }
            },
            _onDragOver: function (e) {
                e.stopPropagation();
                e.preventDefault();

                this.setMod('dragover', true);

                e.originalEvent.dataTransfer.dropEffect = 'copy';
            },
            _onDragEnter: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            _onDragLeave: function (e) {
                e.stopPropagation();
                e.preventDefault();
            },
            _onDrag: function (e) {
                e.stopPropagation();
                e.preventDefault();

                this.setMod('dragover', false);

                this._files = e.originalEvent.dataTransfer.files;

                this.emit('drop');
            },
            getFiles: function () {
                return this._files;
            }
        }));
    }
);
