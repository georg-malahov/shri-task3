module.exports = function (bh) {
    bh.match('player-controls__open', function (ctx) {
        ctx.content({
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: 'action',
                file: true
            },
            text: 'Select tracks'
        }, true);
    });
};
