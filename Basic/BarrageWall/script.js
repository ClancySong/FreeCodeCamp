$("document").ready(function() {
  var screenWidth = $(".screen").width();
  var screenHeight = $(".screen").height();

  var barrages = [];

  var getRandomColor = function() {
    return "#" + ((Math.random() * 0x1000000 << 0).toString(16));
  };

  var sendBarrage = function(content) {
    var height = function() {
      return (screenHeight - 32) * Math.random();
    };
    var speed = 10000;
    var createdBarrage = $("<div class='barrage-text'>" + content + "</div>");
    createdBarrage.css("color", getRandomColor());
    createdBarrage.css("top", height());
    $(".screen").append(createdBarrage);
    createdBarrage.animate({
      left: '4px'
    }, speed, 'linear', function() {
      $(this).remove();
    });
  };

  var restBarrages = function() {
    barrages = [];
    barrages.push("Hello World!");
  };

  var autoSendBarrage = function() {
    setInterval(function() {
      var index = Math.floor(Math.random() * barrages.length);
      var content = barrages[index];
      sendBarrage(content);
    }, 1000);
  };

  $(".btn-send").click(function(event) {
    var content = $(".text-box").val();
    $(".text-box").val("");
    sendBarrage(content);
    barrages.push(content);
  });

  $(".btn-clear").click(function(event) {
    restBarrages();
    $(".screen").empty();
  });

  restBarrages();
  autoSendBarrage();
});
