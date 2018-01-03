$(document).ready(function() {
    $("#carousel-button").click(function() {
        if ($("#carousel-button").children("span").hasClass("fa-pause")) {
            $("#mycarousel").carousel('pause');
            $("#carousel-button").children("span").removeClass("fa-pause").addClass("fa-play");
        } else {
            $("#mycarousel").carousel('cycle');
            $("#carousel-button").children("span").removeClass("fa-play").addClass("fa-pause");
        }
    });
    $("#login").click(function() {
        $("#loginModal").modal("show");
    });

    $("#reservetable").click(function() {
        $("#reserveModal").modal("show");
    });

    $("#closereservemodal").click(function() {
        $("#reserveModal").modal("hide");
    })
    $("#cancelreservemodal").click(function() {
        $("#reserveModal").modal("hide");
    })
    $("#closeloginmodal").click(function() {
       $("#loginModal").modal("hide");
   })
   $("#cancelloginmodal").click(function() {
      $("#loginModal").modal("hide");
  })

});
