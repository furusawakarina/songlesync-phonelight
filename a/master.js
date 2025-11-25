
function onSongleAPIReady(Songle) {

  // 音楽プレーヤーを表示する
  var player = new Songle.Player({
    mediaElement: document.querySelector('div.media'),
    accessToken: '00000144-8PDPBsb', // 参加用トークン
     secretToken: '5ruktp2XZhuB1rKBLhUTkTdq6b46bHDb'  // 認証用トークン
	
  });

  player.addPlugin(new Songle.Plugin.SongleSync({
	  enabled: true,    // 新しく接続を開始
  clientId: "unique-" + Date.now()
  }));

  player.useMedia('https://youtu.be/9HKbo1FstOE?si=zpkfS8K7KCzAvCQu');


//ビート
player.addPlugin(new Songle.Plugin.Beat());

/*
player.on("beatEnter",
  function(ev) {
    // 処理 ...
	document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",90%,60%)";
	
  });*/

//メロディ
player.addPlugin(new Songle.Plugin.Melody());
player.on("melodyEnter",
  function(ev) {
    // do someting ...
	//document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",100%,60%)";
  });

//和音
player.addPlugin(new Songle.Plugin.Chord());

player.on("chordEnter",
  function(ev) {
    // do someting ...
	//document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",90%,60%)";
  });



  // ページが読み込まれたら再生を開始する
  player.on('mediaReady', function () {
    player.play();
  });

  // 再生ボタンで再生を開始する
  var playButton = document.querySelector('button.play');
  playButton.addEventListener('click', function () {
    player.play();
  });

//先頭
  var seekToButton = document.querySelector('button.seekTo');
  seekToButton.addEventListener('click', function () {
    player.seekTo(0);
  });
//サビ


  // 停止ボタンで再生を停止する
  var pauseButton = document.querySelector('button.pause');
  pauseButton.addEventListener('click', function () {
    player.pause();
  });

//ビート・コード　プラグイン
player.addPlugin(new Songle.Plugin.Beat());
player.on("beatEnter",
  function(ev) {
    //  処理
	
  });
player.addPlugin(new Songle.Plugin.Chord());


  // 再生時刻を定期的に更新する
  var span = document.querySelector('span.time');
  setInterval(function () {
    while (span.childNodes.length > 0) span.removeChild(span.childNodes[0]);
    var textNode = document.createTextNode(parseInt(player.position));
    span.appendChild(textNode);
  }, 100);
}
