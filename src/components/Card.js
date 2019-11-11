import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Text,
} from 'react-native';
import Api from '../services/Api';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  removeLivroClick = () => {
    //Api.delete('/api/biblioteca/livro/' + this.props.id)
    Api.delete(`/api/biblioteca/livro/${this.props.id}`)
      .then(() => {
        Alert.alert('Livro removido!');
        Actions.home();
      })
      .catch(error => {
        Alert.alert('Erro: ' + error);
      });
    //this.props.setStateLivrosZerar()
  };

  editaLivroClick = () => {
    Actions.editLivro({
      id: this.props.id,
      titulo: this.props.titulo,
      autor: this.props.autor,
      ano: this.props.ano,
      editora: this.props.editora,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            source={require('../../assets/imgs/livro_logo_card.png')}></Image>
        </View>
        <View style={styles.container2}>
          <Text>
            <Text style={styles.fontBold}>Título: </Text>
            <Text>{this.props.titulo}</Text>
          </Text>
          <Text>
            <Text style={styles.fontBold}>Autor: </Text>
            <Text>{this.props.autor}</Text>
          </Text>
          <Text>
            <Text style={styles.fontBold}>Ano: </Text>
            <Text>{this.props.ano}</Text>
          </Text>
          <Text>
            <Text style={styles.fontBold}>Editora: </Text>
            <Text>{this.props.editora}</Text>
          </Text>
          <Text># {this.props.id}</Text>
        </View>
        <View style={styles.container3}>
          <TouchableOpacity onPress={this.editaLivroClick}>
            <Icon name="edit" size={28} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.removeLivroClick}>
            <Icon name="remove" size={28} color="#FF0000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 4,
    borderWidth: 0.5,
    borderBottomWidth: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 1,
    shadowOpacity: 1.0,
    elevation: 5,
    borderColor: '#d6d7da',
    height: 155,
    width: '95%',
    marginBottom: 10,
    padding: 5,
    fontSize: 18,
  },
  container2: {
    //display: 'flex',
    flexDirection: 'column',
    width: '55%',
  },
  container3: {
    //display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '17%',
    //marginLeft: '8%',
  },
  fontBold: {
    fontWeight: 'bold',
  },
});
