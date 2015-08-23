module.exports = function (bh) {
    bh.match('player', function (ctx) {
        ctx.mix([{block: 'clearfix'},
            {
                block: 'dropbox',
                js: true
            }
        ]).content([
            {
                cls: 'player__content',
                content: [
                    {
                        block: 'player',
                        elem: 'controls',
                        mix: [{block: 'i-bem'}],
                        js: true
                    },
                    {
                        block: 'player',
                        elem: 'progress',
                        mix: [{block: 'i-bem'}],
                    },
                    {
                        block: 'player',
                        elem: 'visualization',
                        mix: [{block: 'i-bem'}],
                    }
                ]
            },
            {
                block: 'player',
                elem: 'files-list'
            }
        ], true);
    });
};
