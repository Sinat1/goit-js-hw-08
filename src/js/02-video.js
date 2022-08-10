import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const throttle = require('lodash.throttle');
const TIME_KEY = 'videoplayer-current-time';

const onTimeUpdate = data => {
  const time = data.seconds;
  localStorage.setItem(TIME_KEY, time);
};

player.on('timeupdate', throttle(onTimeUpdate, 1000));

const pause = localStorage.getItem(TIME_KEY);

player.setCurrentTime(pause);
