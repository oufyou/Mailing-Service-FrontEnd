const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [

            {
                'id'   : 'mailms-component',
                'title': 'Mail MS',
                'type' : 'item',
                'icon' : 'mail',
                'url'  : '/mail'
            },
            {
                'id'   : 'producerrt-component',
                'title': 'Producer RT',
                'type' : 'item',
                'icon' : 'settings',
                'url'  : '/producerRT'
            },
            {
                'id'   : 'authentication-login',
                'title': 'Login',
                'type' : 'item',
                'url'  : '/login'
            }
        ]
    }
];

export default navigationConfig;
