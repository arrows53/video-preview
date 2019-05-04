import React from 'react';

// import VideoData from './VideoData';
import AnimationData from './AnimationData'
import * as PIXI from 'pixi.js'
import BackgroundRaw from './BackgroundRaw.mp4'
import VideoData from './VideoData'
// import * as MS from 'pixi-multistyle-text'

class VideoPreview extends React.Component {
    componentDidMount() {
        //start timer
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);       

        const app = new PIXI.Application({
            width: 1920, 
            height: 1080, 
            transparent:true,
            resolution: window.devicePixelRatio || 1, 
            view: this.refs.canvas
        });

        //Bar colors - normalize and convert to hex 
        var rgb = VideoData.text_background_color;
        var rgb_n = [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]/255]
        var color = PIXI.utils.rgb2hex(rgb_n); 

        rgb = VideoData.highlight_color;
        rgb_n = [rgb[0]/255, rgb[1]/255, rgb[2]/255, rgb[3]/255]
        var text_highlight_color = PIXI.utils.rgb2hex(rgb_n);
        var text_color = PIXI.utils.rgb2hex([1,1,1,0]);


        //video setup
        var texture = PIXI.Texture.from(BackgroundRaw);
        var videoSprite = new PIXI.Sprite(texture);
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;
        videoSprite.resolution = 1920;        
        app.stage.addChild(videoSprite);


        //text setup
        function MakeWhitespace(text, StartIndex, EndIndex){
            let whitespace = " "
            for (let i = StartIndex; i < EndIndex; i++){
                whitespace += "   "
            }
            return text.substr(0, StartIndex) + whitespace + text.substr(EndIndex);
        }



        const style = new PIXI.TextStyle({
            fontFamily: VideoData.font,
            fontSize: 83,
            // fill: text_color,
            dropShadowColor: 'black',
            dropShadow:true,
            dropShadowDistance:1,
            letterSpacing:1
            
        });
        const highlight_style = new PIXI.TextStyle({
            fontFamily: VideoData.font,
            fontSize: 83,
            // fill: text_highlight_color,
            dropShadowColor: 'black',
            dropShadow:true,
            dropShadowDistance:1,
            letterSpacing:1
        });


        var text_elements = []
        for (let i =0; i < VideoData.text.length; i++){
            text_elements[i] = []

            let indexes = VideoData.text[i].keyword_indexes;
            
            
            let highlight_text = VideoData.text[i].content.substring(0, indexes[1]);
            highlight_text = MakeWhitespace(highlight_text, 0, indexes[0]);
            text_elements[i].push(new PIXI.Text(highlight_text, highlight_style));
            text_elements[i][0].position.y = AnimationData.text[i].y_pos;
            text_elements[i][0].position.x = AnimationData.text[i].highlight_x_pos;
            text_elements[i][0].style.fill = text_highlight_color;
            
            let whitespace_text = MakeWhitespace(VideoData.text[i].content, indexes[0], indexes[1]);
            text_elements[i].push(new PIXI.Text(whitespace_text, style));
            text_elements[i][1].position.y = AnimationData.text[i].y_pos;
            text_elements[i][1].position.x = 88;
            text_elements[i][1].style.fill = text_color;
        }        
        

        // run the render loop
        var renderer = PIXI.autoDetectRenderer(1920,1080,{ antialias: false });
        var stage = new PIXI.Container();
        var count = 0;
        var thing = new PIXI.Graphics();
        var thing_mask = new PIXI.Graphics();

        // PIXI.settings.PRECISION_FRAGMENT = 'highp';

        //The additive value is use to sync the sequence 'frame' length in 
        //VideoData with the counter increments.  This keeps all the elements in
        //time with one another, but for some reason changes between these two values.
         
        var sync_unit = 16.3;
        // var sync_unit = 35;

        app.stage.addChild(thing);       


        animate();
        function animate() {

            thing.clear();
            thing_mask.clear();

            count += sync_unit;

            if (count > VideoData.duration){
                videoSprite.texture.baseTexture.resource.source.currentTime = 0;
                videoSprite.texture.baseTexture.resource.source.play();
                count = 0;
            }
            





            for (let i =0; i < AnimationData.bars.length; i++){
                let current_bar = AnimationData.bars[i];        
                let bar_reveal_duration = current_bar.reveal_end - current_bar.reveal_start;
                let bar_scrub_duration = current_bar.scrub_end - current_bar.scrub_start;                    
                
                //bar animation
                if (count > current_bar.reveal_start){
                    let bar_count = count - current_bar.reveal_start;
                    let bar_reveal_percent = bar_count / bar_reveal_duration;
                    let active_width = bar_reveal_percent*current_bar.width
                    
                    thing.position.x = 80;
                    thing_mask.position.x = 80;
                    
                    if (count < current_bar.reveal_end){
                        active_width = bar_reveal_percent*current_bar.width;
                    }
                    
                    if (count > current_bar.reveal_end){
                        active_width = current_bar.width;
                    }
                    
                    if (count > current_bar.scrub_start){
                        let bar_scrub_percent = (count - current_bar.scrub_start) / bar_scrub_duration;                    
                        // console.log(bar_scrub_percent)
                        active_width = Math.max(((1-bar_scrub_percent)*current_bar.width), 0);
                        thing.position.x += (current_bar.width+thing.position.x) * (bar_scrub_percent*2);
                        thing_mask.position.x += (current_bar.width+thing_mask.position.x) * (bar_scrub_percent*2);
                    }

                    thing.lineStyle(90, String(color), 1);
                    thing.moveTo(0,current_bar.y_pos); 
                    thing.lineTo(active_width, current_bar.y_pos);
                    thing.endFill();        
                    
                    // thing_mask.position.y = 0;

                    thing_mask.lineStyle(90, String(text_highlight_color), 1);
                    thing_mask.moveTo(0,current_bar.y_pos); 
                    thing_mask.lineTo(active_width, current_bar.y_pos);
                    thing_mask.endFill();                            
                    
                    

                }
            }
            for (let i =0; i < VideoData.text.length; i++){
                let current_text = AnimationData.text[i];
                let text_count = Math.max(count - current_text.reveal_start, 0);
                let text_reveal_duration = current_text.reveal_end - current_text.reveal_start;
                let text_reveal_percent = Math.min((text_count / text_reveal_duration), 1);
                
                if (count > AnimationData.text[i].reveal_start){
                    
                    if (count < AnimationData.text[i].reveal_end){
                        text_elements[i][0].alpha = text_reveal_percent;
                        text_elements[i][0].mask = thing_mask;

                        text_elements[i][1].alpha = text_reveal_percent;
                        text_elements[i][1].mask = thing_mask;
                        
                        text_elements[i][0].position.y = AnimationData.text[i].y_pos - ((1-text_reveal_percent)*-5)
                        text_elements[i][1].position.y = AnimationData.text[i].y_pos - ((1-text_reveal_percent)*-5)

                        app.stage.addChild(text_elements[i][0]);
                        app.stage.addChild(text_elements[i][1]);

                    }
                    if (count > AnimationData.text[i].hide){
                        app.stage.removeChild(text_elements[i][0]);
                        app.stage.removeChild(text_elements[i][1]);
                    }
                    
                    
                    
                    
                }
            }        
            
            renderer.render(stage);
            app.stage.addChild(thing_mask);       

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
