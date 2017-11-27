Ext.define('Chat.component.Message', {
    extend: 'Ext.Component',

    xtype: 'chatmessage',

    margin: 10,
    width: '100%',
    initComponent: function (config) {
        var me = this;
        var cls = 'speech-bubble';
        if (me.initialConfig.own) {
            cls += ' own';
        }

        me.setHtml({
            tag: 'div',
            cls: cls,
            html: me.initialConfig.msg
        });

        me.callParent([config]);
    }
});
