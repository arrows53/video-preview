import React from 'react';

import VideoData from './VideoData';
import video from './BackgroundRaw.mp4'

import {drawBars} from './canvas-anim.js'


class VideoPreview extends React.Component {
    componentDidMount() {
        
        //loop video to match rendered video length
        var renderedDemo = document.getElementById("rendered_demo");
        var myVideo = document.getElementById ("backgroundRaw");        
        myVideo.ontimeupdate = function () {            
            //duration is not the most accurate.  to improve, could
            //look into setting up a precision timer representative
            //of frame counts. 
            if (myVideo.currentTime > renderedDemo.duration) {
                myVideo.currentTime = 0;
                myVideo.play ();
            }
            
        }
        
        // //add event listener for window resize
        var display_area = document.getElementById("preview_area");
        window.addEventListener('resize', this.updateDimensions.bind(this, 'canvas'));

        var barData = [ { time_start:10, 
            time_end:40, 
            time_out:160, 
            speed_multiple:4,
            h_position:0,
            x_number:13,
            y_number:47},        

            { time_start:204, 
            time_end:230, 
            time_out:400, 
            speed_multiple:4,
            h_position:0,
            x_number:13,
            y_number:67}];


        document.fonts.ready.then(() => {
            // for some reason, we need to wait a little longer still...
            window.setTimeout(() => {

                this.createCanvasOverlay('rgba(0,0,0,0)', display_area, 'canvas');
                drawBars();
            }, 200);

        });
            
    }
    
    //    update the overlay canvas to accommodate resizing
    updateDimensions(canvas_id){
        var myCanvas = document.getElementById(canvas_id);
        myCanvas.style.height = "0px";
        myCanvas.style.height = myCanvas.superContainer.scrollHeight-20+"px";
        myCanvas.style.width = "0px";            
        myCanvas.style.width = myCanvas.superContainer.scrollWidth+"px";

    }

    createCanvasOverlay(color, canvasContainer, canvas_name)
    {
        //create canvas and set basic properties
        var myCanvas = document.createElement('canvas');
        myCanvas.id = canvas_name;
        myCanvas.superContainer = canvasContainer;
        
        //sizing
        myCanvas.style.width = canvasContainer.scrollWidth+"px";
        myCanvas.style.height = canvasContainer.scrollHeight+"px";
        myCanvas.style.overflow = 'visible';
        myCanvas.style.position = 'relative';

        //content
        // var context=myCanvas.getContext('2d');
        // const font_size = 20;
        // const message = "Your preview here!";
        // context.font = `${font_size}px "${VideoData.font}"`;
        // context.fillText(
        //     message,
        //     myCanvas.width / 2 - context.measureText(message).width / 2,
        //     myCanvas.height / 2 - font_size / 2,
        // );
        
        // context.fillStyle = color;
        // context.fillRect(0,0, myCanvas.width, myCanvas.height);
        // // context.globalAlpha = 1;
        // // context.backgroundColor = 'transparent';
        // context.restore()
    
        canvasContainer.globalAlpha=0.5;
        canvasContainer.appendChild(myCanvas);


        
   }

    render() 
    
    {
        
        return (
            <div className="lefts-border-line manufacturer-panel">
                <h1 className="manufacturer-title">
                    Video Preview
                </h1>
                <hr/>
                <div className="video-container">
                    <div id='preview_area' className="aspect-ratio-fixer">
                        <div className="use-aspect-ratio">
                        <video id='backgroundRaw' controls autoPlay>
                                <source src={video}/>
                            </video>      
                        </div>
                    </div>
                </div>
            </div>

        );


    }
}

export default VideoPreview;
