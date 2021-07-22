import { Provider } from "urql";
import { client } from "../src/next/graphql";
import "../styles/globals.scss";
import { UserContextProvider } from "src/state/UserContext";

function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
