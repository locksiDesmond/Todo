import { Provider } from "react-redux";
import "../styles/globals.css";
import store from "./../redux/Store";
import { createWrapper } from "next-redux-wrapper";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
const makeWrapper = () => store;
const wrapper = createWrapper(makeWrapper);
export default wrapper.withRedux(MyApp);
