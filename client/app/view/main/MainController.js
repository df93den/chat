/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('Chat.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    /**
     * Загружаем socket.io, подключаемся к бэкэнду и загружаем сообщения
     */
    onBoxready: function () {
        var me = this;
        Ext.Loader.loadScript({
            url: '/socket.io/socket.io.js',
            onLoad: function () {
                me.socket = io.connect();
                me.socket.on('allMessages', function (data) {
                    var messagesStore = me.getViewModel().getStore('messages');
                    messagesStore.add(data.allMessages);
                })
            }
        });
    },

    /**
     * Обрабатываем нажатие спец клавиш в поле ввода текста
     * @param {Ext.form.field.Base} field
     * @param {Ext.event.Event} e The event object
     */
    onTextFieldSpecialKey: function (field, e) {
        var me = this;
        if (e.keyCode === Ext.event.Event.ENTER && !e.altKey && !e.ctrlKey && !e.shiftKey) {
            e.stopPropagation();
            e.preventDefault();
            me.sendMessage(field.getValue());
            field.setValue('');
        }
    },

    /**
     * При нажатии enter пытаемся отправить сообщение
     * @param messageText
     */
    sendMessage: function (messageText) {
        var me = this;
        if(!Ext.isEmpty(messageText)) {
            var messagesStore = me.getViewModel().getStore('messages');
            messagesStore.add({
                text: messageText,
                user: me.socket.id,
                timestamp: Ext.now()
            });

            me.socket.emit('newMessage', messageText);
        }
    },

    /**
     * При добавлении в стор сообщения, рисуем его в списке сообщений с соответствующим стилем.
     * @param store
     * @param records
     */
    onMessagesAdd: function (store, records) {
        var me = this;
        var chatArea = me.getView().down('#chatArea');
        Ext.Array.forEach(records, function (record) {
            var own = true;
            if (record.get('user') !== me.socket.id) {
                own = false;
            }

            chatArea.add(Ext.create('Chat.component.Message', {
                msg: record.get('text'),
                own: own
            }));
        });
    },

    /**
     * Прокрутка к последнему сообщению.
     * @param chatArea
     */
    onAdd: function (chatArea) {
        Ext.Function.defer(function () {
            chatArea.scrollBy(0, 9999);
        }, 1);
    }
});
