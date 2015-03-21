App.View.ChatView = Backbone.View.extend({

    el: ".chat_container",
    template:  JST["home/template/container"],
    messageTemplate:  JST["home/template/message"],

    events: {
        "click .submit": "sendMessage",
        "enter .chat_input": "sendMessage",
        "click .join": "newUser",
        "enter .user_name": "newUser"
    },

    initialize: function() {
        this.$el.html(this.template());
        this.dispatcher = new WebSocketRails('localhost:3666/websocket');
        this.$el.show();
        this.enterEvent();
    },

    enterEvent: function() {
        this.$('input').keyup(function (e) {
            if (e.keyCode == 13) {
                $(this).trigger('enter');
            }
        });
    },

    initializeBinding: function() {
        var self = this;
        this.dispatcher.bind('message', function(res){
            self.receiveMessage(res);
        });

        this.dispatcher.bind('new_user', function(res){
            self.userJoined(res);
        });
    },

    newUser: function() {
        this.user = this.$el.find(".user_name").val();
        this.$el.find(".user").addClass("hide");
        this.$el.find(".footer").removeClass("hide");
        this.initializeBinding();
        this.dispatcher.trigger('new_user', {userName: this.user});
    },

    receiveMessage: function(res) {
        var displayMessage = res['user'] + ": " + res['message'];
        this.$el.find(".messages").prepend(this.messageTemplate({message: displayMessage, time: res['time']}));
    },

    sendMessage: function() {
        var element = this.$el.find(".chat_input");
        var message = element.val();
        element.val("");
        this.dispatcher.trigger('message', {message: message, user: this.user})
    },

    userJoined: function(res) {
        this.$el.find(".messages").prepend(this.messageTemplate({message: "User " + res['userName'] + " Joined", time: res['time']}));
    }


});