

$(document).ready(function() {
    $("p").hide(400);
    $("p").show(400);
    $("p").hide(400, function(){
        alert("finished hiding!");
    });
    var s = $("p").text();
    alert(s);
    $("p").click(function(e){
        alert("You clicked on a paragraph with text: " + $(this).text());
        e.key;
    });
    

}   