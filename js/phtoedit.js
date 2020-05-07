webkitGetUserMedia = undefined;
$(document).ready(function () {
    // Photo css Filter
    Photocopies();

    // camera();
    $("#post-images").on("change", function (e) {
        const icon = e.target.files;
        let i = 0;
        if (i <= 1) {
            $.each(icon, function (i, icon) {
                var reader = new FileReader();
                reader.readAsDataURL(icon);
                reader.onload = function (e) {
                    var image = '<img src="' + e.target.result + '" class="img-fluid"  alt="'+e.name+'">';

                    $(".photo-is-1").html(image);
                };
            });
        }
    });
    // edit color photo
    function Photocopies() {
        // blur
        let photo =  $(".photo-is-1");
        $("#remove-css").on("click", function (e) {
            e.preventDefault();
            $(".photo-is-1").removeClass(
                "blur brightness contrast grayscales hue-rotate invert saturate sepia multiple1 multiple2 multiple3 blend3"
            );
        });
        $("#blur").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("blur shadow2");
            photo.removeClass(
                "brightness contrast grayscales hue-rotate invert saturate sepia multiple1 multiple2 multiple3"
            );
        });
        // blur
        $("#brightness").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("brightness");
            photo.removeClass(
                "blur  contrast grayscales hue-rotate invert saturate sepia multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#contrast").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("contrast");
            photo.removeClass(
                "blur brightness  grayscales hue-rotate invert saturate sepia multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#grayscales").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("grayscales");
            photo.removeClass(
                "blur brightness contrast  hue-rotate invert saturate sepia multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#hue-rotate").on("click", function (e) {
            e.preventDefault();

            photo.toggleClass("hue-rotate");
            photo.removeClass(
                "blur brightness contrast grayscales invert saturate sepia multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#invert").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("invert");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate  saturate sepia multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#saturate").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("saturate");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate invert sepia multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#sepia").on("click", function (e) {
            e.preventDefault();

            photo.toggleClass("sepia");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate invert saturate  multiple1 multiple2 multiple3 shadow2"
            );
        });
        $("#multiple11").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("multiple1");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate invert saturate sepia  multiple2 multiple3 shadow2"
            );
        });
        $("#multiple2").on("click", function (e) {
            e.preventDefault();

            photo.toggleClass("multiple2");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate invert saturate sepia multiple1  multiple3 shadow2"
            );
        });
        $("#multiple3").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("multiple3");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate invert saturate sepia multiple1 multiple2  shadow2"
            );
        });
        $("#blend3").on("click", function (e) {
            e.preventDefault();
            photo.toggleClass("blend3");
            photo.removeClass(
                "blur brightness contrast grayscales hue-rotate invert saturate sepia multiple1 multiple2  shadow2"
            );
        });
    }
    // background  body setting

    // video  camera
    // function camera() {
    //     // Put event listeners into place
    //     window.addEventListener("DOMContentLoaded", function() {
    //         // Grab elements, create settings, etc.
    //         var mediaConfig =  { video: true };
    //         var errBack = function(e) {
    //             console.log('An error has occurred!', e)
    //         };
    //
    //         // Put video listeners into place
    //         if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //             navigator.mediaDevices.getUserMedia(mediaConfig).then(function(stream) {
    //                 video.src = window.URL.createObjectURL(stream);
    //                 video.play();
    //             });
    //         }
    //
    //         /* Legacy code below! */
    //         else if(navigator.getUserMedia) { // Standard
    //             navigator.getUserMedia(mediaConfig, function(stream) {
    //                 video.src = stream;
    //                 video.play();
    //             }, errBack);
    //         } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    //             navigator.webkitGetUserMedia(mediaConfig, function(stream){
    //                 video.src = window.webkitURL.createObjectURL(stream);
    //                 video.play();
    //             }, errBack);
    //         } else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    //             navigator.mozGetUserMedia(mediaConfig, function(stream){
    //                 video.src = window.URL.createObjectURL(stream);
    //                 video.play();
    //             }, errBack);
    //         }
    //
    //         // Trigger photo take
    //         $('#snap').addEventListener('click', function() {
    //             takeSnapshot();
    //         });
    //         $('#dowload-images').addEventListener('click', function() {
    //             dowloadimages();
    //         });
    //
    //
    //     }, false);
    //
    //     function takeSnapshot(){
    //
    //         var hidden_canvas = $('#canvas'),
    //             video = $('#video'),
    //             image = $('#canvas'),
    //
    //             // Get the exact size of the video element.
    //             width = video.videoWidth,
    //             height = video.videoHeight,
    //
    //             // Context object for working with the canvas.
    //             context = hidden_canvas.getContext('2d');
    //
    //         // Set the canvas to the same dimensions as the video.
    //         hidden_canvas.width = width;
    //         hidden_canvas.height = height;
    //
    //         // Draw a copy of the current frame from the video on the canvas.
    //         context.drawImage(video, 0, 0, width, height);
    //
    //         // Get an image dataURL from the canvas.
    //         var imageDataURL = hidden_canvas.toDataURL('image/png');
    //
    //         // Set the dataURL as source of an image element, showing the captured photo.
    //         image.setAttribute('src', imageDataURL);
    //
    //     }
    //     function dowloadimages(){
    //
    //         //...
    //
    //         // Get an image dataURL from the canvas.
    //         var imageDataURL = hidden_canvas.toDataURL('image/png');
    //
    //         // Set the href attribute of the download button.
    //         document.querySelector('#dowload-images').href = imageDataURL;
    //         console.log(imageDataURL);
    //     }
    // }
});
