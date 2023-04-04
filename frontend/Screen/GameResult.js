
import { StyleSheet, Text, View} from 'react-native';
import { Button } from "@react-native-material/core";

const GameResult = ({navigation, route}) => {
    const {result, leaders, name} = route.params;
    result=='correct'? styles.appContainer.backgroundColor='#6fcc98':styles.appContainer.backgroundColor='#cd6666';
    const submitHandler = () => {
        navigation.push('MathGame', {name:name});
    }
  return (
        <View style={styles.appContainer} >
            <Text style={{fontSize:32,marginTop:10}}>{result.toUpperCase()}!</Text>
            <Text style={{fontSize:20,marginTop:20}}>Leader Board</Text>
            <View style={{marginTop:20,width:200,paddingHorizontal:10}}>
                {leaders.map((leader,idx) => <View style={styles.itemContainer} key={idx}><Text style={styles.item}> {leader} </Text></View> )}
            </View>
            <View>
              <Button title="Next" style={{height:50, paddingVertical:10, marginTop:30, width:180,backgroundColor:'#495057'}} onPress={submitHandler}/>
            </View>
            <View>
              <Button title="Log out" style={{height:50, paddingVertical:10, marginTop:10, width:180,backgroundColor:'#034f84'}} onPress={() => navigation.push('HomeScreen') }/>
            </View>
        </View>
  )
}
const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: '',
      alignItems: 'center',
      padding:30,
      
    },
    itemContainer:{
      borderBottomColor:'#d9dddc',
      borderBottomWidth:0.5
    },
    item: {
      paddingVertical:10,
      textAlign: 'center'
    },
  });

export default GameResult
