jQuery(document).ready(function($) {
    var timezone = "Etc/GMT" ;
    var deadline = moment.tz("2019-05-15 23:59:59", timezone);
    $('#countdown-gqa').countdown(deadline.toDate(), function(event) {
        $(this).html(event.strftime('%D days %Hh %Mm %Ss'));
    });
});
