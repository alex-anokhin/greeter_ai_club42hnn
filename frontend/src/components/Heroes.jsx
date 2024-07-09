import Elsa from './img/elsa.jpeg';
import Rapunzel from './img/rapunzel.jpeg';
import Shrek from './img/shrek.jpeg';
import SpiderMan from './img/spiderman.jpeg';
import Thor from './img/thor.jpeg';

import ElsaVideo from './hero_intro/elsa.mp4';
import RapunzelVideo from './hero_intro/rapunzel.mp4';
import ShrekVideo from './hero_intro/shrek.mp4';
import SpiderManVideo from './hero_intro/spiderman.mp4';
import ThorVideo from './hero_intro/thor.mp4';

const Heroes = [
  {
    id: 1,
    name: 'Elsa',
    image: Elsa,
    video: ElsaVideo,
    voice: 'Elsa.m4a',
    phrases: [
      "Get ready, icy magic in action!",
      "It's going to be cold soon!",
      "My crown is in place!",
      "Time to freeze the scene!",
      "Icy gaze ready!"
    ]
  },
  {
    id: 2,
    name: 'Rapunzel',
    image: Rapunzel,
    video: RapunzelVideo,
    voice: 'Rapunzel.wav',
    phrases: [
      "Braiding hair for the shoot!",
      "Brushes in hand, paints in place!",
      "Time for adventures!",
      "Hair is done, I'm ready!",
      "Camera, action, my braids are ready!"
    ]
  },
  {
    id: 3,
    name: 'Shrek',
    image: Shrek,
    video: ShrekVideo,
    voice: 'Shrek.wav',
    phrases: [
      "Green is the new black!",
      "Ready for the swamp!",
      "My onion armor is in place!",
      "Time for ogre magic!",
      "Ready to scare like never before!"
    ]
  },
  {
    id: 4,
    name: 'SpiderMan',
    image: SpiderMan,
    video: SpiderManVideo,
    voice: 'Spiderman.wav',
    phrases: [
      "Web is ready for action!",
      "Spidey senses on maximum!",
      "Suit fits perfectly!",
      "Time for spider tricks!",
      "Ready to soar on the web!"
    ]
  },
  {
    id: 5,
    name: 'Thor',
    image: Thor,
    video: ThorVideo,
    voice: 'Thor.wav',
    phrases: [
      "Mjolnir in hand, thunder roars!",
      "Viking strength ready!",
      "Lightning ready to strike!",
      "Thunder god on stage!",
      "Asgard awaits my magic!"
    ]
  }
];

export default Heroes;
