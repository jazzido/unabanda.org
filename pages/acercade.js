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
          </div>
        </div>
      </section>
    </App>
  );
};

export default withApollo(AcercaDe);
