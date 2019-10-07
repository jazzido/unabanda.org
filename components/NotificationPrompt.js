const NotificationPrompt = () => {
  return (
    <div className="notification is-info is-size-5" style={{ borderRadius: 0 }}>
      <button
        className="delete"
        onClick={() => {
          console.log("TODO XXX");
        }}
      />
      ¿Querés enterarte de todos los eventos de música en Bahía Blanca? Hacé
      click para recibir una notificación apenas publiquemos la agenda de cada
      día
      <div className="buttons is-right has-margin-top-10">
        <span
          className="button is-danger has-text-weight-bold"
          // onClick={this.onNotificationSubscribe}
        >
          Quiero!
        </span>
        <span
          className="button is-link"
          style={{ backgroundColor: "transparent" }}
          onClick={() => {
            //this.setState({ renderNotificationPrompt: false });
            // window.localStorage.setItem(
            //   "renderNotificationPrompt",
            //   "false"
            // );
          }}
        >
          No quiero.
        </span>
      </div>
    </div>
  );
};

export default NotificationPrompt;
