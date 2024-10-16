import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {
  AddCircle,
  CloseCircle,
  TickCircle,
  Trash,
  Edit2,
} from 'iconsax-react-native';

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const saveTodos = async (saveTodo) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(saveTodo));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const storedData = await AsyncStorage.getItem('todos');
      if (storedData) {
        setTodos(JSON.parse(storedData));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter((item) => item.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const completeTodo = async (id) => {
    const updatedTodos = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const updateTodos = (id) => {
    const exitingTodo = todos.find((item) => item.id === id);
    if (!exitingTodo) return;

    Alert.prompt(
      'Edit Todo',
      'Update',
      (newUpdateText) => {
        if (newUpdateText) {
          const updateTodos = todos.map((item) =>
            item.id === id ? { ...item, text: newUpdateText } : item
          );
          setTodos(updateTodos);
          saveTodos(updateTodos);
        }
      },
      'plain-text',
      exitingTodo.text
    );
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = () => {
    if (todo.trim() === '') {
      Alert.alert('Error', 'Todo cannot be empty!');
      return;
    }
    const updatedTodos = [...todos, { id: uuid.v4(), text: todo }];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setTodo('');
  };

  return (
    <LinearGradient colors={['#A7E6FF', '#3572EF']} style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headerText}>{"<< "}TO-DO LIST{" >>"}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={todo}
            onChangeText={(text) => setTodo(text)}
            placeholder="Type a Todo"
            style={styles.input}
          />
          <TouchableOpacity
            onPress={addTodo}
            style={[styles.button, styles.addButton]}
          >
            <AddCircle size="32" color="#332FD0" variant="Broken" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text
                style={[
                  styles.todoText,
                  item.completed && styles.completedText,
                ]}
              >
                {item.text}
              </Text>

              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                  onPress={() => completeTodo(item.id)}
                  style={[styles.button, styles.completeButton]}
                >
                  {item.completed ? (
                    <CloseCircle size="27" color="#54B435" variant="Broken" />
                  ) : (
                    <TickCircle size="27" color="#332FD0" variant="Broken" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => deleteTodo(item.id)}
                  style={[styles.button, styles.deleteButton]}
                >
                  <Trash size="27" color="#EA047E" variant="Broken" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => updateTodos(item.id)}
                  style={[styles.button, styles.updateButton]}
                >
                  <Edit2 size="27" color="#54B435" variant="Broken" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    marginBottom: 15,
    marginTop: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'#332FD0'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    flex: 1,
    borderRadius: 10,
    borderColor: 'gray',
  },
  button: {
    marginLeft: 10,
    borderRadius: 5,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  todoText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
    fontSize: 15,
  },
  completeButton: {
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  },
  updateButton: {
    padding: 10,
  },
});
