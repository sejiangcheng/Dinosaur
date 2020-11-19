import { setPublicPath } from "systemjs-webpack-interop";
setPublicPath("@microapp/dinosaur");

import React from "react";
export default React.lazy(() => import("./module"));
