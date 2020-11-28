// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Provider, themes } from "@fluentui/react-northstar"; //https://fluentsite.z22.web.core.windows.net/quick-start
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

ReactDOM.render(
  <Provider theme={themes.teams}>
    <App />
  </Provider>,
  document.getElementById("root")
);
