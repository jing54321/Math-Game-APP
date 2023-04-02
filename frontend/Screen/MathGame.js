/**
 StAuth10244: I Kyungwon Lee, 000865096 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { Button, Stack, ActivityIndicator } from "@react-native-material/core";
import axios from 'axios';


const MathGame = ({navigation, route}) => {
  const {name} = route.params;
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer,setUserAnswer] = useState();
  const [loading, setLoading] = useState(false)

  const generateNumber = () => {
    setNum1(Math.floor((Math.random() * 100) +1))
    setNum2(Math.floor((Math.random() * 100) +1))
  }

  const userInputHandler = (enteredText) => {
      let num = Number(enteredText)
      setUserAnswer(num);
  }

  const submitHandler = async () => {
    
    if((num1+num2)==userAnswer) {
      try{
        setUserAnswer()
        setLoading(true);
        const body = {username:name, result:'correct'}
        config = { headers : {'Content-Type': 'application/json'}};
        const {data} = await axios.put('http://192.168.0.247:3000/api/update',body, config);
        const {leaders} = data
        setLoading(false)
        generateNumber();
        navigation.push('GameResult', {result:'correct', leaders:leaders, name:name});
      } catch(error) {
        console.error(error.message)
      }
      
    } else {

      try{
        setUserAnswer()
        setLoading(true)
        const body = {username:name, result:'incorrect'}
        config = { headers : {'Content-Type': 'application/json'}};
        const {data} = await axios.put('http://192.168.0.247:3000/api/update',body, config);
        const {leaders} = data
        setLoading(false)
        generateNumber();
        navigation.push('GameResult', {result:'incorrect', leaders:leaders, name:name});
      } catch(error) {
        console.error(error.message)
      }
    }
  }

  useEffect(() => {
    generateNumber();
  },[])

  return ( 
      <View style={styles.appContainer}>
        {loading? <Stack fill center spacing={4}><ActivityIndicator size="large" /></Stack>: 
        <View>
          <Text style={{fontSize:20, marginBottom:10, textAlign:'center'}}>Welcome <Text style={{fontSize:20, color:'#1338be'}}>{name}!</Text></Text>
            <View style={styles.gameContainer}>
              <View style={{paddingBottom:20,borderBottomWidth:1, borderBottomColor:'#d9dddc' }}>
              <Text style={{textAlign: 'center', fontSize:16}}>Please enter sum of two numbers</Text>
            </View>
            <View>
              <Text style={{textAlign: 'center', fontSize:30}}>{num1} + {num2}</Text>
            </View>
            <TextInput placeholder="Enter answer..." style={styles.inputBox} onChangeText={userInputHandler} />
            <View>
              <Button title="Submit" style={{height:50, paddingVertical:10}} onPress={submitHandler}/>
            </View>
        </View>
      </View> }
      
    </View>
  )
}
const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding:30,
      
    },
    gameContainer: {
      flex:1,
      flexDirection : 'column',
      marginTop : 100,
      rowGap : 20,
      width:300
    },
    inputBox : {
      backgroundColor:'#eceff6',
      borderRadius:5,
      height:50,
      padding:10
    },
  });

  
export default MathGame
