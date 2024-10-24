import { useCallback, useEffect, useState } from 'react';
import { Player, SourceDescription } from 'theoplayer';
import './App.css';

import { THEOplayerView } from './player/THEOplayerView';

const license = '<insert license>';

const players: Player[] = [];

(window as any).players = players

const sources: SourceDescription[] = [
    {
        'sources': {
            'src': 'https://ll-hls-test.cdn-apple.com/llhls4/ll-hls-test-04/multi.m3u8',
            'type': 'application/x-mpegurl'
        }
    },
    {
        'sources': {
            'src': 'https://demo.unified-streaming.com/k8s/live/stable/live.isml/.m3u8',
            'type': 'application/x-mpegurl'
        }
    },{
        'sources': {
            'src': 'https://demo.unified-streaming.com/k8s/live/stable/scte35.isml/.m3u8',
            'type': 'application/x-mpegurl'
        }
    }
];

setInterval(() => {
    for (const player of players) {
        // progress the player's currentTime while it's paused
        if (player.paused && player.seekable.length > 0) {
            player.currentTime = player.seekable.end(player.seekable.length - 1);
        }
    }
}, 500);

function App() {
    const [activeSourceId, setActiveSourceId] = useState(0);

    const currentPlayer = activeSourceId % 3;

    console.log(`currentPlayer:${currentPlayer}`)

    const onPlayer = useCallback((player: Player): void => {
        const initialSourceId = players.length
        players.push(player);
        player.preload = 'auto';
        player.source = sources[initialSourceId];
        if (initialSourceId === 0) {
            player.autoplay = true;
        }
    }, []);

    const nextSource = () => {
        setActiveSourceId(activeSourceId + 1);
    }

    useEffect(() => {
        if (players.length !== 3) {
            return;
        }
        for (let i = 0; i < 3; i++) {
            if (i === currentPlayer) {
                players[i].autoplay = true;
            } else {
                players[i].pause();
            }
        }
    }, [activeSourceId]);

    return (
        <div className="App">
            <button onClick={nextSource}>Next source</button>
            <div style={{ display: currentPlayer === 0 ? '' : 'none' }}>
                <THEOplayerView onPlayerCreated={onPlayer} license={license} />
            </div>
            <div style={{ display: currentPlayer === 1 ? '' : 'none' }}>
                <THEOplayerView onPlayerCreated={onPlayer} license={license} />
            </div>
            <div style={{ display: currentPlayer === 2 ? '' : 'none' }}>
                <THEOplayerView onPlayerCreated={onPlayer} license={license} />
            </div>
        </div>
    );
}

export default App;
