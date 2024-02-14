document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = function(e) {
    const originalImg = document.getElementById('original-img');
    originalImg.src = e.target.result;
    const processedContainer = document.getElementById('processed-container');
    processedContainer.style.display = 'none'; 
  };
  reader.readAsDataURL(file);
});

document.getElementById('convertBtn').addEventListener('click', function() {
  const originalImg = document.getElementById('original-img');
  if (originalImg.src === "" || originalImg.src === "#" || originalImg.src === "about:blank") {
    alert("Please select an image first.");
    return;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = originalImg.width; 
  canvas.height = originalImg.height; 

  canvas.style.width = "100%";

  ctx.drawImage(originalImg, 0, 0, canvas.width, canvas.height); 
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  if (document.getElementById('grayscaleCheckbox').checked) {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg; 
      data[i + 1] = avg; 
      data[i + 2] = avg; 
    }
    document.getElementById('binaryCheckbox').checked = false; 
  }

  if (document.getElementById('binaryCheckbox').checked) {
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const binaryValue = avg > 128 ? 255 : 0; 
      data[i] = binaryValue; 
      data[i + 1] = binaryValue; 
      data[i + 2] = binaryValue; 
    }
    document.getElementById('grayscaleCheckbox').checked = false; 
  }

  ctx.putImageData(imageData, 0, 0);
  const img = document.getElementById('processed-img');
  img.src = canvas.toDataURL();
  const processedContainer = document.getElementById('processed-container');
  processedContainer.style.display = 'block';
});

document.getElementById('grayscaleCheckbox').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('binaryCheckbox').checked = false;
  }
});

document.getElementById('binaryCheckbox').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('grayscaleCheckbox').checked = false;
  }
});