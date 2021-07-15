import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import "~/styles/global/nprogress.css";
import { faviconUrl } from "~/utils/constants";
import ThemeContainer from "../contexts/theme/ThemeContainer";

Router.events.on("routeChangeStart", (url) => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ThemeContainer>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <title>Stokei</title>

        <link rel="shortcut icon" href={faviconUrl} />
      </Head>
      <Component {...pageProps} />
    </ThemeContainer>
  );
}

export default MyApp;
