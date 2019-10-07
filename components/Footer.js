import Link from "next/link";

export default props => {
  return (
    <div className="footer">
      <div className="content has-text-centered">
        <p>
          Última actualización: <strong>XXXXXXXX</strong>
        </p>
        <div className="columns">
          <div className="column is-2 is-offset-2" />
          <div className="column is-narrow has-text-centered">
            <a> Recibir notificaciones</a>
          </div>
          <div className="column is-narrow has-text-centered">
            <Link href="/acercade">
              <a>
                Acerca de <strong>unabanda</strong>
              </a>
            </Link>
          </div>
          <div className="column is-narrow has-text-centered">
            <Link href="/enviarevento">
              <a>Envianos info de tu evento</a>
            </Link>
          </div>
        </div>
        <p>
          contacto: <strong>hola@unabanda.org</strong>
        </p>
        <p>
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            <img
              alt="Licencia Creative Commons"
              src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
            />
          </a>
          <br />
          Esta obra está bajo una{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by-sa/4.0/"
          >
            Licencia Creative Commons Atribución-CompartirIgual 4.0
            Internacional
          </a>
        </p>
      </div>
    </div>
  );
};
