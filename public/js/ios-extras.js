(function($){$.extend({stayInWebApp:function(b){"standalone"in window.navigator&&window.navigator.standalone&&(b||(b="a"),$("body").delegate(b,"click",function(b){if($(this).attr("target")==void 0||$(this).attr("target")==""||$(this).attr("target")=="_self"){var c=$(this).attr("href");if(!c.match(/^http(s?)/g))b.preventDefault(),self.location=c}}))}})})(jQuery);
$(function() {
    $.stayInWebApp();
});
$( document ).ready(function() {
    $('#content').height($('body').height() - 140);
    var updateStatusBar = navigator.userAgent.match(/iphone|ipad|ipod/i) &&
        parseInt(navigator.appVersion.match(/OS (\d)/)[1], 10) >= 7;

    if (updateStatusBar) {
        $('nav').css("padding-top", 20);
        $('.login-status-bar').css("visibility", "visible");
    }

    $("body").keydown(function(){
        if(event.keyCode == 13) {
            document.activeElement.blur();
            return false;
        }
    });

    document.body.addEventListener('touchmove', function(event) {
        if ($(event.srcElement).parents('#content').length == 0 &&
            $(event.srcElement).parents('#document').length == 0) {
                event.preventDefault();
        } else {
                event.stopPropagation();
        }
    }, false);

    FastClick.attach(document.body);
});