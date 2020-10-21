/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';
import moment from 'moment';
var MessageArray = [{"name":"Tommy Toe","message":"FCU Weekly Update 10/01 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":""},{"name":"Tommy Toe","message":"FCU Weekly Update 9/25 ","date":"20200925","time":"3.40 am","is_select":false,"user_avatar":""},{"name":"Vince Voe","message":"FCU Weekly Update 10/25 ","date":"20201025","time":"1.50 am","is_select":false,"user_avatar":""},{"name":"Xerxes Xoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":""},{"name":"Zachery Zoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":""},{"name":"Zachery Zoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":""},{"name":"Zachery Zoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":""}];

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchvalue:"",
      dataSource:MessageArray
    };
  }

  updateSearch = (searchData) => {
    this.setState({
      searchvalue:searchData
    })
  }

  searchBar = () => {
    return(
      <View style = {styles.searchBarView}>
        <TouchableOpacity>
          <Image source = {require('./uncheck.png')} style = {styles.filterIcons}/>
        </TouchableOpacity>
        <View style = {styles.searchBox}>
          <TouchableOpacity>
            <Image source = {require('./search.png')} style = {styles.searchIcons}/>
          </TouchableOpacity>        
          <TextInput
            value = {this.state.searchvalue}
            onChangeText = {this.updateSearch}
            style = {{width:'75%'}}
          />
          <TouchableOpacity>
            <Image source = {require('./cancel.png')} style = {styles.searchIcons}/>
          </TouchableOpacity>          
        </View>
        <TouchableOpacity>
          <Image source = {require('./filter.png')} style = {styles.menubar}/>
        </TouchableOpacity>                
      </View>
    )
  }

  renderInbox = ({item,index}) => {
    var date = moment(item.date,"YYYYMMDD").format("ddd MMM DD")
    return(
      <View style = {styles.messageContainer}>
        <TouchableOpacity>
          <Image source = {require('./uncheck.png')} style = {styles.filterIcons}/>
        </TouchableOpacity>
        <View style = {styles.messageView}>
          <TouchableOpacity>
            <Image source = {require('./avatar.png')} style = {styles.avatar}/>
          </TouchableOpacity>
          <View style = {{paddingLeft:10}}>
            <Text style = {styles.name}>{item.name}</Text>
            <Text style = {styles.message}>{item.message}</Text>
          </View>        
        </View>
        <View style = {{alignItems:'flex-end'}}>
          <Text style = {{fontSize:12,fontWeight:'bold'}}>{date}</Text>
          <Text style = {{fontSize:12,color:"#4d4d63",marginTop:2}}>{item.time}</Text>
        </View>
        <TouchableOpacity>
          <Image source = {require('./right-arrow.png')} style = {styles.filterIcons}/>
        </TouchableOpacity>                                
      </View>
    )
  }

  divider = () => {
    return <View style = {styles.divider}/> 
  }

  render() {
    return (
      <View style = {styles.container}>
        <StatusBar backgroundColor = "#e3e9e7" barStyle = "dark-content"/>
        <View style = {styles.header}>
          <TouchableOpacity>
            <Image source = {require('./menu.png')} style = {styles.menubar}/>
          </TouchableOpacity>
          <Text style = {styles.headerText}>INBOX</Text>
          <TouchableOpacity>
            <Image source = {require('./avatar.png')} style = {styles.avatar}/>
          </TouchableOpacity>           
        </View>
        {this.searchBar()}
        <View style = {{height:1,paddingVertical:2,backgroundColor:'#EEE'}}/>
        <FlatList
          data = {this.state.dataSource}
          renderItem = {this.renderInbox}
          extraData = {this.state}
          ItemSeparatorComponent = {this.divider}
        />
        <TouchableOpacity style={styles.newMessageButton}>
          <Image source = {require('./speech-bubble.png')} style = {{width:50,height:50}}/>
        </TouchableOpacity>        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#FFF',
  },
  header:{
    padding:10,
    backgroundColor:'#e3e9e7',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth:1,
    borderColor:'#0088CC'
  },
  menubar:{
    width:30,
    height:30
  },
  headerText:{
    fontSize:22,
    color:'#0088CC',
    fontWeight:'bold'
  },
  avatar:{
    width:40,
    height:40
  },
  searchBarView:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    justifyContent:'space-between'
  },
  searchBox:{
    flexDirection:'row',
    paddingHorizontal:6,
    borderWidth:1,
    borderColor:'#B8BBBA',
    borderRadius:5,
    alignItems:'center',
    justifyContent:'space-between',
    width:'75%'
  },
  searchIcons:{
    width:23,
    height:23
  },
  filterIcons:{
    width:23,
    height:23    
  },
  messageContainer:{
    flexDirection:'row',
    padding:10,
    alignItems:'center',
    justifyContent:'space-between'
  },
  messageView:{
    flexDirection:'row',
    paddingHorizontal:10,
    alignItems:'center'
  },
  name:{
    fontSize:14,
    color:'#000',
    fontWeight:'bold'
  },
  message:{
    fontSize:14,
    color:'#97a0a9',
    paddingTop:2
  },
  divider:{
    height:1,
    backgroundColor:'#EEE',
    marginVertical:5
  },
  newMessageButton:{
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    right:25,
    bottom:45,    
  }
});

export default App;
