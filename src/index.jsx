// import { hot } from "react-hot-loader/root";
import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { routes } from "./route";
import ConfigDB from "./data/customizer/config";
import { classes } from "./data/layouts";

import "./styles/index.css";

// Authentication
import Login from "./pages/authentication/loginWithBgImage";

// const MOUNT_NODE = document.getElementById("root");

const Root = (props) => {
  const [anim, setAnim] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const jwt_token = localStorage.getItem("token");
  debugger;

  const animation =
    localStorage.getItem("animation") ||
    ConfigDB.data.router_animation ||
    "fade";
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    setAnim(animation);
    setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Switch>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              component={Login}
            />

            {/* {jwt_token ? ( */}
            <App>
              <Route
                exact
                path={`${process.env.PUBLIC_URL}/`}
                render={() => {
                  return (
                    // <Redirect
                    //   to={`${process.env.PUBLIC_URL}/home/${layout}`}
                    // />
                    <Redirect to={`${process.env.PUBLIC_URL}/login`} />
                  );
                }}
              />
              <TransitionGroup>
                {routes.map(({ path, Component }) => (
                  <Route
                    key={path}
                    exact
                    path={`${process.env.PUBLIC_URL}${path}`}
                  >
                    {({ match }) => (
                      <CSSTransition
                        in={match != null}
                        timeout={100}
                        classNames={anim}
                        unmountOnExit
                      >
                        <div>
                          <Component />
                        </div>
                      </CSSTransition>
                    )}
                  </Route>
                ))}
              </TransitionGroup>
            </App>
            {/* ) : (
              <Redirect to={`${process.env.PUBLIC_URL}/login`} />
            )} */}
          </Switch>
        </BrowserRouter>
      </Provider>
    </Fragment>
  );
};

// const render = (Component) => {
//   ReactDOM.render(<Component />, MOUNT_NODE);
// };

// if (module.hot) {
//   // Hot reloadable translation json files and app
//   // modules.hot.accept does not accept dynamic dependencies,
//   // have to be constants at compile-time
//   module.hot.accept(["./components/app"], () => {
//     ReactDOM.unmountComponentAtNode(MOUNT_NODE);
//     render(Root);
//   });
// }

export default Root;

ReactDOM.render(<Root />, document.getElementById("root"));

serviceWorker.unregister();
