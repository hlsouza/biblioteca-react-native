import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, ScrollView, View, Alert } from 'react-native'
import Api from '../services/Api'
import Card from '../components/Card'
import { Appbar, Button } from 'react-native-paper'
import { Actions } from 'react-native-router-flux'

export default class Home extends Component {

  static navigationOptions = {
    header: null
  };

  constructor() {
    super()
    this.state = {
      livros: [],
      loading: true,
    }
  }

  componentDidMount() {
      Api.get('/api/biblioteca/livro')
        .then( (response) => { this.setState({ livros: response.data, loading: false })})
        .catch( (error) => { Alert.alert('Erro: ' + error)})
  }

  addLivroClick = () => {
    Actions.addLivro()
  }

  pesquisaAvancadaClick = () => {
    Actions.pesquisaAvancada()
  }

  //setStateLivrosZerar = () => {
    //this.setState({ livros: [] })
  //}

  /*setStateEditora = (novaEditora, i) => {
    this.setState(state => {
      const livros = state.livros.map((livro, j) => {
        if (j === i) {
          livro.editora = novaEditora 
          return livro
        } else {
          return livro
        }
      });
      return {
        livros,
      };
    });
  };*/


  render() {
    const livros = this.state.livros.map(livro => (
      <Card 
        key={livro.id}
        id={livro.id} 
        titulo={livro.titulo}
        autor={livro.autor}
        ano={livro.ano}
        editora={livro.editora}
        setStateEditora={this.setStateEditora} />
    ))
    return (
      <View style={styles.container}>
        <View>
          <Appbar style={styles.appbar}>
            <Button color="#FFFFFF" icon="plus-box-outline" mode="text" onPress={this.addLivroClick}>
              Adicionar livro
            </Button>
            <Button color="#FFFFFF" icon="folder-search-outline" mode="text" onPress={this.pesquisaAvancadaClick}>
              Pesquisar
            </Button>
          </Appbar>
        </View>
        <ScrollView contentContainerStyle={styles.container2Content} style={styles.container2}>
          {this.state.loading && 
            <ActivityIndicator size="large" color="#F89F06" style={styles.activityIndicator} />}
          {!this.state.loading && livros}        
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({ 
  container: {
    flex: 1
  },
  container2Content:{
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container2: {
    padding: 5,
    backgroundColor: '#CCCCCC'
  },
  activityIndicator: {
    marginTop: 300,
    alignItems: 'center'
  },
  appbar: {
    //position: 'absolute', //coloca baixa embaixo
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3169E1'
  },
})