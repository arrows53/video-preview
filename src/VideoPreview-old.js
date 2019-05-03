import React from 'react';

import VideoData from './VideoData';

import BackgroundRaw from './BackgroundRaw.mp4'

import * as PIXI from 'pixi.js';


class VideoPreview extends React.Component {
    componentDidMount() {

        const app = new PIXI.Application({
            width: this.refs.canvas.width, 
            height: this.refs.canvas.height, 
            _backgroundColor: 'rgba(0,0,0,0)', 
            resolution: window.devicePixelRatio || 1, 
            view: this.refs.canvas
        });

        let display_area = document.getElementById("preview-area");
        this.setCanvasAsOverlay('rgba(0,0,0,0)', display_area, 'canvas');
        this.context = this.refs.canvas.getContext('2d');
        console.log(this.context)

        document.fonts.ready.then(() => {
            // for some reason, we need to wait a little longer still...
            
            console.log('888888')
            window.setTimeout(() => {
                // this.beginDraw(this.refs.canvas);

            }, 200);});

    }

    // beginDraw(canvas) {
    //     const ctx = canvas.getContext('2d');
    //     const font_size = 10;
    //     const message = "Your preview here!";
    //     // ctx.font = `${font_size}px "${VideoData.font}"`;
    //     // ctx.fillText(
    //     //     message,
    //     //     canvas.width / 2 - ctx.measureText(message).width / 2,
    //     //     canvas.height / 2 - font_size / 2,
    //     // );
    // }

    setCanvasAsOverlay(color, canvasContainer, canvas_name)
    {
        //create canvas and set basic properties
        this.refs.canvas.id = canvas_name;
        var context = this.refs.canvas.getContext('2d');
        // // console.log(test)
        // // this.refs.canvas.superContainer = canvasContainer;
        // var canvas = document.getElementById('main-canvas');
        // var context = canvas.getContext('2d');
        // console.log('ooo');
        // console.log(context);
        // console.log('ooo');
        //sizing
        this.refs.canvas.style.width = canvasContainer.scrollWidth+"px";
        this.refs.canvas.style.height = canvasContainer.scrollHeight+"px";
        this.refs.canvas.style.overflow = 'visible';
        this.refs.canvas.style.position = 'relative';

        // content
        const font_size = 20;
        const message = "Your preview here!";
        context.font = `${font_size}px "${VideoData.font}"`;
        context.fillText(
            message,
            this.refs.canvas.width / 2 - context.measureText(message).width / 2,
            this.refs.canvas.height / 2 - font_size / 2,
        );
        canvasContainer.appendChild(this.refs.canvas);
   }


    render() {
        return (
            <div className="lefts-border-line manufacturer-panel">
                <h1 className="manufacturer-title">
                    Video Preview
                </h1>
                <hr/>
                <div className="video-container">
                    <div className="aspect-ratio-fixer">
                        <div id="preview-area" className="use-aspect-ratio">
                        <video src={BackgroundRaw} type="video/mp4" autoPlay />
                        <canvas id="main-canvas" ref="canvas"/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPreview;
