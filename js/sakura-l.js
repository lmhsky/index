var stop, staticx, img = new Image;

function Sakura(x, y, s, r, fn) {
	this.x = x, this.y = y, this.s = s, this.r = r, this.fn = fn
}

function getRandom(option) {
	var ret, random;
	switch (option) {
		case "x":
			ret = Math.random() * window.innerWidth;
			break;
		case "y":
			ret = Math.random() * window.innerHeight;
			break;
		case "s":
			ret = Math.random();
			break;
		case "r":
			ret = 6 * Math.random();
			break;
		case "fnx":
			random = 1 * Math.random() - .5, ret = function(x, y) {
				return x + .5 * random - 1.7
			};
			break;
		case "fny":
			random = 1.5 + .7 * Math.random(), ret = function(x, y) {
				return y + random
			};
			break;
		case "fnr":
			random = .03 * Math.random(), ret = function(r) {
				return r + random
			}
	}
	return ret
}

function startSakura() {
	requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;
	var canvas = document.createElement("canvas"),
		cxt;
	staticx = !0, canvas.height = window.innerHeight, canvas.width = window.innerWidth, canvas.setAttribute("style", "position: fixed;left: 0;top: 0;pointer-events: none;"), canvas.setAttribute("id", "canvas_sakura"), document.getElementsByTagName("body")[0].appendChild(canvas), cxt = canvas.getContext("2d");
	for (var sakuraList = new SakuraList, i = 0; i < 1; i++) {
		var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny;
		randomX = getRandom("x"), randomY = getRandom("y"), randomR = getRandom("r"), randomS = getRandom("s"), randomFnx = getRandom("fnx"), randomFny = getRandom("fny"), randomFnR = getRandom("fnr"), (sakura = new Sakura(randomX, randomY, randomS, randomR, {
				x: randomFnx,
				y: randomFny,
				r: randomFnR
			}))
			.draw(cxt), sakuraList.push(sakura)
	}
	stop = requestAnimationFrame((function() {
		cxt.clearRect(0, 0, canvas.width, canvas.height), sakuraList.update(), sakuraList.draw(cxt), stop = requestAnimationFrame(arguments.callee)
	}))
}

// function stopp() {
// 	if (staticx) {
// 		var child = document.getElementById("canvas_sakura");
// 		child.parentNode.removeChild(child), window.cancelAnimationFrame(stop), staticx = !1
// 	} else {
// 		startSakura()
// 	}
// }

img.src = "data:image/png;base64,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", 

Sakura.prototype.draw = function(cxt) {
	cxt.save();
	// var xc = 100 * this.s / 4;
	cxt.translate(this.x, this.y), cxt.rotate(this.r), cxt.drawImage(img, 0, 0, 80 * this.s, 80 * this.s), cxt.restore()
}, Sakura.prototype.update = function() {
	this.x = this.fn.x(this.x, this.y), this.y = this.fn.y(this.y, this.y), this.r = this.fn.r(this.r), (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) && (this.r = getRandom("fnr"), Math.random() > .4 ? (this.x = getRandom("x"), this.y = 0, this.s = getRandom("s"), this.r = getRandom("r")) : (this.x = window.innerWidth, this.y = getRandom("y"), this.s = getRandom("s"), this.r = getRandom("r")))
}, SakuraList = function() {
	this.list = []
}, SakuraList.prototype.push = function(sakura) {
	this.list.push(sakura)
}, SakuraList.prototype.update = function() {
	for (var i = 0, len = this.list.length; i < len; i++) 
		this.list[i].update()
}, SakuraList.prototype.draw = function(cxt) {
	for (var i = 0, len = this.list.length; i < len; i++) 
		this.list[i].draw(cxt)
}, SakuraList.prototype.get = function(i) {
	return this.list[i]
}, SakuraList.prototype.size = function() {
	return this.list.length
}, window.onresize = function() {
	// var canvasSnow = document.getElementById("canvas_snow")
}, img.onload = function() {
	startSakura()
};



