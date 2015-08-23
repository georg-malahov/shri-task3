({
    mustDeps: [
        {
            block: 'i-bem',
            elems: [
                {
                    elem: 'dom',
                    mods: {'elem-instances': true}
                }
            ]
        },
        {
            elems: [
                {
                    elem: 'btn',
                    js: true
                }
            ]
        },
    ],
    shouldDeps: [
        {
            block: 'icon',
            mods: {state: 'play'}
        },
        {
            block: 'button',
            mods: {
                theme: 'islands',
                size: 'm',
                view: 'action',
                file: true
            }
        }
    ]
})
