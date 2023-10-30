import React, { useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [groceries, setGroceries] = useState([]);
  const [newItem, setNewItem] = useState('');

  const addGrocery = () => {
    if (newItem) {
      setGroceries([...groceries, { name: newItem, quantity: 1 }]);
      setNewItem('');
    }
  };

  const deleteGrocery = (index) => {
    const updatedGroceries = [...groceries];
    updatedGroceries.splice(index, 1);
    setGroceries(updatedGroceries);
  };

  const incrementQuantity = (index) => {
    const updatedGroceries = [...groceries];
    updatedGroceries[index].quantity++;
    setGroceries(updatedGroceries);
  };

  const decrementQuantity = (index) => {
    const updatedGroceries = [...groceries];
    if (updatedGroceries[index].quantity > 1) {
      updatedGroceries[index].quantity--;
      setGroceries(updatedGroceries);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Grocery List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new item"
          value={newItem}
          onChangeText={(text) => setNewItem(text)}
        />
        <Button title="Add" onPress={addGrocery} />
      </View>

      <FlatList
        data={groceries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Button title="+" onPress={() => incrementQuantity(index)} style={{color:'red'}} />
            <Text>{item.quantity}</Text>
            <Button title="-" onPress={() => decrementQuantity(index)} />
            <Button title="Delete" onPress={() => deleteGrocery(index)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10, // Increased margin to add more space
    marginLeft: 10,
  },
});
