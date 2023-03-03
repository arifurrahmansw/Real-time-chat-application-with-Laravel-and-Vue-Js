paypal.Buttons({
    style: {
        layout: 'horizontal',
        shape:  'pill',
        label:  'paypal',
        tagline:false,
    },
    createOrder: function(data, actions) {
       var paymenyt_price =  $("input[class='form-check-input game-mode']:checked").attr('data-price');
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: paymenyt_price
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            var product_id = $('#product_id').val() ?? 1;
            $.ajax({
                method:"post",
                url:"{{ route('user.buy-credit.paypal') }}",
                data:{
                    "_token": "{{ csrf_token() }}",
                    'payment_id':details.id,
                    'product_id':product_id,
                    'user_id': "{{ auth()->user()->id ?? NULL }}",
                    'payment_data':JSON.stringify(details),

                },
                success:function (response){
                    window.location = response.redirect_url
                },
                error:function(response){
                    location.reload();
                }
            })
        });
    }
}).render('#paypal-button-container');
