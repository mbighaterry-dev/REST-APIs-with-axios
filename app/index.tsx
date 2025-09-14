import { StyleSheet, Text, View, FlatList, ScrollView, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react' ;
import axios from 'axios';
export default function Home() {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError ] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');


  const postUser = async() => {
    try{
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        title,
        body,
        userId: 1,
      })
      setData([response.data, ...data])
      console.log(response.data);
      setBody('');
      setError('');
      setTitle('');
    }catch(error){
      console.error('fail to post data', error);
      setError('fail to fetch data')
    }
  }

  const fetchData = async() => {
    try{
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=20');
      console.log(response.data);
      setData(response.data);
    }catch(error){
      console.error(error)
    }finally{
      setIsLoading(false)
    }
  };
  useEffect(() => {
    fetchData()
  },[]);

  if (isLoading) {
    return(
      <SafeAreaView style={{justifyContent:'center', alignItems:'center',gap:'10'}}>
        <ActivityIndicator size={24} color='black'/>
        <Text style={{fontSize:14, fontWeight:'500'}}>Loading...</Text>
      </SafeAreaView>
    )
  }
  return (
   <ScrollView style={styles.container}>

    {error
    ? (
      <Text style={{color:'red'}}>{error}</Text>
    ): (
      <View>
        <TextInput
        style={styles.input}
        placeholder='input title'
        value = {title}
        onChangeText={setTitle}
        />
         <TextInput
        style={styles.input}
        placeholder='input body'
        value = {body}
        onChangeText={setBody}
        />
        <TouchableOpacity style={{justifyContent:'center',  width:100, backgroundColor:'blue', borderRadius:8, padding:10, alignItems:'center', alignSelf:'center'}} onPress={postUser}>
          <Text style={{fontSize:14, fontWeight:'500', color:'white', }}>Post</Text>
        </TouchableOpacity>
      </View>
    )
    }
     <FlatList
     data={data}
     keyExtractor={(item) => item.id.toString()}
     renderItem={({item}) => (
      <View style={styles.box}>
        <Text>{item.title}</Text>
        <Text>{item.body}</Text>
        <Text>{item.userId}</Text>
      </View>
     )}
     />
   </ScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:40,
  },
  box:{
    padding:10,
    margin:10,
  },
  input:{
    padding:10,
    margin:10, 
    borderWidth:1,
    borderRadius:8,
    borderColor:'gray'
  }
})