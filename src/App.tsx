import Header from "./layout/header";
import Main from "./layout/main";
import Footer from "./layout/footer";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div id="btc-forever">
        <Header />
        <Main />
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
