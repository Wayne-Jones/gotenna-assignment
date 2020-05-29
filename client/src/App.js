import React from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { Container } from '@material-ui/core/';
import Gallery from './components/Gallery';

let theme = createMuiTheme({
  body: {
    fontFamily: '"Roboto" , "Helvetica Neue", sans-serif',
    maxWidth: '1140px',
    fontSize: '16px',
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Gallery />
      </Container>
    </ThemeProvider>
  );
}

export default App;
