import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, SocialIcon } from 'react-native-elements';
import { Dimensions, TextInput, Linking, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useFormik } from 'formik'

export default function App() {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    onSubmit: x => console.warn(x)
  })

  useEffect(() => {
    fetch('http://fmarilao.tech/resumeData.json')
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

  const loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };


  const projects = () => {
    return info.portfolio.projects.map((element, i) => {
      return(
      <View key={i} style={styles.container}>
        <Text style={styles.subTitles}>{element.title}</Text>
        <Image source={{uri: `http://fmarilao.tech/images/portfolio/${element.image}`}}
               style={{width: 200, height: 200}}
        />
        <Button type="clear" style={styles.text} title={element.url} onPress={() => loadInBrowser(element.url)}></Button>
      </View>
      )
      })
  }

  const skills = () => {
    return info.resume.skills.map((element, i) => {
      return(
        <View key={i} style={styles.container}>
          <Text style={styles.subTitles}>🔹  {element.name}  🔹</Text>
        </View>
        )
    })
  }

  const softSkills = () => {
    return info.resume.softSkills.map((element, i) => {
      return(
        <View key={i} style={styles.container}>
          <Text style={styles.subTitles}>🔹  {element.name}  🔹</Text>
        </View>
        )
    })
  }

  const education = () => {
    return info.resume.education.map((element, i) => {
      return(
        <View key={i} style={styles.box}>
          <Text style={styles.subTitles}>{element.school}</Text>
          <Text style={styles.text}>{element.degree}</Text>
          <Text style={styles.text}>{element.graduated}</Text>
          <Text style={styles.text}>{element.description}</Text>
        </View>
        )
    })
  }

  const work = () => {
    return info.resume.work.map((element, i) => {
      return(
        <View key={i} style={styles.box}>
          <Text style={styles.subTitles}>{element.company}</Text>
          <Text style={styles.text}>{element.title}</Text>
          <Text style={styles.text}>{element.years}</Text>
          <Text style={styles.text}>{element.description}</Text>
        </View>
        )
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={styles.titles}>{info.main.name}</Text>
      <Text style={styles.subTitles}>{info.main.description}</Text>
      <View style={styles.socialButton}>
      <SocialIcon
        light
        iconSize={30}
        type='linkedin'
        onPress={() => loadInBrowser(info.main.project)}
      />
      <SocialIcon
        light
        iconSize={30}
        type='github'
        nPress={() => loadInBrowser(info.main.github)}
      />
      </View>
      {/* Contact Info */}
      <Text style={styles.text}>{info.main.bio}</Text>
      <Text style={styles.titles}>{info.main.contactmessage}</Text>
      <Text style={styles.text}>🇦🇷 {info.main.address.street}</Text>
      <Text style={styles.text}>{info.main.address.city} {info.main.address.state}, {info.main.address.zip}</Text>
      <Text style={styles.text}>{info.main.phone}</Text>
      <Button type="clear" title={info.main.email} onPress={() => Linking.openURL(`mailto:${info.main.email}`)}></Button>
      <View style={styles.button}>
      <Button title="English Resume" onPress={() => loadInBrowser(info.main.resumedownload)}></Button>
      <Button title="Spanish Resume" onPress={() => loadInBrowser(info.main.resumeSpanishdownload)}></Button>
      </View>

      <Text style={styles.titles}>Latest Projects</Text>
      <View style={styles.container}>{projects()}</View>

      <Text style={styles.titles}>Skills</Text>
      <View style={styles.container}>{skills()}</View>

      <Text style={styles.titles}>Soft Skills</Text>
      <View style={styles.container}>{softSkills()}</View>

      <Text style={styles.titles}>Education</Text>
      <View style={styles.container}>{education()}</View>

      <Text style={styles.titles}>Work</Text>
      <View style={styles.container}>{work()}</View>

      <Text style={styles.titles}>Get in touch</Text>
      <View style={styles.container}>
        <Text style={styles.subTitles}>Your name</Text>
        <TextInput
          onChangeText={formik.handleChange('name')} 
          value={formik.values.name}
          style={styles.input}
          />
        <Text style={styles.subTitles}>Your email</Text>
        <TextInput
          onChangeText={formik.handleChange('email')} 
          value={formik.values.email}
          style={styles.input}
          />
        <Text style={styles.subTitles}>Your message</Text>
        <TextInput
          onChangeText={formik.handleChange('message')} 
          value={formik.values.message}
          style={styles.input}
          />
        <Button title="Send" onPress={formik.handleSubmit}></Button>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    flex: 1,
    width: '80%',
    backgroundColor: '#000',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row', 
    height: 50, 
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingLeft: 10,
    textDecorationLine: "underline"
  }, 
  socialButton: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
    paddingLeft: 10,
  },
  text: {
    flex: 1,
    alignItems: 'flex-start',
    textAlign: 'center',
    padding: 10,
    color: '#fff',
  },
  titles: {
    color: '#fff',
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 28,
    flex: 1,
    padding: 10,
    marginTop: 40,
  },
  subTitles: {
    color: '#fff',
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  scrollView: {
    width: Dimensions.get('window').width
  },
});
