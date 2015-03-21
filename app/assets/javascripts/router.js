App.Router = Backbone.Router.extend({

    routes: {
        "" : "chat_view"
    },

    chat_view: function(){
        new App.View.ChatView();
    }

});