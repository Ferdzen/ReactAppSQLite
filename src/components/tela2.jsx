import React from "react";
import { Text, View } from 'react-native';
import { Button } from "react-native-web";

export default function Tela2({route, navigation}){
    
    //const {nomeUsuario, idade} = route.params;
    return(
        <View>

            <Text>Bão</Text>
    
            <Text>Nome do usuário: {route.params.nomeUsuario}</Text>
            <Text>Idade: {route.params.idade}</Text>
            <Button 
            title="Clique" 
            onPress={ 
                () =>{navigation.navigate('Terciaria')}
            }
            />
        </View>
    );
}