import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Text,
  StatusBar,
  Alert,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      login: '',
      senha: '',
      errorLogin: false,
      autenticado: false,
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleClickLogin = () => {
    params = '?login=' + this.state.login + '&password=' + this.state.senha;
    Api.get('/api/user/autentica' + params)
      .then(response => {
        this.setState({autenticado: response.data});
        if (this.state.autenticado == true) {
          this.setState({errorLogin: false});
          Actions.home();
        } else {
          this.setState({errorLogin: true});
        }
      })
      .catch(error => {
        Alert.alert('Erro: ' + error);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#B0C4DE" barStyle="light-content" />
        <View style={styles.containerHeader}>
          <Image source={require('../../assets/imgs/livro_logo.png')}></Image>
        </View>
        <KeyboardAvoidingView
          style={styles.containerForm}
          behavior="padding"
          enabled>
          <TextInput
            label="Login"
            autoCorrect={false}
            onChangeText={login => this.setState({login})}
            style={styles.input}
            value={this.state.login}
          />
          <TextInput
            label="Senha"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={senha => this.setState({senha})}
            style={styles.input}
            value={this.state.senha}
          />
          <Button
            color="#1E90FF"
            mode="contained"
            onPress={this.handleClickLogin}>
            Entrar
          </Button>
          {this.state.errorLogin && (
            <Text style={styles.text}>Usuário/senha inválido(s)!</Text>
          )}
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
    justifyContent: 'flex-start',
    //justifyContent: 'center', //centralizar verticalmente
    backgroundColor: '#B0C4DE',
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '35%', //retirar se for centralizar verticalmente
    marginBottom: 20,
  },
  containerForm: {
    padding: 15,
  },
  input: {
    height: 45,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  text: {
    textAlign: 'center',
    color: 'red',
  },
});
