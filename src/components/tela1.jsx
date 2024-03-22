import React, { useCallback } from "react";
import { View, Text, StyleSheet }from 'react-native';
import { Button } from "react-native-web";

import { getConnection } from "typeorm";

export default function Tela1({ navigation }) {
    
    
    const carregarDados = useCallback(async () => {
        const connection = getConnection();
        const shoes = await connection.getRepository("Tenis").find()

        setTexto(`ID: ${shoes[0].id} marca: ${shoes[0].brand} Modelo: ${shoes[0].model} Preço: ${shoes[0].price}`)
    })


    return (
        <View>
            <Text>Olá</Text>
            <Button
                title="Clique"
                onPress={
                    () => {
                        navigation.navigate('Secundaria', {
                            nomeUsuario: "Fernanda",
                            idade: 23,
                            titulo: "bolacha"
                        })
                    }
                }
            />

            <Text style={styles.heading}>Tênis Cadastrados</Text>
            <Button title="Exibir" onPress={carregarDados} />
        </View>

    );

}

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