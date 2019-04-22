
 var playerElement = document.getElementById("clplayer");
 alert (playerElement)
 return;


 var player = new Clappr.Player({
 mediacontrol: {seekbar: "#E113D3", buttons: "#66B2FF"},
 disableErrorScreen: true,
 autoPlay: true,
 height: "100%",
 width: "100%",
 mute: 'false',
  plugins: {
    'core': [LevelSelector]
  },
 hlsjsConfig: {
 xhrSetup: function(xhr, url) {
  xhr.withCredentials = false;
 }
 },
 events: {
			onError: function(e) {
			  r--;
			  var s = player.options.source;
			  // Replace previous line by the following line to simulate successful recovery
			  // var s = (r > 2) ? player.options.source : 'http://clappr.io/highline.mp4';
			  var t = 10;
			  var retry = function() {
				if (t === 0) {
				  var o = player.options;
				  o.source = s;
				  player.configure(o);
				  return;
				}
				Clappr.$('#retryCounter').text(t);
				t--;
				setTimeout(retry, 1000);
			  };
			  player.configure({
				autoPlay: true,
				source: 'playback.error',
				playbackNotSupportedMessage: 'Network Error.' + ((r > 0)
					? ' Retrying in <span id="retryCounter"></span> seconds ...'
					: ' Please Try to Refresh Your Browser'),
			  });
			  if (r > 0) {
				retry();
			  }
			}
		}
});
player.attachTo(playerElement);
player.load({source: '//cdn.hdcast.me/live/LwjMncy17L20180806/playlist.m3u8?wmsAuthSign=c2VydmVyX3RpbWU9MTAvMjkvMjAxOCA4OjIwOjAzIFBNJmhhc2hfdmFsdWU9VWRQcXZVdHFMM1pLbkdhMFBteDZmZz09JnZhbGlkbWludXRlcz0yMA==', mimeType: 'application/vnd.apple.mpegurl'});
player.play();
