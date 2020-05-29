import React from "react";
import { Route, Switch, HashRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import MainLayout from './components/template/MainLayout';
import NotFound from './components/pages/Errors/404';

const App = () => {
    return(
        <HashRouter>
            <MainLayout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route component={NotFound}/>
                </Switch>
            </MainLayout>
        </HashRouter>
    );
}
export default App;