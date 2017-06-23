import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Hls from 'hls.js';
import { ensureAbs } from 'shared/utils/uri';

class Player extends PureComponent {
    componentDidMount() {
        this.play();
    }

    componentWillUnmount() {
        if (this.hls) {
            this.hls.destroy();
        }
    }

    checkStream() {
        return this.props.src.search(/.m3u8$/) !== -1;
    }

    play() {
        const isStream = this.checkStream();

        if (isStream && Hls.isSupported()) {
            if (!this.hls) {
                this.hls = new Hls();
            }

            this.hls.loadSource(this.props.src);
            this.hls.attachMedia(this.video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => this.video.play());
        } else {
            this.video.src = this.props.src;
            this.video.play();
        }
    }

    render() {
        return (
            <video
                ref={(el) => { this.video = el; }}
                id="videoStream"
                style={{ width: '100%', height: '100%' }}
                controls
            />
        );
    }
}

Player.propTypes = {
    src: PropTypes.string,
};

export default Player;
