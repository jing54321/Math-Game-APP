
import {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {Stack, ActivityIndicator } from "@react-native-material/core";
import axios from 'axios';

const SignUp = ({navigation}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checkField, setCheckField] = useState(true);
  const [checkPassword, setCheckPassword] = useState(true);
  const [errMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const usernameHandler = (enteredText) => {
      setUsername(enteredText)
  }
  const passwordHandler = (enteredText) => {
      setPassword(enteredText)
  }
  const confirmPasswordHandler = (enteredText) => {
      setConfirmPassword(enteredText)
  }
  const signUpHandler = async () => {
    if(username=='' || password=='' || confirmPassword=='') {
      setCheckField(false)
      setErrorMessage('All fields must be complete')
      setTimeout(() => {setErrorMessage('');setCheckField(true) },2000)
      return;
    }

    if(password !== confirmPassword) {
      setCheckPassword(false);
      setErrorMessage('Passwords do not match')
      setTimeout(() => {setErrorMessage('');setCheckPassword(true); },2000)
      return;
    }

    try {
        setLoading(true);
        const body = {username:username, password:password}
        config = { headers : {'Content-Type': 'application/json'}};
        const {data} = await axios.post('http://192.168.0.247:3000/api/signup',body, config);
        const {status} = data
        if(status === 'success') {
          setConfirmPassword('');
          setPassword('');
          setUsername('');
          setLoading(false);
          navigation.push('MathGame', {name:username})
        } else {
          setCheckPassword(false);
          setErrorMessage('Error!!')
          setTimeout(() => {setErrorMessage('');setCheckPassword(true); },2000)
        }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <View style={styles.appContainer}>
      {loading? <Stack fill center spacing={4}><ActivityIndicator size="large" /></Stack>:<View>
      <View style={styles.loginContainer}>
        <TextInput placeholder="Enter username..." style={styles.inputBox} onChangeText={usernameHandler}
          value={username}/>
        <View style={styles.message}>{!checkField&&<Text style={styles.errorText}>{errMessage}</Text>}</View>
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.inputBox} onChangeText={passwordHandler} value={password}/>
        <View style={styles.message}>{!checkField&&<Text style={styles.errorText}>{errMessage}</Text>}</View>
        <TextInput secureTextEntry={true} placeholder="Confirm Password" style={styles.inputBox} onChangeText={confirmPasswordHandler} value={confirmPassword}/>
        <View style={styles.message}>{(!checkField || !checkPassword)&&<Text style={styles.errorText}>{errMessage}</Text>}</View>
        <TouchableOpacity onPress={signUpHandler} style={styles.button1}>
          <Text style={{textAlign:'center', color:'#ffffff'}}>Sign Up</Text>
        </TouchableOpacity>
      </View>
        </View>}
      
    </View>
  )
}
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginContainer: {
    flex:1,
    flexDirection : 'column',
    justifyContent : 'center',
    alignItems: 'center',
    rowGap : 15,
  },
  inputBox : {
    backgroundColor:'#eceff6',
    borderRadius:5,
    height:50,
    width:350,
    padding:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  errorText:{
    color:'#ff0000',
    fontSize:10,
  },

  button1 : {
    backgroundColor:'#495057',
    borderRadius:5,
    width:350,
    paddingVertical:15
  },
  
  logo : {
    width: 70,
    height: 70,
    borderRadius:5,
    marginBottom:5
  },
  message: {
    height:15,
  }
});

export default SignUp
