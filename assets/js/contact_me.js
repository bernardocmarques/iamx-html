$(function() {
    $("#contactForm").on('submit', function(event){
        event.preventDefault();
        event.stopPropagation();

        $('#contact_btn').addClass("disabled");
        $('#contact_btn_spinner').removeClass("d-none");

        let name = event.target[0].value
        let email = event.target[1].value
        let subject = event.target[2].value
        let message = event.target[3].value

        $contact_btn = $("#contact_btn");
        $contact_btn.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzRsG3LCUO_FUys2cKLP_dRij4u1YX1wXQzPwh37xNx-9UK90BQRsIdEb3ZSSBQ44gQ/exec",
            type: "POST",
            data: {
                "Name": name,
                "Email": email,
                "Subject": subject,
                "Message": message
            },
            cache: false,
            success: function() {
                // Success message
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-success')
                    .append("<strong>Message sent with success! Thanks! </strong>");
                $('#success > .alert-success')
                    .append('</div>');

                $('#success').focus();
                //clear all fields
                $('#contactForm').trigger("reset");
            },
            error: function() {
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append($("<strong>").text("Sorry, something went wrong. Please try again later."));
                $('#success > .alert-danger').append('</div>');
                $('#success').focus();
                //clear all fields
                $('#contactForm').trigger("reset");
            },
            complete: function() {
                $contact_btn.removeClass("disabled");
                $('#contact_btn_spinner').addClass("d-none");
                $contact_btn.prop("disabled", false); // Re-enable submit button when AJAX call is complete

                setTimeout(function() {
                    $('#success').html("");

                }, 5000);
            }
        });
    });
});
