import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ErrorBoundary from '../components/errorBoundary';
import routers from './BaseRouteConfig';

function BaseRoute() {
  return (
    <HashRouter>
      <Switch>
        <ErrorBoundary>
          {routers.map((router) => (
            <Route
              key={router.path}
              exact={router.exact}
              path={router.path}
              render={() => (
                <div>
                  <router.component>
                    {router.children?.map((item) => (
                      <Route
                        exact={item.exact}
                        path={item.path}
                        component={item.component}
                        key={item.path}
                      />
                    ))}
                  </router.component>
                </div>
              )}
            />
          ))}
        </ErrorBoundary>
      </Switch>
    </HashRouter>
  );
}

export default BaseRoute;
