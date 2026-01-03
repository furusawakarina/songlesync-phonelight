
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

  player.useMedia("https://www.nicovideo.jp/watch/sm40955466");



//和音
player.addPlugin(new Songle.Plugin.Chord());

player.on("chordEnter",
  function(ev) {
	  //if (!syncMode) return;
     //do someting ...
	const chordName = ev.data.chord.name;
	  let h ="0";
	  
	  if (chordName.startsWith("C"))
		  h = 0;
	  else if(chordName.startsWith("C#") || chordName.startsWith("Db"))
		  h = 30;
	  else if(chordName.startsWith("D"))
		  h = 60;
	  else if(chordName.startsWith("D#") || chordName.startsWith("Eb"))
		  h = 90;
	  else if(chordName.startsWith("E"))
		  h = 120;
	  else if(chordName.startsWith("F"))
		  h = 150;
	  else if(chordName.startsWith("F#") || chordName.startsWith("Gb"))
		  h = 180;
	  else if(chordName.startsWith("G"))
		  h = 210;
	  else if(chordName.startsWith("G#") || chordName.startsWith("Ab"))
		  h = 240;
	  else if(chordName.startsWith("A"))
		  h = 270;
	  else if(chordName.startsWith("A#") || chordName.startsWith("Bb"))
		  h = 300;
	  else if(chordName.startsWith("B"))
		  h = 330;
	  
	let s = 65;
	  if (chordName.includes("6"))
		  s = 68;
	  else if(chordName.includes("maj7"))
		  s = 72;
	  else if(chordName.includes("m7"))
		  s = 68;
	  else if(chordName.includes("m7(♭5)"))
		  s = 82;
	  else if(chordName.includes("7"))
		  s = 80;
	  else if(chordName.includes("m"))
		  s = 60;
	  else if(chordName.includes("dim"))
		  s = 88;
	  else if(chordName.includes("aug"))
		  s = 78;

	  let l = 50;
		  if(chordName.includes("/3"))
			  l = 75;
		  else if(chordName.includes("/5"))
			l = 68;
		  else if (chordName.includes("/2"))
			  l = 65;
		  else if (chordName.includes("/♭7"))
			  l = 60;
		  else if (chordName.includes("/7"))
			  l = 55;

	  document.body.style.backgroundColor = `hsl(${h}, ${s}%, ${l}%)`;
								 
  });

  // ページが読み込まれたら再生を開始する
  /*player.on('mediaReady', function () {
    player.play();
  });*/

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
player.add(new Songle.Plugin.Chorus());
/*player.on("ready",
  function()
  {
    player.seekToPrevChorusSection();
  });*/
	var seekToPrevChorusSectionButton = document.querySelector('button.seekToPrevChorusSection');
  seekToPrevChorusSectionnButton.addEventListener('click', function () {
    player.seekToPrevChorusSection();
  });

  // 停止ボタンで再生を停止する
  var pauseButton = document.querySelector('button.pause');
  pauseButton.addEventListener('click', function () {
    player.pause();
  });


  // 再生時刻を定期的に更新する
  var span = document.querySelector('span.time');
  setInterval(function () {
    while (span.childNodes.length > 0) span.removeChild(span.childNodes[0]);
    var textNode = document.createTextNode(parseInt(player.positionTime));
    span.appendChild(textNode);
  }, 100);
	
}
