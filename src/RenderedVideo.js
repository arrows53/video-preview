/* 3RD PARTY */
import React from 'react';

/* ASSETS */
import video from './RenderedDemo.mp4'

class RenderedVideo extends React.Component {
    componentDidMount () {
        console.log('ok')
        this.check = 'ok'
    }
    
    
    render() {
        return (
            <div className="right-border-line manufacturer-panel">
                <h1 className="manufacturer-title">Rendered Video</h1>
                <hr/>
                <div className="video-container">
                    <div className="aspect-ratio-fixer">
                        <div className="use-aspect-ratio">
                            <video controls autoPlay loop>
                                <source id="RenderedVideo" src={video} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RenderedVideo;
