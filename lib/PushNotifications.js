const askForPermissionToReceiveNotifications = async () => {
  try {
    // eslint-disable-next-line no-undef
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    await fetch(`/api/subscribe_to_topic?token=${token}`);
    return token;
  } catch (error) {
    console.error(error);
  }
};

export default askForPermissionToReceiveNotifications;
