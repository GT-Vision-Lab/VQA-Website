jQuery(document).ready(function($) {
    var timezone = "Etc/GMT" ;
    var deadline = moment.tz("2021-05-14 23:59:59", timezone);
    $('#countdown-textvqa').countdown(deadline.toDate(), function(event) {
        $(this).html(event.strftime('%D days %Hh %Mm %Ss'));
    });
});
