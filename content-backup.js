src = "https://cdn.jsdelivr.net/npm/tesseract.js@4.0.0/dist/tesseract.min.js"
// Check for the image every second
var imagecheck;
var interval = setInterval(function() {
  console.log('Checking for image...');
  // Select the image with the alt attribute "vtopCaptcha"
  var image = document.querySelector('img[alt="vtopCaptcha"]');
  imagecheck = image;
  // If the image is found
  if (image) {
    console.log('Found image with alt attribute "vtopCaptcha"');
    console.log(image);
    // Stop the interval
    clearInterval(interval);

    console.log('Loading image...');
    // Load the image
    const pimage = new Image();
    pimage.src = image.src;
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 45;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(pimage, 0, 0);
    console.log('Loaded image');

    // Perform some image processing on the image
    try {
      const mat = cv.imread(canvas);
      console.log('Loaded image into matrix');
      const thresholded = new cv.Mat();
      cv.threshold(mat, thresholded, 1, 255, cv.THRESH_BINARY);
      console.log('Performed binary threshold operation');
      // Find the contours in the thresholded image
      let dst = cv.Mat.zeros(thresholded.rows, thresholded.cols, cv.CV_8UC3);
      cv.cvtColor(thresholded, thresholded, cv.COLOR_RGBA2GRAY, 0);
      cv.threshold(thresholded, thresholded, 120, 200, cv.THRESH_BINARY);
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(thresholded, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      console.log(`Number of contours: ${contours.size()}`);
      // Iterate through the contours and filter out the small ones
      let minArea = 50; // Adjust this value to control the size of the islands
      for (let i = 0; i < contours.size(); i++) {
      let cnt = contours.get(i);
      let area = cv.contourArea(cnt);
      if (area < minArea) {
        let color = new cv.Scalar(255, 255, 255);
      // Draw the contour with a white color to effectively "remove" the island
      cv.drawContours(dst, contours, i, color, -1, 8, hierarchy);
      }
      }
      console.log("Dst created");
      cv.threshold(thresholded, thresholded, 1, 255, cv.THRESH_BINARY);
      cv.imshow(canvas, thresholded);
      let src1 = cv.imread(canvas);
      cv.imshow(canvas, dst);
      let src2 = cv.imread(canvas);
      let result = new cv.Mat();
      console.log("result created");
      cv.add(src1, src2, result);
      console.log("result added");
      cv.imshow(canvas, result);
      Tesseract.recognize(
        canvas,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        document.getElementById('captchaCheck').value = text;
      })
      console.log(text);
      console.log('Displayed thresholded image on canvas');
      const dataUrl = canvas.toDataURL("image/jpeg");
      console.log('Converted canvas to data URL');
      console.log('Initiating download...');
      // Trigger a click event on the a element to initiate the download
      const link = document.createElement("a");
      link.download = "thresholded_image.jpg";
      link.href = dataUrl;
      link.click();
      console.log('Removing download link...');
      // Remove the a element
      link.remove();
      } catch (error) {
      console.error(error);
      }
      }
      }, 1000);

// Check for the image every second
setInterval(function() {
  console.log('Checking for image...');
  // If the src of the image has changed
var newimage = document.querySelector('img[alt="vtopCaptcha"]');

  if (newimage !== imagecheck) {
    image = newimage;
    imagecheck = newimage;
    console.log('Found image with alt attribute "vtopCaptcha"');
    console.log(image);

    console.log('Loading image...');
    // Load the image
    const pimage = new Image();
    pimage.src = image.src;
    const canvas = document.createElement("canvas");
    canvas.width = 180;
    canvas.height = 45;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(pimage, 0, 0);
    console.log('Loaded image');

    // Perform some image processing on the image
    try {
      const mat = cv.imread(canvas);
      console.log('Loaded image into matrix');
      const thresholded = new cv.Mat();
      cv.threshold(mat, thresholded, 1, 255, cv.THRESH_BINARY);
      console.log('Performed binary threshold operation');
      // Find the contours in the thresholded image
      let dst = cv.Mat.zeros(thresholded.rows, thresholded.cols, cv.CV_8UC3);
      cv.cvtColor(thresholded, thresholded, cv.COLOR_RGBA2GRAY, 0);
      cv.threshold(thresholded, thresholded, 120, 200, cv.THRESH_BINARY);
      let contours = new cv.MatVector();
      let hierarchy = new cv.Mat();
      cv.findContours(thresholded, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
      console.log(`Number of contours: ${contours.size()}`);
      // Iterate through the contours and filter out the small ones
      let minArea = 50; // Adjust this value to control the size of the islands
      for (let i = 0; i < contours.size(); i++) {
      let cnt = contours.get(i);
      let area = cv.contourArea(cnt);
      if (area < minArea) {
        let color = new cv.Scalar(255, 255, 255);
      // Draw the contour with a white color to effectively "remove" the island
      cv.drawContours(dst, contours, i, color, -1, 8, hierarchy);
      }
      }
      console.log("Dst created");
      cv.threshold(thresholded, thresholded, 1, 255, cv.THRESH_BINARY);
      cv.imshow(canvas, thresholded);
      let src1 = cv.imread(canvas);
      cv.imshow(canvas, dst);
      let src2 = cv.imread(canvas);
      let result = new cv.Mat();
      console.log("result created");
      cv.add(src1, src2, result);
      console.log("result added");
      cv.imshow(canvas, result);
      Tesseract.recognize(
        canvas,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        document.getElementById('captchaCheck').value = text;
      })
      console.log('Displayed thresholded image on canvas');
      const dataUrl = canvas.toDataURL("image/jpeg");
      console.log('Converted canvas to data URL');
      console.log('Initiating download...');
      // Trigger a click event on the a element to initiate the download
      const link = document.createElement("a");
      link.download = "thresholded_image.jpg";
      link.href = dataUrl;
      link.click();
      console.log('Removing download link...');
      // Remove the a element
      link.remove();
    } catch (error) {
      console.error(error);
    }
  }
  // Update the current src of the image
  currentSrc = image.src;
}, 1000); // Check every 1 second
