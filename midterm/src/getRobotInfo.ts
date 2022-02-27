import { info } from './getUserInfo';

export const getRobotInfo = () => {
  return {
    name:
      info.browserLanguage.slice(0, 2) === 'zh'
        ? ['瓦力', '12']
        : info.browserLanguage.slice(0, 2) === 'en'
        ? ['Robo', '5']
        : info.browserLanguage.slice(0, 2) === 'es'
        ? ['Androide', '5']
        : ['🤖️', '1'],
    colorName0: info.scrColorDepth === 24 ? '#f0a3ac' : '#f4ceae',
    colorName1: info.scrPixelDepth === 24 ? '#98cdeb' : '#f0ac7f',
    hairNumber: info.previousSites === 0 ? 3 : 2,
    headColor:
      info.timezone === 5
        ? [0xc8adc4, 47]
        : info.timezone === 6
        ? [0x45b787, 29]
        : info.timezone === 8
        ? [0xe9ddb6, 16]
        : [0xf9e9cd, 8],
    mouthColor:
      info.time > 9 && info.time < 23 ? [0x83cbac, 61] : [0x2e317c, 39],
    hairColor0:
      info.sizeScreenH < 1000 ? [0x71361d, 54] : [0x5bae23, 40],
    hairColor1:
      info.sizeScreenW < 1800 ? [0xf8f4ed, 41] : [0x0eb0c9, 32]
  };
};
