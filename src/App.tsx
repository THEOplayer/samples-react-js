import { useCallback } from 'react';
import { Player } from 'theoplayer';
import './App.css';

import { THEOplayerView } from './player/THEOplayerView';

const license = '<insert license>';

function App() {
    const onPlayer = useCallback((player: Player): void => {
        console.log('onPlayer, loading and setting source');

        player.muted = true;
        player.autoplay = true;
        player.source = {
            sources: [
                {
                    src: '//dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd',
                    type: 'application/dash+xml',
                },
            ],
        };
    }, []);

    return (
        <div className="App">
            <THEOplayerView onPlayer={onPlayer} license={license} />
        </div>
    );
}

export default App;
