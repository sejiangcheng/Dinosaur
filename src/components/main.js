import { hot } from "react-hot-loader/root";
import React from "react";
import "./style.less";
import { Redirect, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import Customer from "./customer";
import User from "./user";
import Role from "./role";
function Platform(props) {
  const basePath = props.match.path;
  return (
    <div className="platform-wrapper">
      <Switch>
        <Route path={`${basePath}/customer`} component={Customer} />
        <Route path={[`${basePath}/user`]} component={User} />
        <Route path={`${basePath}/role`} component={Role} />
        <Redirect to={`${basePath}/customer`} from={basePath} exact />
      </Switch>
    </div>
  );
}
export default hot(withRouter(Platform));
