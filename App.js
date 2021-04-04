import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://fmarilao.tech/resumeData.json')
      .then(response => response.json())
      .then(data => {
        setInfo(data)
        setLoading(false)
        console.log(data.portfolio.projects)
      })
    // eslint-disable-next-line
  }, []);

  if(loading){
    return <View><Text>Cargando...</Text></View>
  }

  const projects = () => {
    return info.portfolio.projects.map((element, i) => {
      return(
      <View key={element.i}>
        <Text style={styles.text}>{element.title}</Text>
        <Text style={styles.text}>{element.url}</Text>
      </View>
      )
      })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.text}>{info.main.name}</Text>
      <Text style={styles.text}>{info.main.description}</Text>
      <Button title="LinkedIn"></Button>
      <Button title="Github"></Button>
      <Text style={styles.text}>{info.main.bio}</Text>
      <Text style={styles.titles}>{info.main.contactmessage}</Text>
      <Text style={styles.text}>🇦🇷 {info.main.address.street}</Text>
      <Text style={styles.text}>{info.main.address.city}</Text>
      <Text style={styles.text}>{info.main.phone}</Text>
      <Text style={styles.text}>{info.main.email}</Text>
      <Button title="English Resume"></Button>
      <Button title="Spanish Resume"></Button>
      <Text style={styles.titles}>Latest Projects</Text>
      <View>{projects()}</View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  titles: {
    color: '#fff',
    flex: 1,
    padding: 10,
  },
  scrollView: {
    width: Dimensions.get('window').width
  },
  view: {
    height: 40,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
