function onSongleAPIReady(Songle){
	
  var player = new Songle.Player({
      accessToken: '00000144-8PDPBsb' // アクセストークン
	//mediaElement: "#songle"
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
	//var synchronizeButton = document.querySelector('button.red');
	document.body.style.backgroundColor = "hsl(" + Math.random()*360 + ",90%,60%)";
	
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
