/* eslint-env worker */

import { DemoGame } from '../demo/game'

var game = new DemoGame(self)

self.addEventListener('message', game.onMessage.bind(game))

// TODO: onTerminate?
