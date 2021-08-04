import { Provider } from "urql";
import { client } from "../src/graphql/client";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
