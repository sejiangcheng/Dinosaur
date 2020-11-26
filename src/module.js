import Main from "./components/main";
import reducers from "./reducers";
import { store } from "@se/pop";

store.injectReducer("platform", reducers);

export default Main;
