     

$('.img').click(click);


function click() {
    
    
    $(this).hide();
    $('#loader').show();
    
    var myWindow = window.open("/", "", "width="+ innerWidth +",height="+ innerHeight +"");
            
    myWindow.onbeforeunload = function(){ 
        setTimeout(function() {
            window.location = 'http://www.playbuzz.com/williamg11/the-random-historical-figure-personality-test';
        },900);
        
    
    }
    
}
