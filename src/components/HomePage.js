import 'react-native-gesture-handler';
import React, { useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Teletrabajo',
    id_api: '158555'
  },
  {
    id: '48694a0f-3da1-471f-bd96-ff5571e29d72',
    title: 'Array',
    id_api: '21565793'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Coche',
    id_api: '13673345'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Flores',
    id_api: '4576465'
  }
  
];

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const HomePage = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#7130ff" : "#a982ff";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          navigation.navigate('details', {id: item.id_api});
        }}
        style={{ backgroundColor }}
      />
    );
  };

  
  let request = '';
  return (
    <SafeAreaView style={styles.body}>
      <Animatable.View animation="fadeInDown" delay={200.0} style={styles.header}>
        <Image source={{ uri: 'https://s1.eestatic.com/2020/09/24/omicrono/internet-wikipedia-paginas_web_523208647_160801165_1024x576.jpg' }}
          style={{ width: '100%', height: 130 }} />
      </Animatable.View>
      <View style={styles.formContainer}>
        <Animatable.View animation="slideInLeft" delay={500.0}>
          <TextInput style={styles.input}
            underlineColorAndroid="transparent"
            placeholder= "Buscar"
            placeholderTextColor="#000000"
            autoCapitalize="none"
            onChangeText={(text) => request = text.replace(' ', '_').replace(/ /g, '|') }
            />
        </Animatable.View>
        <Animatable.View animation="lightSpeedIn" delay={700.0}>
          <Button color="#a982ff"
            title="Buscar"
            onPress={() => {request !== '' ? navigation.navigate('find', {text: request}) : Alert.alert('Introduce un término de búsqueda')}}
          />
        </Animatable.View>

      </View>
      <View style={styles.divider} />
      <Animatable.View animation="bounceIn" style={styles.listContainer} delay={900.0}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </Animatable.View>
    </SafeAreaView>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 20,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    borderRadius: 10
  },
  formContainer: {
    padding: 20,
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#bfbfbf'
  },
  item: {
    backgroundColor: '#c7cfff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  title: {
    fontSize: 32,
  },
  divider: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 14,
    borderWidth: 0.5,
    borderColor: 'black',
    opacity: 0.1
  },
  header: {
    flex: 0.5,
  }
});