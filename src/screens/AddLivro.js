import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Api from '../services/Api'
import { TextInput, Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'

export default class AddLivro extends Component {

  static navigationOptions = {
    title: 'ADICIONAR LIVRO',
    headerTitleStyle: {
      color: '#FFFFFF',
      fontSize: 14
    },
    headerStyle: {
      backgroundColor: '#3169E1'
    },
    headerTintColor: '#FFFFFF'
  };

  constructor() {
    super()
    this.state = {
      titulo: '',
      autor: '',
      ano: '',
      editora: ''
    }
  }
  
 saveLivro = () => {
    if (this.dadosInvalidos()) {
      Alert.alert('Error: Algum campo preenchido de forma incorreta!')
      return;
    }
      
    Api.post('/api/livro',
     {  titulo: this.state.titulo, 
        autor: this.state.autor, 
        ano: this.state.ano,
        editora: this.state.editora
     },
     {
      headers: {
        'Content-Type': 'application/json',
      } })
        .then( response => { Alert.alert('Livro ' + response.data.titulo + ' cadastrado!')
                              Actions.home() })
        .catch( error => { Alert.alert('Error: ' + error) })
  }

  dadosInvalidos() {
    dadosInvalidos = false
    if (this.state.titulo === '' || this.state.titulo === null || this.state.titulo === undefined) {
      dadosInvalidos = true
    }
    if (this.state.autor === '' || this.state.autor === null || this.state.autor === undefined) {
      dadosInvalidos = true;
    }
    if (this.state.ano === '' || this.state.ano === null || this.state.ano === undefined) {
      dadosInvalidos = true;
    }
    if (this.state.editora === '' || this.state.editora === null || this.state.editora === undefined) {
      dadosInvalidos = true;
    }
    return dadosInvalidos
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.item} label='Título' value={this.state.titulo} onChangeText={ (titulo) => this.setState( {titulo} ) } />
        <TextInput style={styles.item} label='Autor' value={this.state.autor} onChangeText={ (autor) => this.setState({autor})} />
        <TextInput style={styles.item} label='Ano' keyboardType='numeric' maxLength={4} value={this.state.ano} onChangeText={ (ano) => this.setState({ano})} />
        <TextInput style={styles.item} label='Editora' value={this.state.editora} onChangeText={ (editora) => this.setState({editora})} />
        <Button color='#1E90FF' mode='contained' onPress={this.saveLivro}>
          Salvar
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#CCCCCC'
  },
  item: {
    height: 45,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  activityIndicator: {
    marginTop: 300,
    alignItems: 'center'
  }
})