// Worker.js
// import tracker from 'tracking';

function takePhotoTracker(){
    // console.log('tracker');
    // return 'Tomo la foto desde el worker'
    // var img = document.getElementById('img');
    
    var tracker = new tracking.LandmarksTracker();
    tracker.setInitialScale(3);
    tracker.setStepSize(1);
    tracker.setEdgesDensity(0.1);

    tracking.track('#videoToBio', tracker);

    tracker.on('track', function(event) {
        canvasToImagenCxt.clearRect(0,0,canvasToImagen.width, canvasToImagen.height);
        if(!event.data) return;

        event.data.faces.forEach(function(rect) {
            // window.plot(rect.x, rect.y, rect.width, rect.height);
            canvasReocorte.width = rect.width;
            canvasReocorte.height = rect.height;
            canvasToImagenCxt.strokeStyle = '#a64ceb';
            canvasToImagenCxt.strokeRect(rect.x, rect.y, rect.width, rect.height);
            canvasToImagenCxt.font = '11px Helvetica';
            canvasToImagenCxt.fillStyle = "#fff";
            canvasToImagenCxt.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
            canvasToImagenCxt.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
            
            console.log(rect.x, rect.y, rect.width, rect.height);
            // canvasReocorteCtx.drawImage(videoDisplay,rect.x, rect.y, rect.width, rect.height,0,0, rect.width, rect.height );
        });


        // event.data.landmarks.forEach(function(landmarks) {
        // for(var i=0; i < landmarks.length; i++){
        //     window.plotLandmark(landmarks[i][0], landmarks[i][1], 2, '#44ABDA');
        // }
        // });

    });

    // window.plot = function(x, y, w, h) {
    //     var rect = document.createElement('div');
    //     document.querySelector('.demo-container').appendChild(rect);
    //     rect.classList.add('rect');
    //     rect.style.width = w + 'px';
    //     rect.style.height = h + 'px';
    //     rect.style.left = (img.offsetLeft + x) + 'px';
    //     rect.style.top = (img.offsetTop + y) + 'px';
    // };

    // window.plotLandmark = function(x,y, radius, color){
    //     var circle = document.createElement('div');
    //     document.querySelector('.demo-container').appendChild(circle);
    //     circle.classList.add('circle');
    //     circle.style.backgroundColor = color;
    //     circle.style.width = (radius*2) + 'px';
    //     circle.style.height = (radius*2) + 'px';
    //     circle.style.left = (img.offsetLeft + x) + 'px';
    //     circle.style.top = (img.offsetTop + y) + 'px';
    // }

}

// Post data to parent thread
self.postMessage(
    {   number: 3, 
        // takeFoto: takePhotoTracker()
    }
)

// Respond to message from parent thread
self.addEventListener('message', (event) => {
    // calculaPi(event.data)
    // console.log('desde el worker', event);
    // takePhotoTracker()
})