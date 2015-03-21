/*
 This is a manifest file that'll be compiled into application.js, which will include all the files
 listed below.

 Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
 or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.

 It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
 compiled file.

 Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
 about supported directives.

 = require jquery-2.0.3
 = require underscore
 = require backbone
 = require_tree ./init
 = require_tree ./home
 = require_tree .
 = require_self
 */
//= require jquery-2.0.3
//= require underscore
//= require backbone
//= require websocket_rails/main
//= require_tree ./init
//= require_tree ./home
//= require_tree .
// require_self

$(function(){
    var router = new App.Router();
    Backbone.history.start({pushState: false});
});

