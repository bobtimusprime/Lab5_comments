$(document).ready(function(){
 
  //Post comments button
  $("#postComment").click(function(){
  //console.log('Post Button worked');
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);

      var url = "comment";
    $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
        $("#done").html(textStatus);
      }
   })//End Ajax
  });//End post comments button click function

  //Get comments button
  $("#getComments").click(function() {
  //console.log('Get Comments Button Worked');
    $.getJSON('comment', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li> Name: ";
        everything += com.Name;
        everything += " -- Comment: ";
        everything += com.Comment;
        everything += "</li>";
     }
     everything += "</ul>";
     $("#comments").html(everything);   
  })  
});//End get comments button click function

  //Delete All button
  $("#deleteComments").click(function() {
   // console.log("Delete button worked");
     var url = "comment";
     $.ajax({
       url:url,
       type: "DELETE",
       success: console.log("delete function worked")
    });
  });//End delete all button click function 

});//End of document.ready
