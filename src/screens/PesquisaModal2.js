import * as React from 'react';
import { Modal, Portal, Text, Button, Provider, TextInput } from 'react-native-paper';

export default class PesquisaModal2 extends React.Component {
  state = {
    visible: false,
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    return (
      <Provider>
         <Portal>
           <Modal visible={visible} onDismiss={this._hideModal}>
             <Text>Example Modal</Text>
             <TextInput label='Título' />
           </Modal>
           <Button
             style={{ marginTop: 30 }}
             onPress={this._showModal}
           >
             Show
           </Button>
         </Portal>
      </Provider>
    );
  }
}