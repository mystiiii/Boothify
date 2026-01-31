const width = 640;
let height = 0; 
let streaming = false; 

const video = document.getElementById("userCamera");
const canvas = document.getElementById("capturedPhoto");
const photo = document.getElementById("photo");
const captureButton = document.getElementById("takePicture");

const constraints = { 
  video: { width: { ideal: width } }, 
  audio: false 
};

navigator.mediaDevices
  .getUserMedia(constraints)
  .then((mediaStream) => {
    video.srcObject = mediaStream;
    video.play();
  })
  .catch((err) => {
    console.error(`An error occurred: ${err}`);
  });

video.addEventListener("canplay", (ev) => {
  if (!streaming) {
    height =  video.videoHeight / (video.videoWidth / width);

    video.setAttribute("width", width);
    video.setAttribute("height", height);
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    streaming = true;
  }
}, false);

captureButton.addEventListener("click", (ev) => {
  ev.preventDefault();
  takePicture();
});

function takePicture() {
  const context = canvas.getContext("2d");
  if (width && height) {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(video, 0, 0, width, height);

    const data = [];

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      data.push(url);
      photo.src = url; 
      
      console.log("Image saved to array at index:", data.length - 1);
    }, "image/png");

  }
}