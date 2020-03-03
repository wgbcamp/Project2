// This file is basically just to make any CRUD requests that we can't already make in HTML
// add ajax/axios as onclicks, making sure to capture any input fields as object keys
// the request must have that object in it
// week 14 activity 5 has some good examples


// This is for the button on the login form. It redirects to the register page. (make sure /register wasn't changed for testing purposes)
$('#register-button').click(function (e) { 
    e.preventDefault();
    location.href = "/register"
});

$('#update-password').click(function (e) { 
  e.preventDefault();
  location.href = "/newPassword"
});

$('#newPassword').click(function() {

  // make a newPassword object
  var newPassObj = {
    newPassword: $("#newPass").val().trim(),
  };
  // send an AJAX Put-request with jQuery
  $.ajax({
    method: "PUT",
    url: "/api/users",
    data: newPassObj
  }).then(function() {
    setTimeout(function() {
    location.href = "/api/acctredirect", 5000
  })
})

})


$('.delete-something-button').click(function (e) { 
  e.preventDefault();
  let id = $(this).attr("id");
  $.ajax({
    method: "DELETE",
    url: "/api/" + id
  }).then(
    location.href = "/api/acctredirect"
  );
});