import admin from "firebase-admin";

export default async (req, res) => {
  const FIREBASE_CONFIG = {
    type: "service_account",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    // for storing multiline secrets, see https://github.com/zeit/now/issues/749
    private_key: process.env.FIREBASE_PRIVATE_KEY,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  };

  const {
    query: { token },
    method
  } = req;

  if (!token) {
    await 1;
    res.status(400);
  } else {
    // init firebase
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(FIREBASE_CONFIG),
        databaseURL: process.env.FIREBASE_DATABASE_URL
      });
    }

    const firebaseAdmin = admin.apps[0];
    const messaging = firebaseAdmin.messaging();
    const firestore = firebaseAdmin.firestore();

    const [respFirestore, respMessaging] = await Promise.all([
      firestore.collection(process.env.FIREBASE_COLLECTION).add({
        token,
        topic: process.env.FIREBASE_MESSAGING_TOPIC,
        subscribed_at: admin.firestore.FieldValue.serverTimestamp(),
        userAgent: req.headers["user-agent"]
      }),
      messaging.subscribeToTopic([token], process.env.FIREBASE_MESSAGING_TOPIC)
    ]);

    res.status(200).json({ token, method });
  }
};
