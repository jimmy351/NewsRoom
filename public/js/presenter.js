var question_data;
var response_data;
var words;
var scrollpos;

$( document ).ready(function() {
    $('#word_cloud').jQCloud([], { autoResize: true });
    $('.ui.dropdown').dropdown('set selected', 1);
    $(function() {
        var timer;
        $("#search").keyup(function() {
            clearTimeout(timer);
            var ms = 800;
            var val = this.value;
            timer = setTimeout(function() {
                if (val.trim().length > 0) {
                    search = val;
                } else {
                    search = "";
                }
                updateResponses();
            }, ms);
        });
    });

    $('#word_cloud').on('click', 'span', function() {
        showBigWord($(this).html());
    });

    $('#card_area').on('click', '.resp-card', function() {
        showResponseCard($(this).find('p').html(), $(this).css('background-color'));
    });

    $(".dropdown").dropdown({
        onChange: function (val) {
            $('#card_area').fadeOut(function() {
                group_id = val;
                updateResponses();
                updateWordFreq();
            });
        }
    });


    updateResponses();
    updateWordFreq();
});

function switchtoList() {
    $("#search_wrap").slideDown();
    $('#scloudbtn').removeClass('active');
    $('#slistbtn').addClass('active');
    $('#view_card').fadeOut();
    $('#word_cloud').hide(function () {
        $('#card_area').fadeIn();
    });
    hideBigWord();
    updateResponses();

}

function switchtoCloud() {
    hideResponseCard();
    $("#search_wrap").slideUp();
    $('#scloudbtn').addClass('active');
    $('#slistbtn').removeClass('active');
    $('#view_card').hide();
    $('#card_area').hide(function() {
        $('#word_cloud').show('slide',function(){
            drawWordFreq();
        });
    });
}

function hideNav() {
    $('nav').slideUp(function() {
        $('#navhide').slideDown();
    });
}

function showNav() {
    $('#navhide').slideUp(function() {
        $('nav').slideDown();
    });
}

function updateWordFreq() {
    var wf_endpoint = "/api/wordfreq?session_id=" + session_id + "&group_id=" + group_id;
    $.getJSON(wf_endpoint, function( data ) {
        words = data;
        if ($('#scloudbtn').hasClass('active')) {
            drawWordFreq();
        }
    });
}

function drawWordFreq() {
    $('#word_cloud').html("");
    if (words == null || words.length == 0) {
        $('#word_cloud').html('<h2>No suitable words found for this group.</h2>');
    } else {
        $('#word_cloud').jQCloud('update', words);
    }
}


function updateResponses() {;
    var question_endpoint = "/api/questions?group_id=" + group_id;
    var response_endpoint;
    if (search.length == 0) { response_endpoint = "/api/responses?session_id=" + session_id + "&group_id=" + group_id; }
    else { response_endpoint = "/api/responses?session_id=" + session_id + "&group_id=" + group_id + "&search=" + search; }

    $.getJSON(question_endpoint, function( dataq ) {
        question_data = dataq;
        $.getJSON(response_endpoint, function( datar ) {
            response_data = datar;
            populateResponseCards();
        });
    });
}

function populateResponseCards() {
    $("#card_area").html("");
    var htmlOut = "";
    question_data.forEach(function(entry, i) {
        var responses = [];
        response_data.forEach(function(resp) {
            if (resp.question.id == entry.id) {
                responses.push(resp);
            }
        });
        htmlOut += "<h1>" + (i + 1) + ". " + entry.question_text + "</h1>";
        if (responses.length != 0) {
            htmlOut += '<div class="ui grid">';
            responses.forEach(function (response) {
                htmlOut += '<div class="resp-wrap four wide column "><div style="background-color: #' + response.question.group.colour + '" class="resp-card">';
                htmlOut += '<p>' + response.response_text + '</p></div></div>';
            });
            htmlOut += '</div>';
        } else {
            htmlOut += '<h2 style="color: #' + entry.group.colour + '" class="nor">No responses for this question.</h2>';
        }
    });
    $("#card_area").html(htmlOut);
    if ($('#slistbtn').hasClass('active')) {
        $('#card_area').fadeIn();
    }
}


function showBigWord(word) {
    $('.word').html(word);
    $('#view_word').slideDown();
    lockScroll();
}

function showResponseCard(word, colour) {
    scrollpos = $('#card_area').scrollTop();
    $('.fs-card-text').html(word);
    $('.fs-observer').html($('.dropdown').dropdown('get text'));

    $('#response_card').css("background-color", colour);
    $('#card_area').fadeOut(function() {
        $('#response_card').slideDown();
    });
    lockScroll();
}

function hideBigWord() {
    $('#view_word').slideUp(function() {
        drawWordFreq();
    });
    unlockScroll();
}

function hideResponseCard() {
    $('#response_card').slideUp(function() {
        $('#card_area').fadeIn(function() {
            $("#card_area").scrollTop(scrollpos);
        });
    });
    unlockScroll();
}

function lockScroll() {
    $('html, body').css({
        'overflow': 'hidden',
        'height': '100%'
    });
}

function unlockScroll() {
    $('html, body').css({
        'overflow': 'auto',
        'height': '100%'
    });
}
