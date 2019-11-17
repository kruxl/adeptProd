const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.createUser = functions.firestore.document('newUsers/{userId}').onCreate(async (snap, context) => {
    const userId = context.params.userId;
    const newUser = await admin.auth().createUser({
        disabled: false,
        email: snap.get('email'),
        password: snap.get('password')
    });
    await admin.firestore().collection('users').doc(newUser.uid).set({
        uid: newUser.uid,
        email: newUser.email,
        firstName: snap.get('firstName'),
        lastName: snap.get('lastName'),
        gender: snap.get('gender'),
        sendingOrg: snap.get('sendingOrg'),
        phoneNumber: snap.get('phone'),
        dateOfBirth: snap.get('dateOfBirth'),
        flow: snap.get('flow'),
        specialization: snap.get('spec'),
        competencies: snap.get('competencies'),
        specialNeeds: snap.get('comments'),
        io: snap.get('io'),
        teacher: snap.get('teacher'),
        admin: snap.get('admin'),
        student: snap.get('student')
    });
    return admin.firestore().collection('newUsers').doc(userId).delete(); 
})
                                        
