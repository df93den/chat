/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Chat.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    requires: ['Chat.store.Messages'],

    alias: 'viewmodel.main',

    data: {
        name: 'Chat'
    },

    stores: {
        messages: {
            type: 'messages',

            listeners: {
                add: 'onMessagesAdd'
            }
        }
    }
});
