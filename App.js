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
var MessageArray = [{"name":"Tommy Toe","message":"FCU Weekly Update 10/01 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":"","is_read":false},{"name":"Tommy Toe","message":"FCU Weekly Update 9/25 ","date":"20200925","time":"3.40 am","is_select":false,"user_avatar":"","is_read":false},{"name":"Vince Voe","message":"FCU Weekly Update 10/25 ","date":"20201025","time":"1.50 am","is_select":false,"user_avatar":""},{"name":"Xerxes Xoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":"","is_read":true},{"name":"Zachery Zoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":"","is_read":false},{"name":"Zachery Zoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":"","is_read":false},{"name":"Zachery Zoe","message":"FCU Weekly Update 9/25 ","date":"20201001","time":"1.20 am","is_select":false,"user_avatar":"","is_read":false}];
var dummyMessage = MessageArray;
var check = require('./Images/check.png')
var uncheck = require('./Images/uncheck.png')

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      searchvalue:"",
      dataSource:MessageArray,
      select_all:false
    };
  }

  updateSearch = (searchData) => {
    var DummySearchArr = dummyMessage;
    const Arr = DummySearchArr.filter((data) => {
      const searchName = data.name;
      const itemData = searchName.toUpperCase();
      const textData = searchData.toUpperCase();
      return itemData.indexOf(textData) > -1
    })

    this.setState({
      searchvalue:searchData,
      dataSource:Arr
    })
  }

  clearSearchText = () => {
    this.setState({
      searchvalue:"",
      dataSource:MessageArray
    })
  }

  selectAllMsg = () => {
    var FilteredMsgArr = this.state.dataSource.map((data) => {
      var MsgObject = data;
      MsgObject.is_select = !this.state.select_all;
      return MsgObject;
    })

    this.setState({
      dataSource:FilteredMsgArr,
      select_all:!this.state.select_all
    })
  }

  searchBar = () => {
    var SelectAllImg = this.state.select_all ? check : uncheck 
    return(
      <View style = {styles.searchBarView}>
        <TouchableOpacity onPress = {this.selectAllMsg}>
          <Image source = {SelectAllImg} style = {styles.filterIcons}/>
        </TouchableOpacity>
        <View style = {styles.searchBox}>
          <TouchableOpacity>
            <Image source = {require('./Images/search.png')} style = {styles.searchIcons}/>
          </TouchableOpacity>        
          <TextInput
            value = {this.state.searchvalue}
            onChangeText = {this.updateSearch}
            style = {{width:'75%'}}
          />
          <TouchableOpacity onPress = {this.clearSearchText}>
            <Image source = {require('./Images/cancel.png')} style = {styles.searchIcons}/>
          </TouchableOpacity>          
        </View>
        <TouchableOpacity>
          <Image source = {require('./Images/filter.png')} style = {styles.menubar}/>
        </TouchableOpacity>                
      </View>
    )
  }

  selectMessage = (item,index) => {
    var OriginalSource = this.state.dataSource;
    OriginalSource[index].is_select = !OriginalSource[index].is_select;

    this.setState({
      dataSource:OriginalSource      
    })
  }

  renderInbox = ({item,index}) => {
    var FontWeight = '100';
    if(item.is_read == false){
      FontWeight = 'bold';
    }

    var CheckOption = check;
    CheckOption = item.is_select ? check : uncheck;

    var date = moment(item.date,"YYYYMMDD").format("ddd MMM DD")
    return(
      <View style = {styles.messageContainer}>
        <TouchableOpacity onPress = {this.selectMessage.bind(this,item,index)}>
          <Image source = {CheckOption} style = {styles.filterIcons}/>
        </TouchableOpacity>
        <View style = {styles.messageView}>
          <TouchableOpacity>
            <Image source = {require('./Images/avatar.png')} style = {styles.avatar}/>
          </TouchableOpacity>
          <View style = {{paddingLeft:10}}>
            <Text style = {[styles.name,{fontWeight:FontWeight}]}>{item.name}</Text>
            <Text style = {styles.message}>{item.message}</Text>
          </View>        
        </View>
        <View style = {{alignItems:'flex-end'}}>
          <Text style = {{fontSize:12,fontWeight:FontWeight}}>{date}</Text>
          <Text style = {{fontSize:12,color:"#4d4d63",marginTop:2}}>{item.time}</Text>
        </View>
        <TouchableOpacity>
          <Image source = {require('./Images/right-arrow.png')} style = {styles.filterIcons}/>
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
            <Image source = {require('./Images/menu.png')} style = {styles.menubar}/>
          </TouchableOpacity>
          <Text style = {styles.headerText}>INBOX</Text>
          <TouchableOpacity>
            <Image source = {require('./Images/avatar.png')} style = {styles.avatar}/>
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
          <Image source = {require('./Images/speech-bubble.png')} style = {{width:50,height:50}}/>
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
