$( document ).ready(function() {
    $('.buttons a, .buttons div').popup();
    $('.ui.dropdown').dropdown();
    $('.ui.checkbox').checkbox();

    if (navigator.userAgent.match(/iphone|ipad|ipod/i) &&
        parseInt(navigator.appVersion.match(/OS (\d)/)[1], 10) >= 7) {
        $('.nogo').modal('setting', 'closable', false);
        $('.nogo').modal('show');
    }
    $('.sortable.table').tablesort();

});
function emailResponses(sessionId) {
    $('.sendingemail').modal('setting', 'closable', false);
    $('.sendingemail').modal('show');
    $.ajax( "/admin/report?session_id=" + sessionId)
        .done(function() {
            $('.emailsent').modal('show');
            $('.sendingemail').modal('hide'); })
        .fail(function() {
            $('.emailnotsent').modal('show');
            $('.sendingemail').modal('hide'); })
}
function getSessionPDF(userId, sessionId) {
    $.getJSON("/api/report?user_id=" + userId + "&session_id=" + sessionId)
        .then(function (data) {
            window.open(data)
        })
        .fail(function () {
            console.log("Error generating session report.")
        });
}
function deleteGroup(groupId) {
    $.ajax({
        type: "DELETE",
        url: "/admin/group/" + groupId
    });
    location.reload(true);
}
function deleteQuestion(questionId) {
    $.ajax({
        type: "DELETE",
        url: "/admin/deletequestion/" + questionId
    });
    $('.delete').modal('hide');
    location.reload(true);
}
function deleteSession(sessionId) {
    $.ajax({
        type: "DELETE",
        url: "/admin/session/" + sessionId
    });
    $('.delete').modal('hide');
    location.reload(true);
}
function deleteSimulation(simulationId) {
    $.ajax({
        type: "DELETE",
        url: "/admin/simulation/" + simulationId
    });
    $('.delete').modal('hide');
    location.reload(true);
}
function deleteResponse(responseId) {
    $.ajax({
        type: "DELETE",
        url: "/admin/response/" + responseId
    });
    $('.delete').modal('hide');
    location.reload(true);
}

function showResponses() {
    $('#resp_area').fadeIn();
    $('#resp_button').hide();
}