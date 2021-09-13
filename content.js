var clickedTargetElement = null;
var enteredTargetEleemnt = null;

document.addEventListener("mousedown", function(event) {
  if (event.button == 2) { 
    clickedTargetElement = event.target;
  }
}, true);

document.addEventListener("mouseenter", function(event) {
  enteredTargetEleemnt = event.target;
}, true);

function halfColorAnaglyph(imageDataLeft, imageDataRight) {
  // clone the pixel array from original imageData
  const originalArrayLeft = imageDataLeft.data;
  const originalArrayRight = imageDataRight.data;
  const newArray = new Uint8ClampedArray(originalArrayLeft);
  for (let i = 0; i < originalArrayLeft.length; i += 4) {
    newArray[i + 0] =  0.7* originalArrayLeft[i + 1] + 0.3* originalArrayLeft[i + 2]; // red 🔴
    newArray[i + 1] = 1.0* originalArrayRight[i + 1]  // green 🟢
    newArray[i + 2] = 1.0 * originalArrayRight[i + 2];// blue 🔵
	newArray[i + 3] = originalArrayLeft[i + 3] ;// alpha
  }
  // return a new ImageData object
  return new ImageData(newArray, imageDataLeft.width, imageDataLeft.height);
}


function duboisAnaglyph(imageDataLeft, imageDataRight) {
  // clone the pixel array from original imageData
  const originalArrayLeft = imageDataLeft.data;
  const originalArrayRight = imageDataRight.data;
  const newArray = new Uint8ClampedArray(originalArrayLeft);
  for (let i = 0; i < originalArrayLeft.length; i += 4) {
    newArray[i + 0] =  0.456*originalArrayLeft[i + 0] + 0.500*originalArrayLeft[i + 1] + 0.176* originalArrayLeft[i + 2] + (-0.043)*originalArrayRight[i + 0] + (-0.088)*originalArrayRight[i + 1] + (-0.002)* originalArrayRight[i + 2]; // red 🔴
    newArray[i + 1] = (-0.040)*originalArrayLeft[i + 0] + (-0.038)*originalArrayLeft[i + 1] + (-0.016)* originalArrayLeft[i + 2] + 0.378*originalArrayRight[i + 0] + 0.734*originalArrayRight[i + 1] + (-0.018)* originalArrayRight[i + 2];  // green 🟢
    newArray[i + 2] = (-0.015)*originalArrayLeft[i + 0] + (-0.021)*originalArrayLeft[i + 1] + (-0.005)* originalArrayLeft[i + 2] + (-0.072)*originalArrayRight[i + 0] + (-0.113)*originalArrayRight[i + 1] + (1.226)*originalArrayRight[i + 2];;// blue 🔵
	newArray[i + 3] = 0.5*originalArrayLeft[i + 3] + 0.5*originalArrayRight[i + 3] ;// alpha
  }
  // return a new ImageData object
  return new ImageData(newArray, imageDataLeft.width, imageDataLeft.height);
}

function rcd2ri(cnv) {
    var img = cnv.original3DImage;
    var ctx = cnv.getContext("2d");
	
	ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
	
	const imageDataRight = ctx.getImageData(0, 0, cnv.width/2, cnv.height);	
	const imageDataLeft = ctx.getImageData(cnv.width/2, 0, cnv.width/2, cnv.height);
	
	const updatedImageData = duboisAnaglyph(imageDataLeft, imageDataRight);
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	
	ctx.putImageData(updatedImageData, cnv.width /4, 0, 0, 0, cnv.width /2, cnv.height) 
	}
	
function rchc2ri(cnv) {
    var img = cnv.original3DImage;
    var ctx = cnv.getContext("2d");
	
	ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
	
	const imageDataRight = ctx.getImageData(0, 0, cnv.width/2, cnv.height);	
	const imageDataLeft = ctx.getImageData(cnv.width/2, 0, cnv.width/2, cnv.height);
	
	const updatedImageData = halfColorAnaglyph(imageDataLeft, imageDataRight);
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	
	ctx.putImageData(updatedImageData, cnv.width /4, 0, 0, 0, cnv.width /2, cnv.height) 
	}

function crd2ri(cnv) {
    var img = cnv.original3DImage;
    var ctx = cnv.getContext("2d");
	
	ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
	
	const imageDataLeft = ctx.getImageData(0, 0, cnv.width/2, cnv.height);	
	const imageDataRight = ctx.getImageData(cnv.width/2, 0, cnv.width/2, cnv.height);
	
	const updatedImageData = duboisAnaglyph(imageDataLeft, imageDataRight);
	
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	
	ctx.putImageData(updatedImageData, cnv.width /4, 0, 0, 0, cnv.width /2, cnv.height) 
	}
	
function crhc2ri(cnv) {
    var img = cnv.original3DImage;
    var ctx = cnv.getContext("2d");
	
	ctx.drawImage(img, 0, 0, cnv.width, cnv.height);
	
	const imageDataLeft = ctx.getImageData(0, 0, cnv.width/2, cnv.height);	
	const imageDataRight = ctx.getImageData(cnv.width/2, 0, cnv.width/2, cnv.height);
	
	const updatedImageData = halfColorAnaglyph(imageDataLeft, imageDataRight);
	
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	
	ctx.putImageData(updatedImageData, cnv.width /4, 0, 0, 0, cnv.width /2, cnv.height) 
	}



function refresh3DView() {
  var eles = document.getElementsByTagName("CANVAS");
  for (var i = 0; i < eles.length; i++) {
    var cnv = eles[i];
    if (cnv.hasOwnProperty("convert3DType")) {
      switch (cnv.convert3DType) {
		  case "rcd2ri":
			rcd2ri(cnv);
			break;
		case "rchc2ri":
			rchc2ri(cnv);
			break;
		case "crd2ri":
			crd2ri(cnv);
			break;
		case "crhc2ri":
			crhc2ri(cnv);
			break;
      }
    }
  }
}

function restore3DImage(img, cnv) {
  if (img.style.display == "none") {
    img.style.display = cnv.style.display;
    cnv.style.display = "none";
  }
}

function convert3DImage(img, cnv, ct) {
  if (!cnv) {
    cnv = document.createElement("CANVAS");
    cnv.original3DImage = img;
    cnv.style.cssText = img.style.cssText;
    cnv.className = img.className;
    img.canvas3DView = cnv;
    img.parentElement.insertBefore(cnv, img);
  }
  cnv.convert3DType = ct;
  if (img.style.display != "none") {
    cnv.width = img.offsetWidth;
    cnv.height = img.offsetHeight;
    cnv.style.display = img.style.display;
    img.style.display = "none";
  }
  refresh3DView();
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  var targetElement;
  switch (request["source"]) {
  case "menu":
    targetElement = clickedTargetElement;
    break;
  case "command":
    targetElement = enteredTargetEleemnt;
    break;
  default:
    return;
  }
  if (targetElement) {
    var img = null;
    var cnv = null;
    if (targetElement.tagName == "IMG") {
      img = targetElement;
      if (img.hasOwnProperty("canvas3DView")) {
        cnv = img.canvas3DView;
      }
    } else if (targetElement.tagName == "CANVAS") {
      cnv = targetElement;
      if (cnv.hasOwnProperty("original3DImage")) {
        img = cnv.original3DImage;
      }
    }
    if (request["from"] == "orig") {
      if (img && cnv) {
        restore3DImage(img, cnv);
      }
    } else {
      if (img) {
        convert3DImage(img, cnv, request["from"] + "2" + request["to"]);
      }
    }
  }
});

window.onscroll = refresh3DView;
