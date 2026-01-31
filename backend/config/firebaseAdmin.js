const admin = require('firebase-admin');
const path = require('path');

// Prevent re-initialization (VERY IMPORTANT)
if (!admin.apps.length) {
  try {
    const serviceAccount = require(
      path.join(__dirname, '../firebase-service-account.json')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('✅ Firebase Admin initialized');
  } catch (error) {
    console.error('❌ Firebase Admin init failed');
    console.error(error.message);
    process.exit(1); // STOP server if Firebase fails
  }
}

module.exports = admin;
