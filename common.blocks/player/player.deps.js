([
    {
        shouldDeps: [
            {
                block: 'player',
                mod: 'state'
            },
            {
                block: 'progressbar',
                mods: {theme: 'islands'}
            }
        ],
        mustDeps: [
            {block: 'clearfix'},
            {block: 'vow'},
            {block: 'tick'},
            {
                block: 'dropbox',
                js: true
            },
            {
                block: 'player',
                elems: ['controls', 'progress', 'visualization', 'file', 'files-list'],
                js: true
            }
        ]
    }, {
        tech: 'js',
        mustDeps: [
            {
                elems: ['files-list', 'file'],
                tech: 'bemhtml'
            },
            {
                block: 'player-controls',
                elems: ['track'],
                tech: 'bemhtml'
            }
        ]
    }
])
