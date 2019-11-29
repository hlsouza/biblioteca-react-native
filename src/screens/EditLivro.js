import React, { Component } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import Api from '../services/Api'
import { TextInput, Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'

export default class EditLivro extends Component {

  static navigationOptions = {
    title: 'EDITAR LIVRO',
    headerTitleStyle: {
      color: '#FFFFFF',
      fontSize: 14
    },
    headerStyle: {
      backgroundColor: '#3169E1'
    },
    headerTintColor: '#FFFFFF'
  };

  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      titulo: props.titulo,
      autor: props.autor,
      ano: props.ano.toString(),
      editora: props.editora
    }
  }
  
 editLivro = () => {
     if (this.dadosInvalidos()) {
      Alert.alert('Error: Algum campo preenchido de forma incorreta!')
      return;
    }      
    Api.put(`/api/livro/${this.state.id}`,
     {  titulo: this.state.titulo, 
        autor: this.state.autor, 
        ano: this.state.ano,
        editora: this.state.editora
     },
     {
      headers: {
        'Content-Type': 'application/json',
      } })
        .then( () => { Alert.alert('Livro editado!')
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
        <Button color='#1E90FF' mode='contained' onPress={this.editLivro}>
          Editar
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
    backgroundColor: '#ffffff',
  },
  activityIndicator: {
    marginTop: 300,
    alignItems: 'center'
  }
})