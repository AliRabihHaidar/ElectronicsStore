const imageUrls = ["images/image1.jpg", "images/image12.jpg", "images/image13.jpg"];
const interval = 3000;
let currentIndex = 0;

function swapImage() {
    document.getElementById('displayedImage').src = imageUrls[currentIndex];
    currentIndex = (currentIndex + 1) % imageUrls.length;
}

swapImage();
setInterval(swapImage, interval);