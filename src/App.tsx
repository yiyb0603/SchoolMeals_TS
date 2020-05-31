import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import SchoolSearchPage from './pages/SchoolSearchPage';
import SchoolPage from './pages/SchoolPage';
import SchoolSchedulePage from './pages/SchoolSchedulePage';

const App = () => {
  const isSearched: string | null = localStorage.getItem('schoolInfo');
  return (
    <Switch>
      <Route exact
        path ="/"
        render ={() => <SchoolSearchPage />} 
      />

      <Route exact
        path ="/schedule"
        render ={() => <SchoolSchedulePage />} 
      />

      <Route exact
        path ="/page"
        render = {() => <SchoolPage />}
      />
    </Switch>
  );
}

export default App;
