import VideoData from './VideoData';

var rectangles = [];
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

function Rectangle(x_pos, y_pos, speed, reveal_start, reveal_end, 
                    scrub_start, scrub_end) {
    
                        this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.height = 14;
    this.speed = speed;
    this.time_flip = 1;
    this.color = String(VideoData.text_background_color);
    this.reveal_start = reveal_start;
    this.reveal_end = reveal_end;
    this.scrub_start = scrub_start;
    this.scrub_end = scrub_end;
    this.current_width = 0;
  }
  
Rectangle.prototype.update = function(mainContext, counter) {
    
  let width = 0;
    if (this.reveal_start < counter/1000 && counter/1000 <  this.reveal_end ){
            if (counter/1000 < 2.5){
            console.log(this);
            }

            width += Math.round((counter/1000-this.reveal_start)*60);
            mainContext.rect(this.x_pos, this.y_pos, width, this.height);
            mainContext.fillStyle = "rgba("+this.color+")";
            mainContext.fill();
        
          } 

  };

export function drawBars() {
    var counter = 0;
    
    for (var i = 0; i < barData.length; i++) { 
      var rectangle = new Rectangle(  
        barData[i].x_pos, 
        barData[i].y_pos, 
        1, 
        barData[i].reveal_start,
        barData[i].reveal_end,
        barData[i].scrub_start,
        barData[i].scrub_end);
        
        rectangles.push(rectangle);
      }
      draw(counter);
    }
    
    function draw(counter) {
      var mainCanvas = document.getElementById("canvas");
      var mainContext = mainCanvas.getContext('2d');
      
      counter += 1;
      mainContext.clearRect(0, 0, 500, 500);

      rectangles[0].update(mainContext, counter);
      rectangles[1].update(mainContext, counter);

  requestAnimationFrame(draw);
}