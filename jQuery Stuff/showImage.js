$(function()
{
    $("#imageOptions a").click(function()
        {
        var imageSource = $(this).children("img").attr("src");
       
        $("#loader").addClass("loading");
        $("h3").remove();
          showImage(imageSource);
          return false;
        });
});

function showImage(src)
{
$("#loader img").fadeOut("normal").remove();
var largeImage = new Image();
$(largeImage).load(function()
                        {
                        $(this).hide();
                        $("#loader").append(this).removeClass("loading");
                                             
                        $(this).fadeIn("slow");              
                        });    
$(largeImage).attr("src", src);                                                                               
}


