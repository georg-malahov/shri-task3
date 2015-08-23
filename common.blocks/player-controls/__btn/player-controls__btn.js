modules.define('player-controls__btn',
    ['i-bem__dom', 'player__file'],
    function (provide, BEMDOM, playerFile) {
        provide(BEMDOM.decl(this.name, {
            onSetMod: {
                'js': {
                    'inited': function () {
                        var _self = this;

                        this.findBlockInside('button').bindTo('click', function () {
                            _self.toggleMod('state', 'pause', 'play', _self.hasMod('state', 'play'));
                        });
                    }
                },
                'state': {
                    'play': function () {
                        this.findBlockInside('button').setText('pause');
                        playerFile.resume();
                    },
                    'pause': function () {
                        this.findBlockInside('button').setText('play');
                        playerFile.suspend();
                    }
                }
            }
        }));
    }
);
