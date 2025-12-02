
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

  player.useMedia('https://www.youtube.com/watch?v=JedKBJVHhiE');


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
    console.log("Chord event:", ev.data.chord);

    const chordName = ev.data.chord.chordName;   // 例: "Am", "F#dim", "G7"
    const chordType = classifyChord(chordName); // "M","m","sus","dim","7" のどれか
    const key = player.data.song && player.data.song.key;

    // 仮：緊張度
    const tensionTable = { "M": 0, "m": 1, "sus": 1, "7": 2, "dim": 3 };
    const tension = tensionTable[chordType] ?? 0;

    const H = getHue(chordType);
    const S = getSaturation(key);
    const V = getValue(tension);

    const rgb = hsvToRgb(H, S, V);

    /*// ★ 白にちょっと寄せたい場合（中間色を挟む）
    const white = { r: 255, g: 255, b: 255 };
    const blended = blendColors(rgb, white, 0.3); // 0.3だけ白に寄せる
*/
    document.body.style.backgroundColor =
      "rgb(${rgb.r}, ${rgb.g}, ${rgb.b})";
  });

  // 和音の種類に応じた色相（Hue）
  function getHue(chordType) {
    switch (chordType) {
      case "M":   return 60;   // Major → 黄色寄り
      case "m":   return 240;  // Minor → 青
      case "sus": return 120;  // Sus → 緑
      case "dim": return 280;  // Dim → 紫
      case "7":   return 350;  // 7th → 赤寄り
      default:    return 0;
    }
  }
	function getValue(tension) {
    return Math.max(0, Math.min(1, 0.8 - 0.1 * tension));
  }


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
	/*
player.addPlugin(new Songle.Plugin.Beat());
player.on("beatEnter",
  function(ev) {
    //  処理
	
  });
player.addPlugin(new Songle.Plugin.Chord());
*/

  // 再生時刻を定期的に更新する
  var span = document.querySelector('span.time');
  setInterval(function () {
    while (span.childNodes.length > 0) span.removeChild(span.childNodes[0]);
    var textNode = document.createTextNode(parseInt(player.position));
    span.appendChild(textNode);
  }, 100);
	
}
