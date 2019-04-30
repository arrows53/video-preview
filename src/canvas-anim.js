import VideoData from './VideoData';

var requestAnimationFrame = window.requestAnimationFrame || 
window.mozRequestAnimationFrame || 
window.webkitRequestAnimationFrame || 
window.msRequestAnimationFrame;
var current_time = 1;


export function drawBars() {
    timer();

    drawBar();
    requestAnimationFrame(drawBars);
    // console.log(barData);
}

function drawBar(){

    var barData = [ { time_start:10, 
        time_end:40, 
        time_out:160, 
        speed_multiple:4,
        h_position:0,
        x_number:13,
        y_number:90},        

        { time_start:204, 
        time_end:230, 
        time_out:400, 
        speed_multiple:4,
        h_position:0,
        x_number:13,
        y_number:67}];
    
    for (let i = 0; i < 2; i++){
    if (i === 0){    
    var myCanvas = document.getElementById('testCanvas');
    }
    if (i === 1){
    var myCanvas = document.getElementById('testCanvas1');
    }
    var mainContext = myCanvas.getContext("2d");
    var color = String(VideoData.text_background_color);
    var thickness = 13.5;
    var rectangles = [];
        
    mainContext.clearRect(0, 0,500, 500);//
    
        // console.log(barData.time_start);

        let time_start = barData[i].time_start;
        let time_end = barData[i].time_end;
        let time_out = barData[i].time_out;
        let speed_multiple = barData[i].speed_multiple;
        let h_position = barData[i].h_position;
        let x_number = barData[i].x_number;
        let y_number = barData[i].y_number;

        
        if (current_time > time_start){
            if (current_time < time_end){
                let standard_speed = current_time-time_start;
                h_position = standard_speed*speed_multiple;
            }
    
            mainContext.rect(x_number, y_number, h_position, thickness);
            
            // color in the bar
            mainContext.fillStyle = "rgba("+color+")";
            mainContext.fill();
        }
        
        if (current_time > time_out){
                mainContext.clearRect(0,0,500,500);
                //mainContext.rect(0, 0, 0, 0);
            }
        }
}


function timer() {
    current_time +=1;
}
