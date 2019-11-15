import React, { Component } from 'react'
import { StyleSheet, View, Alert, ScrollView, ActivityIndicator } from 'react-native'
import Api from '../services/Api'
import { TextInput, Button } from 'react-native-paper'
import Card from '../components/Card'

export default class PesquisaAvancada extends Component {

  static navigationOptions = {
    title: 'PESQUISA AVANÇADA',
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
      livros: [],
      titulo: '',
      autor: '',
      ano: '',
      editora: '',
      loading: false,
    }
  }

  montaQuery = () => {
    query = ''
    if (this.state.titulo !== '') {
      query+='&titulo=' + this.state.titulo
    }
    if (this.state.autor !== '') {
      query+='&autor=' + this.state.autor
    }
    if (this.state.ano !== '') {
      query+='&ano=' + this.state.ano
    }
    if (this.state.editora !== '') {
      query+='&editora=' + this.state.editora
    }
    if (query.length > 0) {
      query = query.replace('&','?')
   }
    return query
  }
  
  pesquisaAvancadaClick = () => {
    this.setState({loading: true})
    query = this.montaQuery()
    Api.get('/api/biblioteca/livroBuscaAvancada' + query)
    .then( (response) => { this.setState( {livros: response.data, loading: false } )})
    .catch( (error) => { Alert.alert('Erro: ' + error)})
    //Alert.alert('/api/biblioteca/livroBuscaAvancada' + query)
  }

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
        <View style={styles.container3}>
          {/*<Text>{this.state.titulo}</Text>*/}
          <TextInput style={styles.item} label='Título' value={this.state.titulo} onChangeText={ (titulo) => this.setState( {titulo} ) } />
          <TextInput style={styles.item} label='Autor' value={this.state.autor} onChangeText={ (autor) => this.setState({autor})} />
          <TextInput style={styles.item} label='Ano' keyboardType='numeric' maxLength={4} value={this.state.ano} onChangeText={ (ano) => this.setState({ano})} />
          <TextInput style={styles.item} label='Editora' value={this.state.editora} onChangeText={ (editora) => this.setState({editora})} />
          <Button color='#1E90FF' mode='contained' onPress={this.pesquisaAvancadaClick}>
            Pesquisar
          </Button>
        </View>
        <ScrollView style={styles.container2}>
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
  container2: {
    backgroundColor: '#CCCCCC',
  },
  container3: {
    padding: 15,
    backgroundColor: '#CCCCCC'
  },
  item: {
    height: 45,
    marginBottom: 10
  },
  activityIndicator: {
    marginTop: 120,
    alignItems: 'center'
  },
})