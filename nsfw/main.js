

function goFullscreen() {

	const element = document.documentElement;

	if (element.requestFullscreen) {
		element.requestFullscreen();

	} else if (element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();

	} else if (element.msRequestFullscreen) {
		element.msRequestFullscreen();
	}
}

function insertScript(source, external = false) {

	const script = document.createElement("script");
 
	if (external) {
		script.src = source;
	} else {
		script.textContent = source;
	}
 
	document.body.appendChild(script);
}


function loadBSOD() {
	document.body.innerHTML = `

<style>
@font-face {
	font-family: "Segoe UI";
	src:
		local("Segoe UI Semilight"),
		url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff2) format("woff2"),
		url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.woff) format("woff"),
		url(https://c.s-microsoft.com/static/fonts/segoe-ui/west-european/semilight/latest.ttf) format("truetype");
	font-weight: 300;
}



html {	
	height: 100%;
	width: 100vw;

	margin: 0;
	padding: 0;

	cursor: none;
}

main h1 {
	font-weight: 300;
}

body {
	font-family: "Segoe UI";
	font-size: 20px;
	color: #ffffff;
	background: #0079d3;
	margin: 0;


	user-select: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;

	-webkit-touch-callout: none;
	-webkit-user-drag: none;
}

main {
	margin: 5% 8%;
	margin-right: 30%;
}

#emotion {
	font-size: 12em;
	margin: 0;
}

#description {
	font-size: 2em;
	margin-bottom: 3em;
}

main footer small {
	font-size: 1em;
	margin-top: 4em;
	margin-bottom: 4em;
}

main footer {
	display: flex;
	align-items: flex-start;
	gap: 1em;
	margin-top: 5em;
}

#qrcode {

	margin-right: 1em;

	width: 7em;
	height: 7em;
}
</style>

<main>

	<div id="bsod">

		<header>
			<h1 id="emotion">:(</h1>
		</header>

		<div id="description">
			Your PC ran into problems and needs to restart. We're just collecting some error info, and then we'll restart for you
			<p>
				<span id="progress">0</span>% complete
			</p>
		</div>
	
		
		<footer>
			<div id="qrcode"></div>

			<div>

				<p>
					<small>
						For more information about this issue and possible fixes, visit https://windows.com/stopcode
						<br>
						<br>
						<br>
						If you call a support person, give them this info:
						<br>
						Stop code: CRITICAL_PROCESS_DIED
					</small>
				</p>

			</div>

		</footer>
	<div>

</main>
`;
	insertScript("https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js", true);
	insertScript(`
function disableInteractions() {
	document.onselectstart = () => false;
	document.oncontextmenu = () => false;
}

function loadQRCode() {
	QRCode.toString("https://www.youtube.com/watch?v=dQw4w9WgXcQ", { 
			type: "svg",
			width: 150,
			color: {
				dark: "#106faa",
				light: "#ffffff",
			},
			errorCorrectionLevel: "H"
		},
		(err, svg) => {
			if (err) console.error(err);
			document.getElementById("qrcode").innerHTML = svg;
		}
	);
}

function beep() {

	const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

	const osc = audioCtx.createOscillator();
	osc.type = "square";
	osc.frequency.setValueAtTime(800, audioCtx.currentTime);

	const gain = audioCtx.createGain();
	gain.gain.setValueAtTime(0.2, audioCtx.currentTime);

	osc.connect(gain);
	gain.connect(audioCtx.destination);

	osc.start();
}

function startProgess() {

	let progress = 0;
	const progressElement = document.getElementById("progress");

	const interval = setInterval(
		() => {

			if (progress < 100) {
				progress++;
				progressElement.textContent = progress;

			} else {
				clearInterval(interval);
			}
		}, 
		1500
	);
}
`);

	const QRCodeScript = document.createElement("script");
	QRCodeScript.src = "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";
	QRCodeScript.onload = () => {
		insertScript(`
			disableInteractions();
			beep();
			startProgess();
			loadQRCode();
		`);
	};
	document.body.appendChild(QRCodeScript);

}














const EVENTS = [
	// "mousemove",
	"click",
	//"mousedown",
	//"dblclick",
	//"keydown",

	//"touchstart",
	//"touchmove",

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




	const video = document.getElementById("rick");

	video.style.display = "block";
	firstClick = false;

	video.play();


	goFullscreen();

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
