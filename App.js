import React from 'react';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {BackHandler} from 'react-native';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import AddLivro from './src/screens/AddLivro';
import EditLivro from './src/screens/EditLivro';
import PesquisaAvancada from './src/screens/PesquisaAvancada';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#C0C0C0',
  },
};

handleBackPress = () => {
  if (Actions.currentScene === 'home' || Actions.currentScene === 'login') {
    BackHandler.exitApp();
    return false; //use false para as screens que queira sair ao apertar o "botao voltar"
  } else {
    Actions.pop();
    return true; //use true para as screens que nao queira sair ao apertar o "botao voltar"
  }  
};

export default App = () => {
  return (
    <PaperProvider theme={theme}>
      <Router backAndroidHandler={this.handleBackPress}>
        <Stack key="root">
          <Scene key="login" initial={true} component={Login} />
          <Scene key="home" component={Home} />
          <Scene key="addLivro" component={AddLivro} />
          <Scene key="editLivro" component={EditLivro} />
          <Scene key="pesquisaAvancada" component={PesquisaAvancada} />
        </Stack>
      </Router>
    </PaperProvider>
  );
};
