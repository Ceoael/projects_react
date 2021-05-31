import React, {useState} from 'react';
import {Switch, Route, useLocation} from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';

import './App.css';

import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';

import ProjectsPresentation from './components/ProjectPresentation/ProjectsPresentation';
import PomodoroBuilder from './pomodoro/containers/pomodoroBuilder/PomodoroBuilder';
import Todo from './todo/containers/TodoAppBuilder/TodoAppBuilder';
import RouteAnim from './components/RouteAnim/RouteAnim';

import {Provider} from 'react-redux';
import store from './pomodoro/store/store';

function App() {
  const location = useLocation();

  const [show, setShow] = useState(false);

  return (
    <div>
      <Toolbar openSideDrawer={() => setShow(true)}/>
      <SideDrawer closeSideDrawer={() => setShow(false)} show={show}/>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/pomodoro" exact >
              <RouteAnim>
                <Provider store={store}>
                  <PomodoroBuilder />
                </Provider>
              </RouteAnim>
              </Route>
            <Route path="/todo" exact >
              <RouteAnim>
                <Todo />
              </RouteAnim>
            </Route>
            <Route path='*'>
              <RouteAnim>
                <ProjectsPresentation />
              </RouteAnim>
            </Route>
          </Switch>
        </AnimatePresence>
    </div>
  );
}

export default App;
