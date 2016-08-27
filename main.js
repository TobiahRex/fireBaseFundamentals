// https://testfirebase-50970.firebaseio.com/
'use strict';
let rootUrl = 'https://testfirebase-50970.firebaseio.com/',
usersRef= new Firebase(rootUrl + 'users'),
userObjectsRef = new Firebase(rootUrl + 'userObjects'),
timelineRef = new Firebase(userObjectsRef + 'timeline'),
userHandler,
timelineHandler;


$(document).ready(init);

function init() {
  $('#add').click(addMessage);
  // $("#start").click(start);
  // $("#logout").click(logout);

  // chatRef.on('child_added', function(snapshot){
  //   var value = snapshot.val();
  //   var $li = $('<li>').text(value.time + ' ' + value.name + ' ' + value.message);
  //   $('#output').append($li);
  // });

  usersRef.on('value', (snapshot) => {
    $('#users').empty();
    let fbUserObjs = snapshot.val();
    let $users = Object.keys(fbUserObjs).map(userKey => {
      let user = fbUserObjs[userKey];
      user.key = userKey;
      return $(`<li id=${user.key}>`).text(user.name);
    });
    $('#users').append($users);
  });
}


function addMessage(e){
  let tweet = {
    text: $('#message').val(),
    created: (new Date()).toString()
  };
  $('#message').val('');

  let tweetObjs;
  userObjectsRef.child('tweets').on('value', (snap) => {
    tweetObjs = snap.val();

  });

  // tweetObjs.once('value', (snapshot) => snapshot.val());
  console.log('tweetObjs: ', tweetObjs);
};
// let rootUrl = 'https://testfirebase-50970.firebaseio.com/',
//     usersRef= new Firebase(rootUrl + 'users'),
//     userObjectsRef = new Firebase(rootUrl + 'userObjects'),
//     timelineRef = new Firebase(userObjectsRef + 'timeline'),
//     userHandler,
//     timelineHandler;
// let fbUsers;
// usersRef.once('value', (snapshot) => {
//   console.log('ONCE: ', snapshot.val());
//   fbUsers = snapshot.val();
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
//   let count = 0,
//   userRef,
//   followers,
//   tweets;
//   for (let key in fbUsers) {
//     count++;
//     followers = [];
//     tweets = [];
//     userRef = usersRef.child(key)
//
//     userRef.on('value', (snapshot) => {
//       let data = snapshot.val();
//       followers = Object.keys(data.following);
//       tweets = Object.keys(data.tweets);
//
//       followers.forEach((userId, i) => {
//         usersRef.child(userId).once('value', (snapshot) => {
//           console.log('THIS USER: ', key);
//           console.log(`User ${userId}: `, snapshot.val());
//         });
//       });
//     });
//   }
// });


// userObjectsRef.child('following').once('value', (snapshot) => {  // show users in following.
//   let users = snapshot.val();
//
//   for (let userKey in users) {
//     let followerObj = users[userKey]; // an Object of keys that represent followers.
//     console.log('User: ', userKey, '\nfollowers: ', followerObj);
//   }
// });


// in order to remember the firebase key of an object, we need to make a new
// property on that object with key attached. This code below can help and returns
// an array of objects with that added property.
//
// let flatten = objects => {
//   // let keys = Object.keys(objects),
//   // i = keys.length,
//   // result = [],
//   // tweet;
//   //
//   // while(i--) {
//   //   tweet = objects[keys[i]];
//   //   tweet.key = keys[i];
//   //   results.push(tweet);
//   // }
//   // return results;
//   let tweet;
//   let results = Object.keys(objects).map((key) => {
//     tweet = objects[key];
//     tweet.key = key;
//     return tweet;
//   });
//   return results
// };

// function stopListening() {
//   if (typeof timelineRef === 'object' && typeof timelineHandler) {
//     timelineRef.off('value', timelineHandler);
//   }
//   if (typeof userRef === 'object' && typeof userHandler) {
//     userRef.off('value', userHandler);
//   }
// }

// let userChange = (e) => {  // when a different user is selected.
//   let userKey = e.target.value;
//
//   if (userKey) {
//     // gives an object of nested objects, with the first object being a firebase key,
//     // that have a nested tweet and it's details as it's value.
//     let timelineRef = userObjectsRef.child('timeline').child(userKey);
//     // encapsulate the .on() instance so that we turn it off and re-assign it later.
//     timelineHandler = timlineRef.on('value', (snap) => {
//       // this will eventually look like an array of objects, with the firebase key as an added property.
//       let data = flatten(snap.val());
//     });
//
//     let userRef = usersRef.child(userKey);
//     userHandler = userRef.on('value', (snap) => {
//       let fbUser = snap.val();
//     });
//   }
// }


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
