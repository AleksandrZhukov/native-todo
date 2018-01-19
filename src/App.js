import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements'
import { addTodo, completeTodo, removeTodo } from './actions/todos';
import MS from 'react-native-multiple-styles';

function mapStateToProps(state) {
  return { ...state.todos };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo(todo) {
      return addTodo(dispatch, todo);
    },
    completeTodo(id) {
      return completeTodo(dispatch, id);
    },
    removeTodo(id) {
      return removeTodo(dispatch, id);
    }
  };
}

class App extends React.Component {
  state = {
    newItem: ''
  };

  handleOnChange = (value) => {
    this.setState({ newItem: value })
  };

  addItem = () => {
    if (this.state.newItem.length) {
      this.props.addTodo({ title: this.state.newItem });
      this.setState({ newItem: '' });
    }
  };

  renderListItem = ({ title, id, done }) => {
    return (
      <View key={id} style={styles.listItem}>
        <Text style={MS(styles.listItemName, { [styles.doneItem]: done })}>{title}</Text>
        {!done &&
         <TouchableOpacity activeOpacity={0.7} style={styles.itemIcon} onPress={() => this.props.completeTodo(id)}>
           <Icon name="check" size={20} color="#7cb8c3" />
         </TouchableOpacity>
        }
        {done &&
         <TouchableOpacity activeOpacity={0.7} style={styles.itemIcon} onPress={() => this.props.removeTodo(id)}>
           <Icon name="close" size={20} color="#7cb8c3" />
         </TouchableOpacity>
        }
      </View>
    );
  };

  renderNewItem() {
    return (
      <View style={styles.listItem}>
        <TextInput onChangeText={this.handleOnChange} autoFocus style={styles.listItemInput} value={this.state.newItem} />
        <TouchableOpacity activeOpacity={0.7} style={styles.addBtn} onPress={this.addItem}>
          <Icon name="add" size={20} color="#7cb8c3" />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { items } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Text style={styles.listTitle}>Todos</Text>
        {items.map(this.renderListItem)}
        {this.renderNewItem()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#7cb8c3',
    padding: 15
  },
  itemIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listTitle: {
    color: '#fff',
    paddingVertical: 10,
  },
  listItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    height: 35,
    marginBottom: 5,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  doneItem: {
    textDecorationLine: 'line-through',
  },
  listItemInput: {
    flex: 1
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
