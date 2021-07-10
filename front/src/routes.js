import React from 'react';
import {BrowserRouter,Route, Switch} from 'reat-router-dom';

import Incidents from './components/Incidents';

export default function Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component ={Incidents} />
            </Switch>
        </BrowserRouter>
    );
}