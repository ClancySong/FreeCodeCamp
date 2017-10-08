$("document").ready(function() {
  // 输入框获取焦点
  $("#input-search").focus(function(event) {
    $("#btn-search").css("border-color", "#1ABC9C");
    $("#btn-search").css("color", "#1ABC9C");
  });

  // 输入框失去焦点
  $("#input-search").blur(function(event) {
    $("#btn-search").css("border-color", "#bdc3c7");
    $("#btn-search").css("color", "#bdc3c7");
  });

  $("#btn-search").click(function(event) {
    if ($("#input-search").val() === "") {} else {
      clearResult();
      showResult($("#input-search").val());
      $("#input-search").val("");
    }
  });

  // 回车事件
  $("#input-search").keydown(function(e) {
    var curKey = e.which;
    if (curKey == 13) {
      $("#btn-search").click();
      return false;
    }
  });

  // 输出搜索结果
  var showResult = function(keyword) {
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + keyword + "&callback=JSON_CALLBACK";
    $.ajax({
      type: "get",
      url: url,
      dataType: "jsonp",
      success: function(data) {
        var result = data.query.pages;
        for (var value in result) {
          var resBox = '<a href="https://en.wikipedia.org/?curid=' + result[value].pageid + '" target="_blank" class="res-box col-sm-10 col-sm-offset-1">';
          var resTitle = '<div class="res-title"><h4>' + result[value].title + '</h4></div>';
          var resExtract = '<div class="res-extract"><p>' + result[value].extract + '</p></div>';
          var resBoxClose = '</a>';
          $(".show").prepend(resBox + resTitle + resExtract + resBoxClose);
        }
        $(".show").animate({
          opacity: 1
        }, 500);
      }
    });
    $(".search-box").animate({
      "margin-top": "40px"
    }, 500);
  };

  // 清空搜索结果
  var clearResult = function() {
    $(".show").animate({
      opacity: 0
    }, 500, function() {
      $(this).empty();
    });
  };
});
