import React, { useEffect, useState } from 'react';
import { Button, SocialIcon } from 'react-native-elements';
import { StatusBar, Alert, Dimensions, TextInput, Linking, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'
import email from 'react-native-email'

export default function App() {
  const [info, setInfo] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://fmarilao.tech/resumeData.json')
      .then(response => response.json())
      .then(data => {
        setInfo(data)
        setLoading(false)
      })
  }, []);

  if(loading){
    return <View><Text>Cargando...</Text></View>
  }

  const loadInBrowser = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  const handleEmail = (values) => {
    const to = [info.main.email]
    email(to, {
      body: `${values.message}`
    })
  }

  const projects = () => {
    return info.portfolio.projects.map((element, i) => {
      return(
      <View key={i} style={styles.container}>
        <Text style={styles.subTitles}>{element.title}</Text>
        <Image source={{uri: `http://fmarilao.tech/images/portfolio/${element.image}?time=${Date.now()}`}}
               style={{width: 300, height: 230}}
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
          <Text style={styles.boxTitle}>{element.school}</Text>
          <Text style={styles.boxSubTitle}>{element.degree}</Text>
          <Text style={styles.boxSubTitle}>{element.graduated}</Text>
          <Text style={styles.boxText}>{element.description}</Text>
        </View>
        )
    })
  }

  const work = () => {
    return info.resume.work.map((element, i) => {
      return(
        <View key={i} style={styles.box}>
          <Text style={styles.boxTitle}>{element.company}</Text>
          <Text style={styles.boxSubTitle}>{element.title}</Text>
          <Text style={styles.boxSubTitle}>{element.years}</Text>
          <Text style={styles.boxText}>{element.description}</Text>
        </View>
        )
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar />
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
        onPress={() => loadInBrowser(info.main.github)}
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

      <Formik
        initialValues={{ 
          name: '',
          message: '' 
        }}
        onSubmit={(values, {resetForm}) => {
          handleEmail(values);
          resetForm();
        }}
        validationSchema={yup.object().shape({
          name: yup
            .string()
            .required('Please, provide your name!'),
          message: yup
            .string()
            .min(4)
            .max(3000, 'Min 4 max 3000 chars.')
            .required(),
        })}
       >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <View style={styles.formContainer}>
          <TextInput
            value={values.name}
            style={styles.inputStyle}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
            placeholder="Name"
            placeholderTextColor="#fff"
          />
          {touched.name && errors.name &&
            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.name}</Text>
          }            
          <TextInput
            value={values.message}
            style={styles.inputMsg}
            onChangeText={handleChange('message')}
            placeholder="Message"
            placeholderTextColor="#fff"
            onBlur={() => setFieldTouched('message')}
          />
          {touched.message && errors.message &&
            <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.message}</Text>
          }
          <Button
            color="#3740FE"
            title='Submit'
            disabled={!isValid}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
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
  boxTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 28,
  },
  boxSubTitle: {
    flex: 1,
    color: 'white',
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
  },
  boxText: {
    color: 'white',
  },
  box: {
    flex: 1,
    width: '80%',
    backgroundColor: '#256d7b',
    color: 'black',
    marginBottom: 30,
    borderRadius: 10,
    padding: 10,
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
  formContainer: {
    padding: 50 
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
    fontSize: 30,
    flex: 1,
    padding: 10,
    marginTop: 40,
  },
  subTitles: {
    color: '#fff',
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    padding: 10,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 10,
    borderWidth: 1,
    borderColor: '#fff',
    color: '#fff'
  },
  inputStyle: {
    borderWidth: 1,
    color: '#fff',
    borderColor: '#4e4e4e',
    padding: 12,
    marginBottom: 15,
  },
  inputMsg: {
    borderWidth: 1,
    color: '#fff',
    borderColor: '#4e4e4e',
    padding: 12,
    height: 150,
    marginBottom: 20,
  },
  scrollView: {
    width: Dimensions.get('window').width
  },
});
