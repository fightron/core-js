/* eslint-env worker */

import { Game } from '../lib/Game'

var game = new Game(self)

self.addEventListener('message', game.onMessage.bind(game))

// TODO: onTerminate?
