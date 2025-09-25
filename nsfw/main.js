
let firstClick = true;

const video = document.getElementById('rick');

function playVideo() {

	if (firstClick) {
		video.style.display = 'block';
		firstClick = false;
	}

	video.play();
}

[
	'mousemove',
	'click',
	'mousedown',
	'dblclick',
	'keydown',

	'touchstart',
	'touchmove',

	'scroll',
].forEach(
	event => document.addEventListener(event, playVideo)
);
