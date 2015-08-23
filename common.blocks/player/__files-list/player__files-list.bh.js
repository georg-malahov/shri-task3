module.exports = function (bh) {
    bh.match('player__files-list', function (ctx) {
        var content = {
            cls: 'player__files-list-inner',
            content: [
                {
                    cls: 'player__files-list-header',
                    content: 'Playlist'
                },
                {
                    block: 'spin',
                    mods: {
                        theme: 'islands',
                        size: 'm',
                        visible: false
                    }
                },
                {
                    cls: 'player__files-list-content',
                    content: ctx.content() || 'No tracks.'
                }
            ]
        };
        ctx.mix([{block: 'i-bem'}]).js(true, true).content(content, true);
    });
};
