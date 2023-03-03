$(function() {
    var product_id = $('input[name="game_mode"]:checked').val();
    var product_qty = $('#qtyNumber').val();
    $('#product_qty_pre').val(product_qty);
    $('#product_id_pre').val(product_id);
    var getForm = $("#payment-form-submit");
    $(getForm).bind('submit', function(e) {
        var getForm = $("#payment-form-submit"),
            inputSelector = ['input[type=email]', 'input[type=password]', 'input[type=text]', 'input[type=file]', 'textarea'].join(', '),
            $inputs = getForm.find('.required').find(inputSelector),
            $errorMessage = getForm.find('div.error'),
            valid = true;
        $errorMessage.addClass('hide');
        $('.has-error').removeClass('has-error');
        $inputs.each(function(i, el) {
            var $input = $(el);
            if ($input.val() === '') {
                $input.parent().addClass('has-error');
                $errorMessage.removeClass('hide');
                e.preventDefault();
            }
        });
        if (!getForm.data('cc-on-file')) {
            e.preventDefault();
            Stripe.setPublishableKey(stripe_key);
            Stripe.createToken({
                number: $('#cardNumber').val(),
                cvc: $('#cardCvc').val(),
                exp_month: $('#cardMonth').val(),
                exp_year: $('#cardYear').val(),
                address_zip: $('#cardZip').val(),
                address_country: $('#cardCountry').val()
            }, stripeResponseHandler);
        }
    });
    function stripeResponseHandler(status, response) {
        if (response.error) {
            toastr.error(response.error.message);
            $('.error')
                .removeClass('hide')
                .find('.alert')
                .text(response.error.message);
        } else {
            /* token contains id, last4, and card type */
            var token = response['id'];
            getForm.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
            var form = $("#payment-form-submit");
            var _this = getForm.find(":submit");
            $.ajax({
                type: 'post',
                url: $(getForm).attr('action'),
                data: getForm.serialize(),
                async: true,
                beforeSend: function () {
                    $("body").css("cursor", "progress");
                    $(_this).children(".loading-spinner").toggleClass('active');
                    $(_this).attr("disabled", true);
                    $(_this).children(".btn-txt").text("Processing");
                },
                success: function (response) {
                    $(_this).children(".loading-spinner").removeClass('active');
                    $(_this).attr("disabled", false);
                    $(_this).children(".btn-txt").text("Save");
                    if (response.status == false){
                        $.each(response.verror, function(key, value) {
                            toastr.error(value);
                        });
                    }else {
                        if (response.status == 1) {
                            getForm.get(0).reset();
                            getUserCard();
                            getActiveUserCard(response.data.id)
                            $('#walletModal').modal('show');
                        } else {
                            toastr.error(response.message);
                        }
                    }
                },
                error: function (jqXHR, exception) {
                    toastr.error('Something wrong');
                    $(_this).children(".loading-spinner").removeClass('active');
                    $(_this).attr("disabled", false);
                    $(_this).children(".btn-txt").text("Save");
                },
                complete: function (response) {
                    $("body").css("cursor", "default");
                    $(_this).children(".loading-spinner").removeClass('active');
                    $(_this).attr("disabled", false);
                    $(_this).children(".btn-txt").text("Save");
                }
            });
        }
    }
});
function getActiveUserCard(id) {
    $('.active_user_card').val(id);
    $.ajax({
        type: 'get',
        url : path+'/user/ajax/get-active-card',
        data: {
            id:id
        },
        async: true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
        },
        success: function (res) {
            if (res.status == 1) {
                $('.card-number').val(res.data.card_number);
                $('.card-cvc').val(res.data.cvc),
                $('.card-expiry-month').val(res.data.exp_month),
                $('.card-expiry-year').val(res.data.exp_year)
            } else {
                toastr.error(res.message);
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

function getUserCard(){
    $.ajax({
        type: 'get',
        data: {
        },
        url : path+'/user/ajax/get-card-info',
        async: true,
        beforeSend: function () {
            $("body").css("cursor", "progress");
        },
        success: function (response) {
            if (response.status == 1) {
                $('.user_card_info').html(response.data.html);
                $('#paymentMethodModal').modal('hide');
                $('#walletModal').modal('show');
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

function deleteUserCard(id) {
    if(confirm('Are you sure to delete?')) {
        $.ajax({
            type: 'get',
            url : path+'/user/ajax/delete-user-card',
            data: {
                id: id
            },
            async: true,
            beforeSend: function () {
                $("body").css("cursor", "progress");
            },
            success: function (res) {
                getUserCard();
                if (res.status == 1) {
                    toastr.success('Data deleted successfully');
                    $('.card_'+res.data.id).remove();
                    getUserCard();
                } else {
                    toastr.error(res.message);
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
}
    //Jquery credit card validation
    function input_credit_card (jQinp)
    {
        var format_and_pos = function(input, char, backspace)
        {
            var start = 0;
            var end = 0;
            var pos = 0;
            var value = input.value;
            if (char !== false)
            {
                start = input.selectionStart;
                end = input.selectionEnd;
                if (backspace && start > 0) // handle backspace onkeydown
                {
                    start--;
                    if (value[start] == " ")
                    { start--; }
                }
                // To be able to replace the selection if there is one
                value = value.substring(0, start) + char + value.substring(end);
                pos = start + char.length; // caret position
            }
            var d = 0; // digit count
            var dd = 0; // total
            var gi = 0; // group index
            var newV = "";
            var groups = /^\D*3[47]/.test(value) ? // check for American Express
            [4, 6, 5] : [4, 4, 4, 4];
            for (var i = 0; i < value.length; i++)
            {
                if (/\D/.test(value[i]))
                {
                    if (start > i)
                    { pos--; }
                }
                else
                {
                    if (d === groups[gi])
                    {
                        newV += " ";
                        d = 0;
                        gi++;

                        if (start >= i)
                        { pos++; }
                    }
                    newV += value[i];
                    d++;
                    dd++;
                }
                if (d === groups[gi] && groups.length === gi + 1) // max length
                { break; }
            }
            input.value = newV;
            if (char !== false)
            { input.setSelectionRange(pos, pos); }
        };

        jQinp.keypress(function(e)
        {
            var code = e.charCode || e.keyCode || e.which;
            // Check for tab and arrow keys (needed in Firefox)
            if (code !== 9 && (code < 37 || code > 40) &&
            // and CTRL+C / CTRL+V
            !(e.ctrlKey && (code === 99 || code === 118)))
            {
                e.preventDefault();
                var char = String.fromCharCode(code);
                // if the character is non-digit
                // -> return false (the character is not inserted)
                if (/\D/.test(char))
                { return false; }
                format_and_pos(this, char);
            }
        }).
        keydown(function(e) // backspace doesn't fire the keypress event
        {
            if (e.keyCode === 8 || e.keyCode === 46) // backspace or delete
            {
                e.preventDefault();
                format_and_pos(this, '', this.selectionStart === this.selectionEnd);
            }
        }).
        on('paste', function()
        {
            // A timeout is needed to get the new value pasted
            setTimeout(function()
            { format_and_pos(jQinp[0], ''); }, 50);
        }).
        blur(function() // reformat onblur just in case (optional)
        {
            format_and_pos(this, false);
        });
    };
    input_credit_card($('#cardNumber'));
