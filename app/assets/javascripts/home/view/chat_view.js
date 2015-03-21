App.View.ChatView = Backbone.View.extend({

    el: ".chat_container",
    template:  JST["home/template/container"],
    messageTemplate:  JST["home/template/message"],

    events: {
        "click .submit": "sendMessage",
        "enter .chat_input": "sendMessage"
    },

    initialize: function() {
        this.enterEvent();
        this.$el.html(this.template());
        this.initializeWebsocket();
        this.$el.show();
    },

    enterEvent: function() {
        $('input').keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger('enter');
            }
        });
    },

    initializeWebsocket: function() {
        this.dispatcher = new WebSocketRails('localhost:3666/websocket');
        this.dispatcher.on_open = function(data) {
            console.log("Connection established");
        };
        var self = this;
        this.dispatcher.bind('message', function(res){
            self.receiveMessage(res);
        });
    },

    receiveMessage: function(res) {
        this.$el.find(".messages").append(this.messageTemplate({message: res['message']}));
    },

    sendMessage: function() {
        var element = this.$el.find(".chat_input");
        var message = element.val();
        element.val("");
        this.dispatcher.trigger('message', {message: message})
    }


});