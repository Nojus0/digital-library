import { Provider } from "urql";
import { client } from "../src/next/graphql";
import "../styles/globals.scss";
import { UserContextProvider } from "src/state/UserContext";
import { TestNum } from "../../shared/interfaces"
function MyApp({ Component, pageProps }) {
  
  const a: TestNum = TestNum.no;
  console.log(a);
  return (
    <Provider value={client}>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </Provider>
  );
}

export default MyApp;
