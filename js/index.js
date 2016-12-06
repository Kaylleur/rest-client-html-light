$(document).ready(function(){
    $('#options a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    $('#response a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
        var span = $(this).children('span');
        if(span.hasClass('glyphicon-chevron-left')){
            span.removeClass('glyphicon-chevron-left')
                .addClass('glyphicon-chevron-right');
        }else{
            span.removeClass('glyphicon-chevron-right')
                .addClass('glyphicon-chevron-left');
        }
    });

    $('#url').keyup(function(e){
       if(e.which == 13) $('#btnSend').click();
    });
});

//toastr config
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

//beautifier
var beautifyXML = function(input){
    var formatted = '';
    var reg = /(>)(<)(\/*)/g;
    input = input.replace(reg, '$1\r\n$2$3');
    var pad = 0;
    jQuery.each(input.split('\r\n'), function(index, node) {
        var indent = 0;
        if (node.match( /.+<\/\w[^>]*>$/ )) {
            indent = 0;
        } else if (node.match( /^<\/\w/ )) {
            if (pad != 0) {
                pad -= 1;
            }
        } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
            indent = 1;
        } else {
            indent = 0;
        }

        var padding = '';
        for (var i = 0; i < pad; i++) {
            padding += '  ';
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });
    return formatted;
};

var beautifyJSON = function(input){
    var json = eval("(" + input + ")");
    try {
        return JSON.stringify(json, undefined, 3);
    } catch (err) {
        console.log(err.message);
    }
};

function clone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    var temp = obj.constructor(); // give temp the original obj's constructor
    for (var key in obj) {
        temp[key] = clone(obj[key]);
    }

    return temp;
}