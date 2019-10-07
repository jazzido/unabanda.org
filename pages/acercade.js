import { useState } from "react";
import App from "../components/App";
import Header from "../components/Header";
import Logo from "../components/Logo";
// import NextSeo from "next-seo";
import Head from "next/head";

import config from "../lib/config";

const AcercaDe = () => {
  return (
    <App>
      <Head>
        <title>Acerca de unabanda.org</title>
      </Head>
      <Header />
      <section className="section">
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

export default AcercaDe;
