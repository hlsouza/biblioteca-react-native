import React from 'react' 
import { Router, Scene, Stack } from 'react-native-router-flux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Login from './src/screens/Login'
import Home from './src/screens/Home'
import AddLivro from './src/screens/AddLivro'
import EditLivro from './src/screens/EditLivro'
import PesquisaAvancada from './src/screens/PesquisaAvancada'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C0C0C0',
  },
};


export default App = () => { 
  return (
    <PaperProvider theme={theme}>
      <Router>
        <Stack key='root'>
          <Scene key='login' initial={true} component={Login} />
          <Scene key='home' component={Home} />
          <Scene key='addLivro' component={AddLivro} />
          <Scene key='editLivro' component={EditLivro} />
          <Scene key='pesquisaAvancada' component={PesquisaAvancada} />
        </Stack>
      </Router>
    </PaperProvider>
  )
}
