function onSongleAPIReady(Songle){
	
  var splayer = new Songle.Player({
      accessToken: '00000144-8PDPBsb' // アクセストークン
	  //mediaElement: "#songle"
  });

	/*const player =
  new window.Songle.Player({
    mediaElement: "#songle"
  });*/

/*splayer.on("ready",
  function(ev) {
    splayer.play();
  });*/

  splayer.addPlugin(new Songle.Plugin.SongleSync());
	//player.useMedia("https://www.youtube.com/watch?v=mTMs1S5td74");
 splayer.addPlugin(new Songle.Plugin.Chord());
let syncMode = false;

//和音


splayer.on("chordEnter",
  function(ev) {
	if (!syncMode) return;
     //do someting ...
	const chordName = ev.data.chord.name;
	let color = "white";
		if (chordName.startsWith("C")){
		color = "hsl(20,85%,60%)";
		} else if (chordName.startsWith("G")) {
		    color = "hsl(40, 80%, 60%)";
		  } else if (chordName.startsWith("F")) {
		    color = "hsl(50, 80%, 55%)";
		  } else if (chordName.startsWith("Am")) {
		    color = "hsl(200, 70%, 45%)";
		  } else if (chordName.startsWith("Dm")) {
		    color = "hsl(180, 65%, 43%)";
		  } else if (chordName.startsWith("Em")) {
		    color = "hsl(220, 70%, 47%)";
		  }

	  
	document.body.style.backgroundColor = color;
	
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
