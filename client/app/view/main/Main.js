/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('Chat.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Chat.view.main.MainController',
        'Chat.view.main.MainModel',
        'Chat.component.Message'
    ],

    controller: 'main',
    viewModel: 'main',
    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    defaults: {
        width: 500
    },

    listeners: {
        boxready: 'onBoxready'
    },

    items: [
        {
            xtype: 'panel',
            itemId: 'chatArea',
            scrollable: 'y',
            layout: 'vbox',
            height: 400,
            border: true,
            listeners: {
                add: 'onAdd'
            }
        },
        {
            xtype: 'textarea',
            itemId: 'messageInput',
            emptyText: 'Enter message...',
            border: true,
            padding: 10,
            grow: true,
            growMax: 150,
            enterIsSpecial: true,
            listeners: {
                specialkey: 'onTextFieldSpecialKey'
            }
        }
    ]
});
