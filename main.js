// A $( document ).ready() block.
$(document).ready(function () {
  $(".menu-icon").click(function () {
    $(".nav-container_responsive").css("display", "block");
    $("body").css("overflow-y", "hidden");
  });

  $(".responsive_nav-close ").click(function () {
    $(".nav-container_responsive").css("display", "none");
    $("body").css("overflow-y", "scroll");
  });

  // TIME DELAY
  function delay_close() {
    setTimeout(function () {
      $(".nav-container_responsive").css("transition", "0.5s");
      $(".nav-container_responsive").css("display", "none");
      $("body").css("overflow-y", "scroll");
    }, 200);
  }

  $(".contact_form_submit")
    .off("click")
    .on("click", function (e) {
      e.preventDefault(); // Prevent default button behavior
      console.log("Form submission triggered");

      var access_key = "3e3a7bc4-0d37-4ba1-85d3-d6f2ca525442";

      // Get form values
      var name = $("input[placeholder='Name']").val().trim();
      var phone = $("input[placeholder='Phone']").val().trim();
      var email = $("input[placeholder='Email']").val().trim();
      var message = $("textarea").val().trim();
      var isAgreed = $("input[type='checkbox']").is(":checked");

      // Validate if required fields are filled
      if (name === "" || phone === "" || email === "") {
        alert("Please fill in all required fields.");
        return;
      }

      // Disable button to prevent double submission
      $(".contact_form_submit").prop("disabled", true);

      // AJAX request
      $.ajax({
        url: "https://api.web3forms.com/submit",
        type: "POST",
        dataType: "JSON",
        async: false,

        // headers: {
        //   "X-Requested-With": "XMLHttpRequest",
        // },
        // crossDomain: true,
        data: {
          access_key: access_key,
          name: name,
          email: email,
          message:
            message + "   Phone: " + phone + "   Agree status: " + isAgreed,
        },
        success: function (response) {
          alert("Form submitted successfully!");
          $("#contact_form")[0].reset(); // Reset form after success
          $(".contact_form_submit").prop("disabled", false); // Re-enable button
        },
        error: function (xhr, status, error) {
          // alert("Error submitting form.");
          console.error(xhr); // Debugging
          $(".contact_form_submit").prop("disabled", false); // Re-enable button
        },
      });
    });

  $(".nav-container_responsive .close_after_click").click(function () {
    delay_close();
  });

  function fadeInOnScroll() {
    $(".fade-in").each(function () {
      var elementTop = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();

      if (elementTop < windowBottom - 50) {
        $(this).addClass("visible");
      }
    });
  }

  $(window).on("scroll", fadeInOnScroll);
  fadeInOnScroll();
  // });
});
