jQuery(document).ready(function($) {
    var timezone = "Etc/CST" ;
    var deadline = moment.tz("2020-05-15 17:59:59", timezone);
    $('#countdown-vqa').countdown(deadline.toDate(), function(event) {
        $(this).html(event.strftime('%D days %Hh %Mm %Ss'));
    });
});
