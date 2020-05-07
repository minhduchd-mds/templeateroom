$(window).on('load', function() {

    setTimeout(function(){
        $('.alert-warning-m').hide().css({"display": "none"});
    },0);
    setTimeout(function(){
        $('.alert-warning-m').show().css({"display": "block"});
    }, 5000);
    setTimeout(function(){
        $('.alert-warning-m').hide();
    }, 8000);
});
$(document).ready(function () {
    //Window load functions
    var $window = $(window);

    $window.load(function () {
        loads();
        gototop();
        alertm();
        background();
    });
    /*************************
     Preloader
     *************************/
    function loads() {
        $("#load").fadeOut();
        $('#preloader').delay(0).fadeOut('slow');
    }
    function alertm() {
        $("#load").fadeOut();
        $('.alert-warning-').delay(30).fadeOut('slow');
    }
    /*************************
     Back to top
     *************************/
    function gototop() {
        var $goToTop = $('#back-to-top');
        $goToTop.hide();
        $window.scroll(function(){
            if ($window.scrollTop()>100) $goToTop.fadeIn();
            else $goToTop.fadeOut();
        });
        $goToTop.on("click", function () {
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });
    }
    /*************************
     Background
     *************************/
    function background() {
        // show click color
        $('.opener').click(function (e) {
            e.preventDefault();
            var open = $('#background-setting').toggleClass('opened');
            var closed = $('#background-setting').toggleClass('closed');
            if(open){
                open;
            }else {
                closed;
            }
        });

        var link = $('link[data-style="styles"]');
        $('.style-customizer .styleChange li').on('click', function() {

            if(link.length>0){

                var $this = $(this),
                    tp_stylesheet = $this.data('style');
                $(".style-customizer .styleChange .selected").removeClass("selected");
                $this.addClass("selected");
                link.attr('href', 'css/skins/' + tp_stylesheet + '.css');


            }else{
                var $this = $(this),
                    tp_stylesheet = $this.data('style');
                $(".style-customizer .styleChange .selected").removeClass("selected");
                $this.addClass("selected");
            }
        });
        /**************************************
         Reset all costomize styles
         **************************************/
        $('.style-customizer .resetAll li a.button-reset').on('click',function() {
            var tp_stylesheet = 'skin-default';
            $('.style-customizer .styleChange li.selected').removeClass("selected");
            $('.style-customizer .styleChange li[data-style="'+tp_stylesheet+'"]').addClass("selected");
            link.attr('href', 'css/skins/' + tp_stylesheet + '.css');
        });
    }
});