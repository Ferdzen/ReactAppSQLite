import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tela1 from './src/components/tela1';
import Tela2 from './src/components/tela2';
import Tela3 from './src/components/tela3';

import config from './src/database/config';
import {createConnection} from 'typeorm'
import { useEffect, useCallback } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const connect = useCallback ( async () => {
    try{
      const connection = await createConnection(config);
      
      //create shoes
      await connection.getRepository("Tenis").save({
        brand: "Nike",
        model: "Airforce",
        price: 350.00
      });

      //get shoes
      const shoes = await connection.getRepository("Tenis").find();
      console.log(shoes); //empty at first run

    }catch (err){
      console.log(err);
    }
  })

  useEffect(() => {
    connect()
  }, [])
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Tela1} />
        <Stack.Screen name="Secundaria" component={Tela2} />
        <Stack.Screen name="Terciaria" component={Tela3} />
        <Stack.Screen
          name="tela2"
          component={Tela2}
          options={({ route }) => ({ title: route.params.titulo })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}