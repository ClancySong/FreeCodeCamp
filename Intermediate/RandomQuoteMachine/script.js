var colorArr = ['#1ABC9C','#2ECC71','#3498DB','#9B59B6','#34495E','#F1C40F','#E67E22','#E74C3C','#95A5A6'];
var quote = "";
var author = "";

var getColor = function() {
  var index = Math.floor(Math.random() * colorArr.length);
  return colorArr[index];
};

var getQuote = function() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',

    success: function(r) {
      if (typeof r === 'string') {
        r = JSON.parse(r);
      }
      quote = r.quote;
      author = r.author;
      color = getColor();

      $(".quote").animate({
        opacity: 0
      }, 500, function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $('.quote').text(quote);
      });

      $(".author").animate({
        opacity: 0
      }, 500, function() {
        $(this).animate({
          opacity: 1
        }, 500);
        $('.author').text("- " + author);
      });

      $("body").animate({
        backgroundColor: color,
        color: color
      }, 1000);

      $(".btn").animate({
        backgroundColor: color
      }, 1000);
    }
  });
};

$(".btn-change").click(function(event) {
  getQuote();
});

$(".btn-twitter").click(function(event) {
  $("#a-twitter").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" + quote + "  -" + author);
});

$("document").ready(function() {
  getQuote();
});
