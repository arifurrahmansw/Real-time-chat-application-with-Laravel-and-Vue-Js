$(document).on('submit', "#login_form", function(e) {
    var form = $("#login_form");
    var _this = $(this).find(":submit");
    $(_this).children(".loading-spinner").toggleClass('active');
    $(_this).attr("disabled", true);
    $(_this).children(".btn-txt").text("Processing");
});
$(document).on('submit', "#register_form", function(e) {
    var form = $("#register_form");
    var _this = $(this).find(":submit");
    $(_this).children(".loading-spinner").toggleClass('active');
    $(_this).attr("disabled", true);
    $(_this).children(".btn-txt").text("Processing");
});
