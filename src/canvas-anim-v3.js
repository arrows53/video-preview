import VideoData from './VideoData';

var rectangles = [];

var barData = [ {   reveal_start:.3, 
                    reveal_end:1,
                    scrub_start:3,
                    scrub_end:4,
                    width:20, 
 
                    
                    h_position:0,
                    x_number:13,
                    y_number:47},        

                    { 
                    reveal_start:1, 
                    reveal_end:1.2, 
                    scrub_start:4,
                    scrub_end:4.5,
                    width:14,

                    h_position:0,
                    x_number:13,
                    y_number:67}];

function Rectangle(x_pos, y_pos, width, speed, reveal_start, reveal_end, 
                    scrub_start, scrub_end) {
    
                        this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.width = width;
    this.height = 13.5;
    this.speed = speed;
    this.counter = 0;
    this.return_counter = 0;
    this.time_flip = 1;
    this.color = String(VideoData.text_background_color);
    this.reveal_start = reveal_start;
    this.reveal_end = reveal_end;
    this.scrub_start = scrub_start;
    this.scrub_end = scrub_end;
    this.current_width = 0;
  }
  
Rectangle.prototype.update = function() {
    var canvas = document.getElementById('canvas'),
    mainContext = canvas.getContext('2d');

    this.counter += 1;//this.time_flip * this.speed;  
    // console.log(this.counter)
    // this.current_width = this.width
    //
    // console.log(this.counter/60)
    if (this.counter/60 > this.reveal_start){
        if (this.counter/60 < this.reveal_end){
            this.current_width += this.counter/60*this.speed;
            }
        
        // console.log(this.counter/60)
        if (this.counter/60 > this.scrub_start){
            // console.log('yup')
            this.current_width = this.return_counter;
        }   

        mainContext.rect(   this.x_pos, 
                        this.y_pos, 
                        this.current_width, 
                        this.height);
    
        mainContext.fillStyle = "rgba("+this.color+")";
        mainContext.fill();      

        }

    

  };

export function drawBars() {
    for (var i = 0; i < barData.length; i++) {
        var rectangle = new Rectangle(  14, 
                                        i*20, 
                                        20, 
                                        1, 
                                        barData[i].reveal_start,
                                        barData[i].reveal_end,
                                        barData[i].scrub_start,
                                        barData[i].scrub_end);
    
    rectangles.push(rectangle);
  }
  draw();
}

function draw() {
    var mainCanvas = document.getElementById("canvas");
    var mainContext = mainCanvas.getContext('2d');
    
    mainContext.clearRect(0, 0, 500, 500);

  for (var i = 0; i < rectangles.length; i++) {
    var myRectangle = rectangles[i];
    myRectangle.update();
  }
  requestAnimationFrame(draw);
}