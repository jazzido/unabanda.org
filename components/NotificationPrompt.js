import { useState, useEffect } from "react";
import askForPermissionToReceiveNotifications from "../lib/PushNotifications";

const NotificationPrompt = () => {
  const [doRenderNotificationPrompt, setRenderNotificationPrompt] = useState(
    false
  );
  useEffect(() => {
    setRenderNotificationPrompt(
      // eslint-disable-next-line no-undef
      firebase.messaging.isSupported() &&
        window.localStorage &&
        window.localStorage.getItem("renderNotificationPrompt") !== "false" &&
        Notification.permission !== "granted"
    );
  }, []);

  if (!doRenderNotificationPrompt) {
    return null;
  }

  return (
    <div
      className="notification is-info is-size-5 has-vertical-scroll-stop"
      style={{ borderRadius: 0, marginBottom: 0 }}
    >
      <button
        className="delete"
        onClick={() => {
          setRenderNotificationPrompt(false);
        }}
      />
      ¿Querés enterarte de todos los eventos de música en Bahía Blanca? Hacé
      click para recibir una notificación apenas publiquemos la agenda de cada
      día
      <div className="buttons is-right has-margin-top-10">
        <span
          className="button is-danger has-text-weight-bold"
          onClick={() => {
            askForPermissionToReceiveNotifications();
            setRenderNotificationPrompt(false);
          }}
        >
          Quiero!
        </span>
        <span
          className="button is-link"
          style={{ backgroundColor: "transparent" }}
          onClick={() => {
            setRenderNotificationPrompt(false);
            window.localStorage.setItem("renderNotificationPrompt", "false");
          }}
        >
          No quiero.
        </span>
      </div>
    </div>
  );
};

export default NotificationPrompt;
