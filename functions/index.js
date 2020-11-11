
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

exports.postCreated = functions.firestore
    .document('posts/{postId}')
    .onCreate(doc => {
    const post = doc.data();
    const notification = {
        content: 'added a new project',
        user: `${post.authorFirstName} ${post.authorLastName}`,
        userAvatar: post.authorAvatar,
        time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
});

exports.userJoined = functions.auth.user()
  .onCreate(user => {
    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'has joined!!',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp(),
        userAvatar: newUser.avatar,
        };

        return createNotification(notification);

      });
});