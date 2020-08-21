import React from 'react';
import './App.css';
import Nav from './components/Nav'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import ItemDetail from './components/ItemDetail'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="App">
        <Nav/>
        <Switch>
          <Route path="/" exact component={ItemForm}/>
          <Route path="/users" exact component={ItemList}/>
          <Route path="/users/:id" component={ItemDetail}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
