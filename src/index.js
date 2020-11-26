import { setPublicPath } from "systemjs-webpack-interop";
import "@/mock";
setPublicPath("@se/module/dinosaur");
import Module from "./module";
export default Module;
