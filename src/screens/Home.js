import React, {Component} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  View,
  Alert,
  StatusBar,
} from 'react-native';
import Api from '../services/Api';
import Card from '../components/Card';
import PesquisaAvancadaModal from '../components/PesquisaAvancadaModal';
import {Appbar, Button} from 'react-native-paper';
import {Actions} from 'react-native-router-flux';

export default class Home extends Component {
  static navigationOptions = {
    header: null,
  };
 
  constructor(props) {
    super(props);
    this.state = {
      livros: [],
      loading: true,
      modalVisible: false,
    };
    this.modalVisibleHandler = this.modalVisibleHandler.bind(this)
    this.pesquisaAvancadaHandler = this.pesquisaAvancadaHandler.bind(this)
  }

  componentDidMount() {
    Api.get('/api/livro')
      .then(response => {
        this.setState({livros: response.data, loading: false});
      })
      .catch(error => {
        Alert.alert('Erro: ' + error);
      });
  }

  modalVisibleHandler(visible) {
    this.setState({modalVisible: visible})
  }

  pesquisaAvancadaHandler(livros) {
    this.setState({livros: livros})
  }

  addLivroClick = () => {
    Actions.addLivro();
  };
  
  showHideModal = () => { 
      this.setState({modalVisible: !this.state.modalVisible})
  }

  showModal = () => {
    this.setState({modalVisible: true})
  }

  hideModal = () => {
    this.setState({modalVisible: false})
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
      />
    ));
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#3169E1" barStyle="light-content" />
        <View>
          <Appbar style={styles.appbar}>
            <Button
              color="#FFFFFF"
              icon="plus-box-outline"
              mode="text"
              onPress={this.addLivroClick}>
              Adicionar livro
            </Button>
            <Button
              color="#FFFFFF"
              icon="folder-search-outline"
              mode="text"
              onPress={this.showModal}>
              Pesquisar
            </Button>
          </Appbar>
        </View>
        <ScrollView
          contentContainerStyle={styles.container2Content}
          style={styles.container2}>
          {this.state.loading && (
            <ActivityIndicator
              size="large"
              color="#F89F06"
              style={styles.activityIndicator}
            />
          )}
          {!this.state.loading && livros}
        </ScrollView>
        <PesquisaAvancadaModal visible={this.state.modalVisible} visibleHandler={this.modalVisibleHandler}
          livrosHandler={this.pesquisaAvancadaHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2Content: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  container2: {
    padding: 5,
    backgroundColor: '#CCCCCC',
  },
  activityIndicator: {
    marginTop: 300,
    alignItems: 'center',
  },
  appbar: {
    //position: 'absolute', //coloca appbar embaixo
    justifyContent: 'space-between',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#3169E1',
  },
});
