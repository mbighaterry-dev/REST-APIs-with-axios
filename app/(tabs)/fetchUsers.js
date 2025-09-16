import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native'
import { useContext, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from '../../context/ThemeContext';


export default function GitHub() {
    const [username, setUsename] = useState("");
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const {theme} = useContext(ThemeContext)


    const fetchData = async() => {
        if(!username.trim()) return;
        setIsLoading(true);
        setUserData(null);
        setError("")

        try{
            const response = await axios.get(`https://api.github.com/users/${username}`)
            setUserData(response.data)
        }catch(error){
            console.error('User not found',error)
        }finally{
            setIsLoading(false)
        }
        setUsename('')
    }
  return (
    <SafeAreaView style={[
        styles.container,
        {
            backgroundColor: theme === 'light' ? '#fff' : "#000000"
        }
    ]}>
        <Text style={[
            styles.title,
            {
                color: theme === 'light' ? '#000000' : '#fff'
            }
        ]}>GitHub User Search</Text>
        <View>
            <TextInput
            style={[
                styles.input,
                {
                    color: theme === 'light' ? '#000000' : '#fff'
                }
            ]}
            placeholder='Enter your GitHub name'
            placeholderTextColor={theme === 'light' ? '#000000' : '#fff'}
            value={username}
            onChangeText={setUsename}
            />
            <TouchableOpacity style={styles.searchbtn} onPress={fetchData}>
                <Text style={styles.searchText}>Search</Text>
            </TouchableOpacity>
        </View>
        {isLoading && (<ActivityIndicator size={24} color={'black'}/>)}
        {error ? <Text style= {{color: 'red', fontSize:14}}>{error}</Text>: null}


        {userData && (
            <View style={styles.userDetails}>
                 <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />mbi
                <Text> {userData.login}</Text>
                <Text>Followers:{userData.followers}</Text>
                <Text> Following:{userData.following}</Text>
                <Text> Public_repos:{userData.public_repos}</Text>
            </View>
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:30,
    },
    title:{
        fontSize:20,
        fontWeight: '700',
        alignSelf: 'center',
        marginBottom:20
    },
    input:{
        margin:12,
        padding:10,
        borderWidth:1,
        borderColor:'#4f4c4cff',
        borderRadius:8
    },
    searchbtn:{
        backgroundColor: 'blue',
        width: 200,
        padding:10,
        justifyContent: 'center',
        alignSelf:'center',
        alignItems:'center',
        borderRadius:8,
        marginTop:20

    },
    searchText:{
        color:'white',
        fontSize:14,
        fontWeight:'500',
    },
    userDetails:{
        width: '80%',
        gap: 5,
        elevation : 3,
        borderRadius:8,
        borderColor:'gray',
        backgroundColor:"#eee",
        marginTop:50,
        alignItems:'center',
        paddingVertical:20,
        justifyContent:'center',
        alignSelf:'center'
    },
    avatar: { width: 120, height: 120, borderRadius: 70, marginBottom: 10 },
})