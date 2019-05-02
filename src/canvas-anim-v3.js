import VideoData from './VideoData';

var rectangles = [];
var color = String(VideoData.text_background_color);
  
function update(mainContext, counter, barData) {
  for (var i = 0; i < barData.length; i++) { 
    
    let width = 0;
    if(counter/1000 <  barData[i].reveal_end ){
      if (barData[i].reveal_start < counter/1000){
              width += Math.round((counter/1000-barData[i].reveal_start)*60);
              mainContext.rect(barData[i].x_pos, barData[i].y_pos, width, 14);
              mainContext.fillStyle = "rgba("+color+")";
              mainContext.fill();
          
            } 
        }
      }
  };

export function drawBars() {
    var counter = 0;
      draw(counter);
    }
    
    function draw(counter) {
      var mainCanvas = document.getElementById("canvas");
      var mainContext = mainCanvas.getContext('2d');
      
      counter += 1;
      mainContext.clearRect(0, 0, 500, 500);

      var barData = [ {   reveal_start:1, 
        reveal_end:1.6,
        scrub_start:6,
        scrub_end:7,
        width:20, 

        
        h_position:0,
        x_pos:13,
        y_pos:47},        

        { 
        reveal_start:2, 
        reveal_end:3, 
        scrub_start:10,
        scrub_end:12,
        width:14,

        h_position:0,
        x_pos:13,
        y_pos:67}];

 
      update(mainContext, counter, barData)
      // rectangles[0].update(mainContext, counter);
      // rectangles[1].update(mainContext, counter);

  requestAnimationFrame(draw);
}