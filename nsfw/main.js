
const EVENTS = [
	// "mousemove",
	"click",
	//"mousedown",
	//"dblclick",
	//"keydown",

	"touchstart",
	"touchmove",

	// "scroll",
]

function startBSOD() {


	EVENTS.forEach(
		event => document.removeEventListener(event, startBSOD)
	)

	loadBSOD();

}

function playVideo() {

	EVENTS.forEach(
		event => document.removeEventListener(event, playVideo)
	)

	goFullscreen()

	const video = document.getElementById("rick");

	video.style.display = "block";
	firstClick = false;

	video.play();

	setTimeout(
		() => {
			EVENTS.forEach(
				event => document.addEventListener(event, startBSOD)
			);
		},
		2_000
	);

}


EVENTS.forEach(
	event => document.addEventListener(event, playVideo)
);
