import { withApollo } from "../lib/apollo";

import App from "../components/App";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Head from "next/head";

const AcercaDe = () => {
  return (
    <App>
      <Head>
        <title>Acerca de unabanda.org</title>
      </Head>
      <Header />
      <section className="section has-vertical-scroll-stop">
        <div className="container box">
          <h1 className="title">
            Acerca de <Logo fillColor="black" width="120px" />
          </h1>
          <div className="content">
            <p>
              <Logo fillColor="black" width="60px" /> es una agenda de eventos
              de música en vivo en Bahía Blanca y zona.
            </p>
            <p>
              <Logo fillColor="black" width="60px" /> es un proyecto
              independiente y amplio; aspiramos a cubrir todos los géneros
              musicales.
            </p>
            <p>
              Si te interesa el diseño o la programación, y tenés ganas de
              colaborar con <Logo fillColor="black" width="60px" />, el código
              fuente del sitio está publicado:{" "}
              <a href="https://github.com/jazzido/unabanda.org" target="_blank">
                <tt>github.com/jazzido/unabanda.org</tt>
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </App>
  );
};

export default withApollo(AcercaDe);
