import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import Products from './pages/Products';
import Orders from './pages/Orders';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
          <Route path="/home" component={Home} />
          <Route path="/placeOrder/:id" component={Products} />
          <Route path="/orders/:id" component={Orders} />
          <Route path="/:page" component={NotFoundPage} />
          <Route path="/" component={Home} />
          <Redirect to="/:page"/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
