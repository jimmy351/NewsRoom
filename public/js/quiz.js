var maxQuestions;
var currentQuestion;
var accordion;
var toggleState = true;
$( document ).ready(function() {
    currentQuestion = 0;
    maxQuestions = parseInt($("#max_questions").html());
    accordion =$('.ui.accordion');
    accordion.accordion({exclusive: true});
    for (var x = 0; x < maxQuestions; x++) {
        if (x != currentQuestion)
            accordion.accordion('close', x)
    }
    accordion.accordion('open', currentQuestion);

    $('form').on('input', 'input[type=text]', function() { updateIndicator(); });
    $('.ui.dropdown').dropdown();
});

function prevQuestion() {
    accordion.accordion({exclusive: true});
    accordion.accordion('close', 'others');
    if (currentQuestion == 0) return;
    accordion.accordion('close', currentQuestion);
    currentQuestion--;
    accordion.accordion('open', currentQuestion);
    updateIndicator();
}

function nextQuestion() {
    accordion.accordion({exclusive: true});
    accordion.accordion('close', 'others');
    if (currentQuestion + 1 >= maxQuestions) return;
    accordion.accordion('close', currentQuestion);
    currentQuestion++;
    accordion.accordion('open', currentQuestion);
    updateIndicator();
}

function onManualSelect() {
    if (currentQuestion == parseInt($(".title.active").attr('id').substring(1))) {
        return;
    }
    accordion.accordion({exclusive: true});
    toggleState = true;
    $('#show_items_text').html("Show All Questions");
    currentQuestion = parseInt($(".title.active").attr('id').substring(1));
    accordion.accordion('close', 'others');
    accordion.accordion('open', currentQuestion - 1);
}

function toggleAllQuestions() {
    accordion.accordion({exclusive: false});
    if (toggleState) {
        $('#show_items_text').html("Hide All Questions");
        for (var x = 0; x < maxQuestions; x++) {
            accordion.accordion('open', x)
        }
        toggleState = false;
    } else {
        $('#show_items_text').html("Show All Questions");
        for (var x = 0; x < maxQuestions; x++) {
            if (x != currentQuestion)
                accordion.accordion('close', x)
        }
        toggleState = true;
    }
}

function updateIndicator(index) {
    $("#answered_questions").text(getNumberAnswered());
}

function getNumberAnswered() {
    var numAnswered = 0;
    var questionAnswered;
    $('.form').each(function(i, question) {
        questionAnswered = false;
            $(question).find('input').each(function(ii, response) {
            if ($(response).val().length != 0) {
                numAnswered++;
                questionAnswered = true;
                return false;
            }
        });
        var icon = $('#q' + ($(question).parent().attr('id').substring(1, 2)) + 't').find($('i'));
        if (!questionAnswered) {
            $(icon).removeClass('check green').addClass('close red');
        } else {
            $(icon).removeClass('close red').addClass('check green');
        }
    });
    if (numAnswered < 0) return 0;
    return numAnswered;
}

function addResponse(forQuestion) {
    var questionParent = $('#q' + forQuestion + 'c');
    var responseInputs = $(questionParent).find("div.form");
    var responseNum = responseInputs.find('input').length + 1;
    responseInputs.append('<div class="field"><label>Answer</label> <div class="inputarea ui icon input"><input class="response-area" name="q[' + forQuestion + '][' + responseNum + ']" type="text" placeholder="Tap to add your response..." maxlength="120"></div></div>');
    if (responseNum + 1 == 10) {
        $(questionParent).find('.button').remove();
    }
}

function validateForSubmission() {
    var na = getNumberAnswered();
    if (na == 0) {
        $('.noneanswered').modal('show');
    } else if (na < maxQuestions) {
        $('.notallanswered').modal('show');
    } else {
        $('.allanswered').modal('show');
    }
}

function confirmLogout() {
    $('.logout').modal('show');
}


function dismissDialogs() {
    $('.notallanswered').modal('hide');
    $('.allanswered').modal('hide');
    $('.noneanswered').modal('hide');
    $('.logout').modal('hide');
}

function submitForm() {
    $('.loadingmodal').modal('show');
    $('form').submit();
}
