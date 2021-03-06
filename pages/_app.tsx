import "../styles/globals.css";
import React from "react";
import { wrapper } from "@/wapper/store";
import Head from "next/head";
import theme from "../app/utils/theme";
import { ThemeProvider } from "@material-ui/core/styles";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>FIRST SHOP</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default wrapper.withRedux(MyApp);
