import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { getConnection } from "typeorm";

const App = () => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [shoes, setShoes] = useState([]);
  let connection;

  const connect = useCallback(async () => {
    try {
      connection = await getConnection();
      await getShoes(); // Chamar a função getShoes ao conectar
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    connect();
  }, [connect]);

  const getShoes = async () => { // Captura todos os cadastrados
    try {
      const shoesList = await connection.getRepository('Tenis').find();
      setShoes(shoesList);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddShoe = async () => {
    if (brand && model && price) {
      const newShoe = { brand, model, price };
      setShoes([...shoes, newShoe]);

      try {
        await connection.getRepository('Tenis').save(newShoe);
        await getShoes(); // Chamar a função getShoes após adicionar um novo item
      } catch (err) {
        console.log(err);
      }

      setBrand('');
      setModel('');
      setPrice('');
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Cadastro de Tênis</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={brand}
        onChangeText={text => setBrand(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={model}
        onChangeText={text => setModel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        onChangeText={text => setPrice(text)}
        keyboardType="numeric"
      />
      <Button title="Cadastrar Tênis" onPress={handleAddShoe} />
      
      <Text style={styles.heading}>Tênis Cadastrados</Text>
      <FlatList
        data={shoes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{`Marca: ${item.brand}`}</Text>
            <Text>{`Modelo: ${item.model}`}</Text>
            <Text>{`Preço: ${item.price}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default App;
