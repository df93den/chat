Ext.define('Chat.store.Messages', {
    extend: 'Ext.data.Store',

    alias: 'store.messages',

    fields: [
        'text', 'timestamp', 'user'
    ],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
