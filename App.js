import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image, ScrollView, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Card, Menu } from 'react-native-paper';

import axios from 'axios';
import { Button } from '@rneui/themed';

const uri = 'https://sistem.academiaextremeapocalipse.com.br/storage/'



function ListScreen({ navigation }) {

  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    axios.get('https://sistem.academiaextremeapocalipse.com.br/api/alunos')
      .then(response => {
        setData(response.data.data.slice(80, 400));
       
      });
  }, []);




  return (
    <ScrollView style={{ marginTop: 50 }}>
       {data.map((pokemon, index) => (
        <View  key={pokemon.id}>

         <Card style={{width:400, height:400, margin:2 }}>
          <Card.Cover
         
           style={{ alignSelf: "center", width:200, height:200 }}          
           source={{ uri:uri+pokemon.avatar}} />
          <Card.Content>
          

          <Text style={styles.textNome}>{pokemon.nome}
          </Text>

        

          <Button 
          color={pokemon.statusPG == 'falso' ? 'error' : 'success'} 
          title={pokemon.statusPG == 'falso' ? 'Devendo' : 'Esta em Dia'} 
          style={{marginBottom:10}}
          onPress={() => navigation.navigate('Details', { pokemon, index })}
          />
          
          <Button
              style={{}}
              title={pokemon.nome}
              onPress={() => navigation.navigate('Details', { pokemon, index })} />

        <Button 
        onPress={() => navigation.navigate('Cadastrar Alunos')}
        >Pagamento</Button>
          </Card.Content>
        </Card>
        </View>
      ))}
    </ScrollView>

    

  )
}


function DetailsScreen({ route, navigation

 }) {

  const handlePress = () => {
    Linking.openURL('https://api.whatsapp.com/send?phone=5521%20990271287');
  }
  const { pokemon, index } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Text style={{marginTop:30, color:'#000', fontWeight:'bold', fontSize:25}}>Detalhes do Pokémon</Text>
      <Image
        source={{uri:uri+pokemon.avatar }}
        style={{ width: 100, height: 100, marginBottom: 0, resizeMode:'cover' }}
      />
      <Text style={{fontSize:20, fontWeight:'bold'}}>Nome: {pokemon.nome}</Text>
      <Button onPress={handlePress} title="Open WhatsApp" />
    </View>
  );
}




function submitForm(data) {

  axios.post('https://sistem.academiaextremeapocalipse.com.br/api/alunos', {
    nome: 'ROGER TETETETETET',

  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    // console.log(error);
  });
}

function PagamentoScreen({ navigation }) {

  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [status, setStatus] = useState('');
  const [instagram, setInstagram] = useState('');
  const [avatar, setAvatar] = useState('');

  return (
    <View>
    <TextInput
      placeholder="Nome"
      value={nome}
      onChangeText={setNome}
    />
    <TextInput
      placeholder="Senha"
      value={password}
      onChangeText={setPassword}
    />
    <TextInput
      placeholder="WhatsApp"
      value={whatsapp}
      onChangeText={setWhatsapp}
    />
    <TextInput
      placeholder="Status"
      value={status}
      onChangeText={setStatus}
    />
    <TextInput
      placeholder="Instagram"
      value={instagram}
      onChangeText={setInstagram}
    />
    <TextInput
      placeholder="Avatar"
      value={avatar}
      onChangeText={setAvatar}
    />
    <Button
      title="Enviar"
      onPress={() => submitForm({ nome, password, whatsapp, status, instagram, avatar })}
    />
  </View>
  );
}


function NextScreen({ navigation }) {
  return (
    <View>
      <Text>Próxima tela</Text>
      <Button
        title="Voltar para a tela inicial"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}
const Stack = createStackNavigator();





export default function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Test">
      <Stack.Screen name="Listar Alunos" component={ListScreen} />
        <Stack.Screen name="Cadastrar Alunos" component={PagamentoScreen} />
         <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10

  },
  ViewAlunos:{    
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',  
    borderWidth: 1, 
    borderLeftWidth: 10

  },
  textNome:{
   textAlign:'center', 
            fontSize:20, fontWeight:'bold', 
            marginBottom:20, marginTop:20
  },

  button: {
    marginTop:10,
    backgroundColor: 'red',
    width: 80,
  },
});
