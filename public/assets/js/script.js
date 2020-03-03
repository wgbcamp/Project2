// This file is basically just to make any CRUD requests that we can't already make in HTML
// add ajax/axios as onclicks, making sure to capture any input fields as object keys
// the request must have that object in it
// week 14 activity 5 has some good examples


// This is for the button on the login form. It redirects to the register page. (make sure /register wasn't changed for testing purposes)
$('#register-button').click(function (e) { 
    e.preventDefault();
    location.href = "/register"
});

// Update password button redirects to a page for that
$('#update-password').click(function (e) { 
  e.preventDefault();
  location.href = "/newPassword"
});

// Submit button on the update password page will make he put request
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
  }).done(function(){
    location.href = '/api/acctredirect'
})
})

// Delete posts and delete caption buttons will delete the post or caption of the div they're in
$('.delete-something-button').click(function (e) { 
  e.preventDefault();
  let id = $(this).attr("id");
  $.ajax({
    method: "DELETE",
    url: "/api/" + id
  }).done(function(){
    location.href = '/../api/acctredirect'
})
});

// Delete account button will alert the user then delete the account
$('.delete-account').click(function (e) { 
  e.preventDefault();
  let id = $(this).attr("id");
  var doubleCheck = confirm("Are you sure you want to delete this account?")
  if (doubleCheck === true) {
    console.log('deleting account')
  $.ajax({
    method: "DELETE",
    url: "/api/users/" + id
  }).done(function(){
    location.href = '/../'
})
  }
});

$(".upvote-button").click(function (e) { 
  e.preventDefault();
  let upvoteButtonID = $(this).attr("data-id");

  let upvotes = $("#upvotenumber-" + upvoteButtonID).html()
  upvotes++
  $("#upvotenumber-" + upvoteButtonID).html(upvotes);
});



