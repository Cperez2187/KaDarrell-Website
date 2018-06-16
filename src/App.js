import React from 'react';
import Button from '@material-ui/core/button';
import AppBar from '@material-ui/core/AppBar';


const App = () => {
  return (
    <div>
      <AppBar position="static" color="default" />
      <Button variant="raised" color="primary">
        Hello World
      </Button>
    </div>
  );
}

export default App;