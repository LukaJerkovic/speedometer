let startTime, endTime;
let imageSize = '';
let image = new Image();
let bitSpeed = document.getElementById('bits'),
  kbSpeed = document.getElementById('kbs'),
  mbSpeed = document.getElementById('mbs'),
  info = document.getElementById('info');

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 1;
let testCompleted = 0;

let imageApi = `https://source.unsplash.com/random?topic=nature&_=${new Date().getTime()}`;

image.onload = async function () {
  endTime = new Date().getTime();
  await fetch(imageApi).then((response) => {
    imageSize = response.headers.get('content-length');
    calculateSpeed();
  });
};

function calculateSpeed() {
  let timeDuration = (endTime - startTime) / 1000;
  let loadedBits = imageSize * 8;
  let speedInBts = loadedBits / timeDuration;
  let speedInKbs = speedInBts / 1024;
  let speedInMbs = speedInKbs / 1024;

  totalBitSpeed += speedInBts;
  totalKbSpeed += speedInKbs;
  totalMbSpeed += speedInMbs;

  testCompleted++;

  if (testCompleted === numTests) {
    let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
    let averageSpeedInKbs = (totalKbSpeed / numTests).toFixed(2);
    let averageSpeedInMps = (totalMbSpeed / numTests).toFixed(2);

    bitSpeed.innerHTML += `${averageSpeedInBps}`;
    kbSpeed.innerHTML += `${averageSpeedInKbs}`;
    mbSpeed.innerHTML += `${averageSpeedInMps}`;
    info.innerHTML = 'Test Completed!';
  } else {
    startTime = new Date().getTime();
    image.src = imageApi;
  }
}

const runSpeedTest = async () => {
  info.innerHTML = 'Testing...';

  mbSpeed.innerHTML = '<span>Speed in Mbps: </span>';
  kbSpeed.innerHTML = '<span>Speed in Kbps: </span>';
  bitSpeed.innerHTML = '<span>Speed in Bit: </span>';

  startTime = new Date().getTime();
  image.src = imageApi;
  testCompleted = 0;
};
