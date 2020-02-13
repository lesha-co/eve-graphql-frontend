import * as React from "react";
import { render } from "react-dom";

import Root from "./Component";
import "./index.css";
import "graphiql/graphiql.css";

render(<Root />, document.getElementById("graphiql"));
