var channels = ["freecodecamp", "test_channel", "ESL_SC2"];

var getChannelsInfo = function() {
  var getUrl = function(type, channels) {
    var clientId = 'uo6dggojyb8d6soh92zknwmi5ej1q2';
    return 'https://api.twitch.tv/kraken/' + type + '/' + channels + '?client_id=' + clientId + '&callback=?';
  };

  channels.forEach(function(value) {
    var url = getUrl('streams', value);
    $.ajax({
      type: "get",
      url: url,
      dataType: 'jsonp',
      success: function(data) {
        var showBox = '';
        var logo = '';
        var name = '';
        var isOnline = '';
        var status = '';
        if (data.stream === null) {
          showBox = '<div class="show-box show-offline">';
          name = '<a href="https://www.twitch.tv/' + value + '" target="_blank"><span id="name">' + value + '</span></a>';
          isOnline = '<span class="label label-default">offline</span>';
        } else {
          showBox = '<div class="show-box show-online">';
          logo = '<img src="' + data.stream.channel.logo + '" alt="" class="img-circle" id="logo">';
          name = '<a href="https://www.twitch.tv/' + value + '" target="_blank"><span id="name">' + value + '</span></a>';
          isOnline = '<span class="label label-success" id="is-online">online</span>';
          status = '<p id="status">' + data.stream.channel.game + ': ' + data.stream.channel.status + '</p>';
        }
        var showBoxClose = '</div><hr>';

        $(".show").append(showBox + logo + name + isOnline + status + showBoxClose);
      },
    });
  });
};

$("document").ready(function() {
  getChannelsInfo();
});
