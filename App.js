import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function App() {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://gitconnected.com/v1/portfolio/fmarilao')
      .then(response => response.json())
      .then(data => {
        setInfo(data)
        setLoading(false)
      })
    // eslint-disable-next-line
  }, []);

  if(loading){
    return <View><Text>Cargando...</Text></View>
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.text}>{info.basics.name}</Text>
      <Text style={styles.text}>{info.basics.label}</Text>
      <Button title="LinkedIn"></Button>
      <Button title="Github"></Button>
      <Text style={styles.text}>{info.basics.summary}</Text>
      <Text style={styles.titles}>Contact Details</Text>
      <Text style={styles.text}>🇦🇷 GMT -3</Text>
      <Text style={styles.text}>{info.basics.region}</Text>
      <Text style={styles.text}>{info.basics.phone}</Text>
      <Text style={styles.text}>{info.basics.email}</Text>
      <Button title="English Resume"></Button>
      <Button title="Spanish Resume"></Button>
      <Text style={styles.titles}>Latest Projects</Text>
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
