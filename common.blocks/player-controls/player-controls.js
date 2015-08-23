modules.define('player-controls',
    ['i-bem__dom', 'bh'],
    function (provide, BEMDOM, BH) {
        provide(BEMDOM.decl(this.name, {
            setTrackInfo: function (info) {
                BEMDOM.replace(this.findElem('track'),
                    BH.apply({
                        block: 'player-controls',
                        elem: 'track',
                        info: info
                    })
                );
            },
            setButtonMod: function (modName, modVal) {
                this.elemInstance('btn').setMod(modName, modVal);
            }
        }));
    }
);
