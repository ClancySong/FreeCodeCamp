$("document").ready(function() {

  var getUrl = function(cityName) {
    var url = "http://v.juhe.cn/weather/index?cityname=";
    url += cityName;
    url += "&dtype=&format=&key=05b711214761feeebedf8fe612811e89&callback=JSON_CALLBACK";
    return url;
  };

  $("#btn-getinfo").click(function(event) {
    var cityName = $("#input-cityname").val();
    var url = getUrl(cityName);
    $.ajax({
      type: "get",
      url: url,
      dataType: "jsonp",
      success: function(data) {
        if (data.reason === "successed!") {
          $(".show").animate({
            opacity: 0
          }, 500, function() {
            $(this).animate({
              opacity: 1
            }, 500);
            $("#city").text(data.result.today.city);
            $("#date_y").text(data.result.today.date_y);
            $("#time").text(data.result.sk.time);
            $("#temperature").text(data.result.today.temperature);
            $("#weather").text(data.result.today.weather);
            $("#wind").text(data.result.today.wind);
            $("#dressing_advice").text(data.result.today.dressing_advice);
            $("#uv_index").text(data.result.today.uv_index);
            $("#travel_index").text(data.result.today.travel_index);
            $("#exercise_index").text(data.result.today.exercise_index);
          });
        } else {
          alert("未接收到数据！");
        }
      }
    });
  });
});
