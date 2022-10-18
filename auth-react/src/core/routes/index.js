import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RoutesArray from './routes';

const RoutesPage = () => {
  return (
    <Switch>
      {RoutesArray?.map((routeObj, index) => {
        return (
          <Route
            path={routeObj.path}
            key={index}
            exact={routeObj.isExact}
            render={(routerProps) => (
              <routeObj.page
                key={routerProps.match.params[routeObj.key] || index}
              />
            )}
          />
        );
      })}
    </Switch>
  );
};

export default RoutesPage;
