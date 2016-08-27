// https://testfirebase-50970.firebaseio.com/
'use strict';


let rootUrl = 'https://testfirebase-50970.firebaseio.com/';
let usersRef= new Firebase(rootUrl + 'users');
let userObjects = new Firebase(rootUrl + 'userObjects');

let fbUsers;
usersRef.once('value', (snapshot) => {
  console.log('ONCE: ', snapshot.val());
  fbUsers = snapshot.val();
  // let usersArr = [];
  // for (let key in users) {
  //   usersArr.push(key);
  // }
  // let userRef = usersRef.child(usersArr[0]);
  //
  //
  //
  // userRef.on('value', (snapshot) => {
  //   console.log('user 1 info: ', snapshot.val());
  // })
  let count = 0,
  userRef,
  followers,
  tweets;
  for (let key in fbUsers) {
    count++;
    followers = [];
    tweets = [];
    userRef = usersRef.child(key)

    userRef.on('value', (snapshot) => {
      let data = snapshot.val();
      followers = Object.keys(data.following);
      tweets = Object.keys(data.tweets);

      followers.forEach((userId, i) => {
        usersRef.child(userId).once('value', (snapshot) => {
          console.log('THIS USER: ', key);
          console.log(`User ${userId}: `, snapshot.val());
        });
      });
    });
  }
});


userObjects.child('following').once('value', (snapshot) => {  // show users in following.
  let users = snapshot.val();

  for (let userKey in users) {
    let followerObj = users[userKey]; // an Object of keys that represent followers.
    console.log('User: ', userKey, '\nfollowers: ', followerObj);
  }
});


// in order to record an object, and attach it's firebase key, we need to make a new
// property on that object with the key's value. This code below can help.
let flatten = objects => {
  let keys = Object.keys(objects),
  i = keys.length,
  result = [],
  tweet;

  while(i--) {
    tweet = objects[keys[i]];
    tweet.key = keys[i];
    results.unshift;
  }
  return result;
};






// user.on('value', (user_snapshot) => {
//   console.log('user 1: ', user_snapshot);
// });


// $(document).ready(init);
//
// function init() {
//   $('#add').click(addMessage);
//   $("#start").click(start);
//   $("#logout").click(logout);
//
//   $(window).on('beforeunload', logout)
//
//   chatRef.on('child_added', function(snapshot){
//     var value = snapshot.val();
//     var $li = $('<li>').text(value.time + ' ' + value.name + ' ' + value.message);
//     $('#output').append($li);
//   });
//
//   usersRef.on('value', function(snapshot){
//     $('#users').empty();
//
//     var users = snapshot.val();
//
//     var $lis = [];
//
//     for(var key in users){
//       var $li = $('<li>').text(users[key]);
//       $lis.push($li);
//     }
//     $('#users').append($lis);
//   });
//
// }
//
// function logout(){
//   usersRef.once('value', function(snapshot){
//     var users = snapshot.val();
//     for(var key in users){
//       if(users[key] === name){
//         usersRef.child(key).remove();
//       }
//     }
//     $("#output").hide();
//     $('.newMessage').hide();
//     $('.chooseName').show();
//
//   });
// }
//
// function start(){
//   name = $('#name').val();
//   $('#name').val('');
//   if(name.length > 0 && name.length < 15){
//     $("#output").show();
//     $('.newMessage').show();
//     $('.chooseName').hide();
//     usersRef.push(name);
//   } else {
//     alert('Invalid name.');
//   }
// }
//
// function addMessage(){
//   var message = $("#message").val();
//   $("#message").val('');
//   chatRef.push({
//     name: name,
//     time: Date.now(),
//     message: message
//   });
// }
