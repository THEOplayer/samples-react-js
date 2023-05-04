import React from 'react';
import * as THEOplayer from 'theoplayer';
import 'theoplayer/ui.css';
import './THEOplayerWrapper.css';

class Player extends React.Component {
    _player = null;
    _el = React.createRef();

    componentDidMount() {
        // props like the source, or the sourcedesciption as a whole can be passed through
        // the can then be used to be called on the player itself
        const { source, onLoadStart, onPlay } = this.props;

        if (this._el.current) {
            this._player = new THEOplayer.Player(this._el.current, {
                libraryLocation: `${process.env.PUBLIC_URL}/vendor/theoplayer`,
                // TODO Uncomment the line below, and set its value to your THEOplayer license
                // license: 'your_license_string'
            });

            this._player.source = source;
            this._player.preload = 'auto';
            this._player.addEventListener('play', onPlay);
            this._player.addEventListener('loadstart', onLoadStart);
            console.log('---TEST preload', this._player.preload);
            return this._player.preload;
        }
    }

    componentWillUnmount() {
        if (this._player) {
            this._player.destroy();
        }
    }

    render() {
        return (
            <div
                // vjs-16-9 THEOplayer are not necessary, but just added for demo purposes
                className={
                    'theoplayer-container video-js theoplayer-skin vjs-16-9 THEOplayer'
                }
                // The ref prop here is key it returns the actual dom element and not the virtual react dom elements
                // Which is need by the player
                ref={this._el}
            />
        );
    }
}

export default Player;
