var gtotal = 0;
function countTotal(price, qty) {
    var gtotal = (parseFloat(price) * parseFloat(qty));
    $('#total_price').html(gtotal.toFixed(2));
}
$(document).on('click', '.game-mode', function(e) {
if ($(this).is(':checked')) {
    var mode_price = $(this).attr('data-price');
    var total_qty = $('#qtyNumber').val();
    countTotal(mode_price,total_qty);
}
});
$(document).on('click', '.qty', function(e) {
if($("input:radio[class='form-check-input game-mode']").is(":checked")) {
    var mode_price =  $("input[class='form-check-input game-mode']:checked").attr('data-price');
    var total_qty = $('#qtyNumber').val();
    countTotal(mode_price,total_qty);
}
});

$(document).on('click','.paymentStripe',function(e){
    var price = $(this).attr('data-price');
    var product_id = $('input[name="game_mode"]:checked').val();
    var product_qty = $('#qtyNumber').val();
    $('#product_qty').val(product_qty);
    $('#product_id').val(product_id);
    $('#paymenyt_price').val(price);
    $('#_price').html(price);
    $('#paymentMethodModal').modal('show');
})

$(document).on('click','.sign_in', function(){
    $('#singupModal').modal('show');
})

$(document).on('change', '.active_username_update', function () {
    $('#accountModal').modal('hide');
})

//Game Info
   $(document).on("click", ".game-input", function () {
    var game_id = $(this).val();
    getUserNameBlock(game_id);
    $.ajax({
        beforeSend: function () {
            $("body").css("cursor", "progress");
        },
        type: 'GET',
        url : path+'/ajax/get-game-mode' + "/" + game_id,
        // url: '{{URL("ajax/get-game-mode")}}' + "/" + game_id,
        success: function (response) {
            if (response.status == 1) {
                var total_qty = $('#qtyNumber').val();
                var selected_mode = response.data.selected_mode.price;
                countTotal(selected_mode, total_qty);
                $('#game-mode-list').empty();
                $('#game-mode-list').append(response.data.html);
            }
        },
        error: function (jqXHR, exception) {
        },
        complete: function (data) {
            $("body").css("cursor", "default");
        }
    });
});



//Account
        //username select or edit
        $(document).ready(function() {
            var game_id = $('input[name="game"]:checked').val();
            getUserNameBlock(game_id);
       })

       function getUserNameBlock(game_id){
        $.ajax({
            beforeSend: function () {
                $("body").css("cursor", "progress");
            },
            type: 'GET',
            url : path+'/ajax/get_user_username' + "/" + game_id,
            success: function (response) {
                if (response.status == 1) {
                    $('#user_username').html(response.html);
                }
            },
            error: function (jqXHR, exception) {
            },
            complete: function (data) {
                $("body").css("cursor", "default");
            }
        });
    }
    function getUserAccounts(game_id){
        $.ajax({
                type: 'post',
                data: {
                    'game_id':game_id
                },
                url : path+'/user/ajax/get-game-info',
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        $('.user_account_list').html(response.data.html);
                        $('#editAccountModal').modal('hide');
                        $('#accountModal').modal('show');
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                }
        });
    }
    $(document).on('click','.username_info', function(){
        var game_id =  $("input[name='game']:checked").val();
        getUserAccounts(game_id);
    })

    $(document).on('submit', "#add_account_frm", function (e) {
        e.preventDefault();
        var game_id =  $("input[name='game']:checked").attr('data-id');
        var game_mode =  $("input[name='game_mode']:checked").attr('data-id');
        $input = $('<input type="hidden" name="game_id"/>').val(game_id);
        $input2 = $('<input type="hidden" name="mode_id"/>').val(game_mode);
        // append to the form
        $('#add_account_frm').append($input);
        $('#add_account_frm').append($input2);
        var form = $("#add_account_frm");
        var _this = $(this).find(":submit");
        var form = $("#add_account_frm");
            $.ajax({
                type: 'post',
                data: form.serialize(),
                url: form.attr('action'),
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                    $(_this).children(".loading-spinner").toggleClass('active');
                    $(_this).attr("disabled", true);
                    $(_this).children(".btn-txt").text("Processing");
                },
                success: function (response) {
                    if (response.status == 1) {
                        $('#add_account_frm')[0].reset();
                        $('#addAccountModal').modal('hide');
                        getUserAccounts(game_id);
                        $('#accountModal').modal('show');
                        getUserNameBlock(game_id);
                        $(_this).children(".loading-spinner").removeClass('active');
                        $(_this).attr("disabled", false);
                        $(_this).children(".btn-txt").text("Save");
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                    $(_this).children(".loading-spinner").removeClass('active');
                    $(_this).attr("disabled", false);
                    $(_this).children(".btn-txt").text("Save");
                }
            });
    });
    $(document).on('submit', "#edit_account_frm", function (e) {
        e.preventDefault();
        var game_id =  $("input[name='game']:checked").val();
        $input = $('<input type="hidden" name="game_id"/>').val(game_id);
        var form = $("#edit_account_frm");
        var _this = $(this).find(":submit");
        // append to the form
        $('#edit_account_frm').append($input);
        var form = $("#edit_account_frm");
            $.ajax({
                type: 'post',
                data: form.serialize(),
                url: form.attr('action'),
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                    $(_this).children(".loading-spinner").toggleClass('active');
                    $(_this).attr("disabled", true);
                    $(_this).children(".btn-txt").text("Processing");
                },
                success: function (response) {
                    if (response.status == 1) {
                        $('#edit_account_frm')[0].reset();
                        $('#editAccountModal').modal('hide');
                        getUserAccounts(game_id);
                        $('#accountModal').modal('show');
                        getUserNameBlock(game_id);
                        $(_this).children(".loading-spinner").removeClass('active');
                        $(_this).attr("disabled", false);
                        $(_this).children(".btn-txt").text("Update");
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                    $(_this).children(".loading-spinner").removeClass('active');
                    $(_this).attr("disabled", false);
                    $(_this).children(".btn-txt").text("Update");
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                    $(_this).children(".loading-spinner").removeClass('active');
                    $(_this).attr("disabled", false);
                    $(_this).children(".btn-txt").text("Update");
                }
        });
    });

    //Add new username
    $(document).on('click','.add_account_btn', function(){
        var game_id =  $("input[name='game']:checked").val();
        var game_mode =  $("input[name='game_mode']:checked").val();
        $.ajax({
                type: 'post',
                data: {
                    'game_id':game_id,
                    'game_mode':game_mode
                },
                url : path+'/user/ajax/add-account-body',
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        $('.add_account_form').html(response.data.html);
                        $('#addAccountModal').modal('show');
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                }
        });
    })
    $(document).on('click','.account_edit', function(){
        var data_id = $(this).data('id');
        var game_id =  $("input[name='game']:checked").val();
        var game_mode =  $("input[name='game_mode']:checked").val();
        $.ajax({
                type: 'post',
                data: {
                    'game_id':game_id,
                    'game_mode':game_mode,
                    'account_id':data_id,
                },
                url : path+'/user/ajax/edit-account-body',
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        $('.edit_account_form').html(response.data.html);
                        $('#editAccountModal').modal('show');
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                }
        });
    })
    $(document).on('click', ".delete_account", function (e) {
        e.preventDefault();
        var id =  $(this).data('id');
        var game_id =  $(this).data('game_id');
        if (confirm('Are you sure you want to delete this?')) {
        var url = $(this).data('href');
            $.ajax({
                type: 'GET',
                url: url,
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        getUserNameBlock(game_id);
                        getUserAccounts(game_id);
                        $('#editAccountModal').modal('hide');
                        $('#accountModal').modal('show');
                        toastr.success(response.message);
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                }
            });
        }
    });

    $(document).on('click','.active_username_update', function(e){
        var data_id = $(this).data('id');
        var data_game_id = $(this).attr('data-game-id');
        var from_data = $('$s_payment').serialize();
        $.ajax({
                type: 'GET',
                url : path+'/user/ajax/active_username_update'+'/'+data_id+'/'+data_game_id,
                //  url: '{{URL("user/ajax/active_username_update")}}'+'/'+data_id+'/'+data_game_id,
                async: true,
                data:from_data,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        var game_id =  $("input[name='game']:checked").val();
                        getUserNameBlock(game_id);
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
            }
        });
    })
    $(document).on('click','.proplayer_info', function(e){
        var proplayer_id = $(this).data('id');
        var user_game_id = $(this).attr('game-id');
        $.ajax({
                type: 'GET',
                 url : path+'/user/ajax/get-proplayer-info',
                 data:{
                    'proplayer_id':proplayer_id,
                    'user_game_id':user_game_id,
                 },
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        $('#proplayer_info_body').html(response.data.html);
                        $('#searchPlayerInfoModal').modal('show');
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                $("body").css("cursor", "default");
            }
        });
    })
    $(document).on('click','#reroll-teammate', function(e){
        var data_id = $(this).data('id');
        $.ajax({
                type: 'GET',
                // url: '{{URL("user/ajax/reroll-teammate")}}'+'/'+data_id,
                url : path+'/user/ajax/reroll-teammate'+'/'+data_id,
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                },
                success: function (response) {
                    if (response.status == 1) {
                        timerCounter(60);
                        $('#search_player_body').html(response.data.html);
                        $('#searchPlayerModal').modal('show');
                        getProPlayer(data_id);
                        $('#searchPlayerInfoModal').modal('hide');
                    } else {
                        toastr.error(response.message);
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
            }
        });
    })
    var swiper = new Swiper(".proPlayer_Swiper", {
        effect: "cards",
        grabCursor: false,
        autoplay: {
          delay:2000,
          disableOnInteraction: false,
        },
        loop:true,
      });

    // Category carousel
    $('.category_carousel').owlCarousel({
        loop: false,
        autoplay: false,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        dots: false,
        touchDrag : false,
        mouseDrag : false ,
        nav:true,
        items:6,
        stagePadding: 0,
        margin:10,
        navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            380: {
                items: 2,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
            1200: {
                items: 5,
            },
            1400: {
                items: 6,
            },
        },
    });

    // Category carousel
    $('.review_carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        dots: false,
        nav:true,
        stagePadding: 0,
        margin:10,
        navText:['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
            1200: {
                items: 4,
            }
        },
    });
