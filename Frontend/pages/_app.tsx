import { Provider } from "urql";
import { client } from "../src/next/graphql";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
