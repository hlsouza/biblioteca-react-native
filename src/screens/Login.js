import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Text,
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
    };
  }

  static navigationOptions = {
    header: null,
  };

  handleClickLogin = () => {
    if (this.state.login === 'Admin' && this.state.senha === 'admin') {
      this.setState({errorLogin: false});
      Actions.home();
    } else {
      this.setState({errorLogin: true});
    }
  };

  render() {
    return (
      <View style={styles.container}>
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
    justifyContent: 'center',
    backgroundColor: '#B0C4DE',
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
