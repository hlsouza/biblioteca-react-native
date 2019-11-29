import React from 'react'
import {View, StyleSheet, Alert} from 'react-native'
import {Modal, Portal, Text, Button, Provider, TextInput} from 'react-native-paper'
import Api from '../services/Api'

export default class PesquisaAvancadaModal extends React.Component {
  
  static navigationOptions = {
    headerTintColor: '#FFFFFF'
  };

  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible,
      livros: [],
      titulo: '',
      autor: '',
      ano: '',
      editora: '',
      loading: false,
    } 
  }

  componentWillReceiveProps({visible}) {
    this.setState({visible: visible})
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
    Api.get('/api/livroBuscaAvancada' + query)
    .then( (response) => { this.setState( {livros: response.data, loading: false } )
                           this.props.livrosHandler(this.state.livros)
                           this.hideModal() })
    .catch( (error) => { Alert.alert('Erro: ' + error)})
  }

  showHideModal = () => this.setState({visible: !this.state.visible});

  showModal = () => this.setState({visible: true});

  hideModal = () => {
    this.setState({visible: false});
    this.props.visibleHandler(false)
  }

  render() {
    return (
        <Portal>
          <Modal visible={this.state.visible} onDismiss={this.hideModal}>
            <View style={styles.containerView}>
              <Text style={styles.title}>PESQUISA AVANÇADA</Text>
              <TextInput style={styles.item} label='Título' value={this.state.titulo} onChangeText={ (titulo) => this.setState( {titulo} ) } />
              <TextInput style={styles.item} label='Autor' value={this.state.autor} onChangeText={ (autor) => this.setState({autor})} />
              <TextInput style={styles.item} label='Ano' keyboardType='numeric' maxLength={4} value={this.state.ano} onChangeText={ (ano) => this.setState({ano})} />
              <TextInput style={styles.item} label='Editora' value={this.state.editora} onChangeText={ (editora) => this.setState({editora})} />
              <Button color='#1E90FF' mode='contained' onPress={this.pesquisaAvancadaClick}>
                Pesquisar
              </Button>
            </View>
          </Modal>
        </Portal>
    );
  }
}

const styles = StyleSheet.create({ 
  containerView: {
    marginLeft: 50,
    marginRight: 50,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 1.0,
    elevation: 5,
    borderColor: '#d6d7da',
  },
  title: {
    textAlign: 'center',
    color: 'white',
    backgroundColor: '#3169E1',
    marginBottom: '5%',
    padding: '5%',
    borderRadius: 4,
  },
  item: {
    height: 45,
    marginBottom: 10,
  },
  activityIndicator: {
    marginTop: 120,
    alignItems: 'center'
  },
})