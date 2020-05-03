import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import SchoolSearchPage from './pages/SchoolSearchPage';
import SchoolPage from './pages/SchoolPage';

const App = () => {
  const isSearched: string | null = localStorage.getItem('schoolInfo');
  return (
    <Switch>
      <Route exact
        path ="/"
        render ={() => <SchoolSearchPage />} 
      />

      <Route exact
        path ="/page"
        render = {() => <SchoolPage />}
      />
    </Switch>
  );
}

export default App;
