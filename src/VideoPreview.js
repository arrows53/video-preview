import React from 'react';

// import VideoData from './VideoData';
import AnimationData from './AnimationData'
import * as PIXI from 'pixi.js';
import BackgroundRaw from './BackgroundRaw.mp4'

class VideoPreview extends React.Component {
    componentDidMount() {
        //start timer
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);       

        const app = new PIXI.Application({
            width: this.refs.canvas.width, 
            height: this.refs.canvas.height, 
            transparent:true,
            resolution: window.devicePixelRatio || 1, 
            view: this.refs.canvas
        });

        //add raw video
        const texture = PIXI.Texture.from(BackgroundRaw);
        const videoSprite = new PIXI.Sprite(texture);
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;
        app.stage.addChild(videoSprite);


        // console.log(AnimationData.text[0]);

        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 2,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        const richText = new PIXI.Text('Rich text with a lot of options\nand across multiple lines', style);
        richText.x = 10;
        richText.y = 10;

        app.stage.addChild(richText);


        // run the render loop
        var renderer = PIXI.autoDetectRenderer({ antialias: true });
        var stage = new PIXI.Container();
        var count = 0;
        
        var thing = new PIXI.Graphics();
        app.stage.addChild(thing);
        thing.position.x = 10;
        thing.position.y = 10;        

        animate();
        function animate() {

            thing.clear();

            count += 19;

            thing.clear();
            for (let i =0; i < AnimationData.bars.length; i++){
                let current_bar = AnimationData.bars[i];

                //can't seem to do an  bot < i < top pattern here
                if (current_bar.reveal_start < count && count <  current_bar.reveal_end ){
                    thing.lineStyle(10, 0xff0000, 1);
                    thing.beginFill(0xffFF00, 0.5);
                    thing.moveTo(20,current_bar.x_pos); 
                    thing.lineTo(200,current_bar.x_pos);
                    thing.lineTo(200, (current_bar.x_pos+20));
                    thing.lineTo(20, (current_bar.x_pos+20));
                    thing.endFill();        
                }
            }
            renderer.render(stage);
            requestAnimationFrame( animate );
        }




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
                    <div className="aspect-ratio-fixer">
                        <div className="use-aspect-ratio">
                            {/* <video id="PreviewVideo" src={BackgroundRaw} autoPlay /> */}
                            <canvas ref="canvas" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPreview;
