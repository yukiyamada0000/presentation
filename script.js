'use strict'

let slot_frame = document.getElementById("slot-frame");
let reel = document.getElementsByClassName("reel");
let reels = document.getElementsByClassName("reels");
let start_btn = document.getElementById("start-btn");
let stop_btn = document.getElementsByClassName("stop-btn");

let sec = 40;      
let stopReelFlag = []; 
let reelCounts = [];
let slotFrameHeight;    
let slotReelsHeight;
let slotReelItemHeight; 
let slotReelStartHeight;
let Slot = {
    init: function() {  
      stopReelFlag[0] = stopReelFlag[1] = stopReelFlag[2] = false;

      reelCounts[0] = reelCounts[1] = reelCounts[2] = 0;

    },
    start: function () { 
      Slot.init();
      for (let index = 0; index < 3; index++) {
        Slot.animation(index); //スロット３つ動かす
      }
    },
    stop: function (i) {
      stopReelFlag[i] = true;  
      if (stopReelFlag[0] && stopReelFlag[1] && stopReelFlag[2]) {
        start_btn.removeAttribute("disabled"); 
      }
    },
    resetLocationInfo: function () { 
      slotFrameHeight = slot_frame.offsetHeight;

      slotReelsHeight = reels[0].offsetHeight;

      slotReelItemHeight = reel[0].offsetHeight;

      slotReelStartHeight = -slotReelsHeight; 
      slotReelStartHeight = slotReelStartHeight + slotFrameHeight

                             - (slotFrameHeight / 2) + slotReelItemHeight * 3 / 2;

      for (let i = 0; i < reels.length; i++){
        reels[i].style.top = String(slotReelStartHeight) + "px";
      }
    },
    animation: function (index) { //スロットを動かす
      if (reelCounts[index] >= 8) {
        reelCounts[index] = 0;
      }

      $('.reels').eq(index).animate({
        'top': slotReelStartHeight + (reelCounts[index] * slotReelItemHeight)

      },{
        duration: sec, 
        easing: 'linear', 
        complete: function () {
          if (stopReelFlag[index]) { 
            return;
          }
          reelCounts[index]++;
          Slot.animation(index);
        }
      });
    },
  };
  
  window.onload = function () {
    Slot.init();
    Slot.resetLocationInfo();
    start_btn.addEventListener("click", function(e){
      e.target.setAttribute("disabled", true)    
      Slot.start();
      for(let i = 0; i < stop_btn.length; i++){
        stop_btn[i].removeAttribute("disabled");
      }
    });
    for(let i = 0; i < stop_btn.length ; i++ ){
      stop_btn[i].addEventListener("click", function (e) {
        Slot.stop(e.target.getAttribute('data-val'));
      })
    }
  };
