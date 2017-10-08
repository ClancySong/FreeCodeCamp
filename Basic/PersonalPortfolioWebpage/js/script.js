$(document).ready(function() {
  $(".scroll").click(function() {
    $("html,body").animate({
        scrollTop: $(this.hash).offset().top - 100
      },
      500);
    $(".scroll").removeClass("selected");
    $(this).addClass("selected");
  });
});
