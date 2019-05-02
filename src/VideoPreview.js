import React from 'react';
import video from './BackgroundRaw.mp4'
// import animation from './animation.js'
// import {BarGraph} from './canvas-anim-v4.js'
import anim_style from './animation.css'

class VideoPreview extends React.Component {
    componentDidMount() {
        
        //loop video to match rendered video length
        // var renderedDemo = document.getElementById("rendered_demo");
        // var myVideo = document.getElementById ("backgroundRaw");        
        // myVideo.ontimeupdate = function () {            
        //     //duration is not the most accurate.  to improve, could
        //     //look into setting up a precision timer representative
        //     //of frame counts. 
        //     if (myVideo.currentTime > renderedDemo.duration) {
        //         myVideo.currentTime = 0;
        //         myVideo.play ();
        //     }
            
        // }
        
        // //add event listener for window resize
        var display_area = document.getElementById("preview_area");
        // window.addEventListener('resize', this.updateDimensions.bind(this, 'canvas'));

        document.fonts.ready.then(() => {
            // for some reason, we need to wait a little longer still...
            window.setTimeout(() => {
                // this.createCanvasOverlay('rgba(0,0,0,0)', display_area, 'canvas');
                // let myCanvas = document.getElementById('canvas');
                // let context = myCanvas.getContext('2d');
                // BarGraph(context);
                // document.getElementById("overlay").style.display = "block";

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
    
        canvasContainer.appendChild(myCanvas);


        
   }

    render() 
    {
        
        return (
            <div className="lefts-border-line manufacturer-panel">
            {/* <div class="move-me move-me-1">steps(4, end)</div> */}
                <h1 className="manufacturer-title">
                    Video Preview
                </h1>
                <hr/>
                <div className="video-container">
                    <div id='preview_area' className="aspect-ratio-fixer">
                        <div className="use-aspect-ratio">
                            <div className="overlay">
                            <div className="move-me move-me-1" >steps(4, end)</div>
                            <link rel="stylesheet" type="text/css" href={anim_style}/>

                            </div> 
                        {/* <video id='backgroundRaw' controls autoPlay>
                                <source src={video}/>
                            </video>       */}
                        </div>
                    </div>
                </div>
            </div>

        );
        

    }
}

export default VideoPreview;
