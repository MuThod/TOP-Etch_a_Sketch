const btn = document.querySelector("#setCanvas");
btn.addEventListener("click", () => {
	eraseCanvas();
	const squaresPerSide = Number(document.querySelector("#numSquares").value);
	createCanvas(squaresPerSide);
	canvas.classList.remove("darkening");
});

const canvas = document.querySelector("#canvas");
canvas.addEventListener("click", (e) => {
	e.currentTarget.classList.toggle("darkening"); // Beware: can't use 'this' with arrow function, use 'currentTarget' attribute instead
});

const maxSide = Number(canvas.clientHeight);
const borderThickness = 1; // px
const borderColor = getComputedStyle(canvas).borderColor; // Use 'getComputedStyle' to recover style coming from a css stylesheet

let darkening = true;

function createCanvas(squaresPerSide) {
	document.querySelector("#numSquares").value = squaresPerSide;
	const caseSide = maxSide / squaresPerSide - 2 * borderThickness;
	for (let i = 0; i < squaresPerSide; ++i) {
		const line = document.createElement("div");
		line.style.display = "flex";
		line.style.flexDirection = "row";
		for (let j = 0; j < squaresPerSide; ++j) {
			const square = document.createElement("div");
			square.classList.add("square");
			square.style.cssText = `width: ${ caseSide }px; height: ${ caseSide }px; border: ${ borderThickness }px solid ${ borderColor };`;
			square.addEventListener("mouseover", (e) => {
				if (canvas.classList.contains("darkening")) {
					darken(e);
				}
			});
			square.addEventListener("dblclick", darken);
			line.appendChild(square);
		}
		canvas.appendChild(line);
	}
}

function darken(e) {
	let darkness = Number(getComputedStyle(e.target).getPropertyValue("--darkness")); // Syntax to be used to recover a css variable value
	e.target.style.setProperty("--darkness", darkness + 0.1);
}

function eraseCanvas() {
	while (canvas.children.length) {
		canvas.removeChild(canvas.children[0]);
	}
}

createCanvas(32); // Initial canvas