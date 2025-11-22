function onSongleAPIReady(Songle){
	
  var player = new Songle.Player({
      accessToken: '00000144-8PDPBsb' // アクセストークン
	//mediaElement: "#songle"
  });

	const player =
  new window.Songle.Player({
    mediaElement: "#songle"
  });

player.on("ready",
  function(ev) {
    player.play();
  });

  player.addPlugin(new Songle.Plugin.SongleSync());
　//player.useMedia("https://www.youtube.com/watch?v=mTMs1S5td74");

let syncMode = false;

//和音
player.addPlugin(new Songle.Plugin.Chord());

player.on("chordEnter",
  function(ev) {
	if (!syncMode) return;
     //do someting ...
	const chordName = ev.data.chord.name;
	let color = "white";
	document.body.style.backgroundColor {
		
		if (chordName.startsWith("C")){
		color = "hsl(20,85%,60%)";
		}
	}
	
  });


//同期ボタン
const syncButton = document.querySelector('button.synchronize');
  syncButton.addEventListener('click', () => {
	
	syncMode = true;
	//player.addPlugin(new Songle.Plugin.Chord());

    console.log("同期開始！");
  });



//停止
const stopButton = document.querySelector('button.stop');
  stopButton.addEventListener('click', () => {
    document.body.style.backgroundColor ="white";
　　syncMode = false;
  });

//ボタンでの切り替え



const buttons = document.querySelectorAll('button[data-color]');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
	syncMode = false;
    const color = btn.dataset.color; // data-color属性を取る
    document.body.style.backgroundColor = color;
  });
});

  
}
