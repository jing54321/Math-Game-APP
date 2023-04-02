/**
 StAuth10244: I Kyungwon Lee, 000865096 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput,Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

const HomeScreen = ({navigation}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(true);

  const usernameHandler = (enteredText) => {
      setUsername(enteredText);
  }

  const passwordHandler = (enteredText) => {
      setPassword(enteredText);
  }
  
  const loginHandler = async () => {
      try {
        body = {username:username,password:password}
        config = { headers : {'Content-Type': 'application/json'}};
        const {data} = await axios.post('http://192.168.0.247:3000/api/login',body, config)
        const {status} = data;
        if(status == 'success') {
          setSuccess(true)
          navigation.push('MathGame', {name:username});
        } else {
          setSuccess(false);
          setTimeout(() => {setSuccess(true);},2000)
        }
        setPassword('');
        setUsername('');

     } catch (error) {
       console.log(error.message);
     }
    
    setPassword('');
    setUsername('');
  }
  return (
    <View style={styles.appContainer}>
      <View style={styles.loginContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
        <View style={styles.message}>{!success&&<Text style={{color:'#ff0000'}}>Username or password incorrect</Text>}</View>
        <TextInput placeholder="Enter username..." style={styles.inputBox} onChangeText={usernameHandler}
          value={username}/>
        <TextInput secureTextEntry={true} placeholder="Password" style={styles.inputBox} onChangeText={passwordHandler} value={password}/>
        <TouchableOpacity onPress={loginHandler} style={styles.button1}>
          <Text style={{textAlign:'center', color:'#ffffff'}}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.push('SignUp')} style={styles.button2}>
          <Text style={{textAlign:'center', padding:10, color:'#868296'}}>Create an account</Text>
        </TouchableOpacity>
      </View>
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
    rowGap : 20,
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

  button1 : {
    backgroundColor:'#495057',
    borderRadius:5,
    width:350,
    paddingVertical:15
  },
  button2 : {
    borderBottomWidth:1,
    borderBottomColor:'#eceff6',
    width:350,
  },
  logo : {
    width: 70,
    height: 70,
    borderRadius:5,
    marginBottom:5
  },
  message: {
    height:18,
  }
});

export default HomeScreen;
