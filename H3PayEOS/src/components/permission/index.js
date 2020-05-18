/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import Permissions from 'react-native-permissions';
import { isIphoneX } from 'react-native-iphone-x-helper'

var { height, width } = Dimensions.get('window');

type Props = {};
export default class PermissionComponent extends Component<Props> {

  resize = (h) => {
    var _height = (h/height) * 130+'%';
    return _height;
  }

  resizeWidth = (w) => {
    var _width = (w/width) * 100+'%';
    return _width;
  }

  render() {
    const { progress } = this.props;

    return (  
      <SafeAreaView style={{ flex: 1, width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'flex-start', alignItems: 'center' }}>
        <View style={{backgroundColor:'white', width : '100%', height : height, alignItems: 'flex-start', justifyContent: 'flex-start', paddingLeft : this.resizeWidth(39), paddingRight : this.resizeWidth(39), marginBottom : 0}}>
          <Image source={require("../../images/img_logo.png")} style={{resizeMode:'contain', width : this.resizeWidth(250), marginTop : this.resize(100) }}/>
          <Image source={require("../../images/img_invalidName.png")} style={{resizeMode:'contain', width : '100%', height : this.resize(90), marginTop : this.resize(20) }}/>

          <View style={{paddingLeft : this.resizeWidth(10), paddingRight : 6}}>
            <View style={{width : width-90, height : 0.5, backgroundColor:'#d6d6d6', marginTop : 27.5, marginBottom : 28}} />
          
            <Text style={{fontSize : 17, color : '#000000', fontFamily : "NotoSansCJKkr-Medium", fontWeight:'bold'}}>카메라 및 사진 라이브러리 <Text style={{fontSize : 13.5, fontFamily : "NotoSansCJKkr-Regular"}}>(선택)</Text></Text>
            <Text style={{fontSize : 15.3, color : 'rgb(102,102,102)', marginTop : 10, fontFamily : "NotoSansCJKkr-Regular"}}>지갑주소 QR촬영 기능 실행/이미지를</Text>
            <Text style={{fontSize : 15.3, color : 'rgb(102,102,102)', fontFamily : "NotoSansCJKkr-Regular"}}>사진 라이브러리에 저장 </Text>

            <Text style={{fontSize : 17, color : '#000000', fontFamily : "NotoSansCJKkr-Medium", fontWeight:'bold', marginTop : 20}}>위치 정보 서비스<Text style={{fontSize : 13.5, fontFamily : "NotoSansCJKkr-Regular"}}>(선택)</Text></Text>
            <Text style={{fontSize : 15.3, color : 'rgb(102,102,102)', marginTop : 10, fontFamily : "NotoSansCJKkr-Regular"}}>주변 가맹점 찾기</Text>
          </View>
        </View>

        <TouchableOpacity onPress={this.props.onPress} 
        style={{ position:'absolute', bottom: Platform.OS == 'ios' ? 0 : 0, width: '100%', height: Platform.OS == 'ios' ? isIphoneX() ? 70 : 60 : 60, backgroundColor: 'rgba(250,53,82, 1)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{fontSize : 18, color : '#ffffff', textAlign:'center', fontFamily : "NotoSansCJKkr-Regular"}}>확인</Text>
          </TouchableOpacity>
{
  /*
<TouchableOpacity onPress={this.props.onPress}
          style={{ width: '100%', height: 60, backgroundColor: '#23cdc7', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize : 18, color : '#ffffff', textAlign:'center', fontFamily : "NotoSansCJKkr-Regular"}}>확인</Text>
        </TouchableOpacity>
  */
}
        
        

        

{

  /*
<SafeAreaView onPress={this.props.onPress} 
    style={{ position:'absolute', bottom: Platform.OS == 'ios' ? 0 : 10, width: '100%', height: 60, backgroundColor: '#23cdc7', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{fontSize : 18, color : '#ffffff', textAlign:'center', fontFamily : "NotoSansCJKkr-Regular"}}>확인</Text>
        </SafeAreaView>
  */
  
}

      </SafeAreaView>
    );

    return (
      <SafeAreaView style={styles.container} >
        <View style={{position:'absolute',top : 0, left : 0, width : '100%', height : 70, backgroundColor:'white'}} />
        <View style={{ flex: 1, width: '100%', backgroundColor: 'white'}}>
          <View style={{flex : 1, width : '100%', position:'absolute', top:height*0.1, paddingLeft:width*0.1}}>
            {
                /*
                <Image source={{uri:'logo_red'}} style={{resizeMode:'contain', width: width*0.351, height: height*0.036}}/>
                */
            }

            <View style={{width : '100%', paddingTop : 35}}>
                {
                    /*
                    <Image source={{uri:'invalidName'}} style={{resizeMode:'contain', width:width*0.01*74.05, height:height*0.01*14.86}}/>
                    */
                }
            </View>
          </View>

          {/* <View style={{width:'100%', position:'absolute', top:height * 0.01 * 44.18, alignItems:'center'}}> */}
          <View style={{width:'100%', position:'absolute', top:height * 0.01 * 44.18, alignItems:'center'}}>
            <View style={{width : '80%', height : 1, backgroundColor:'rgba(214,214,214, 1)', paddingLeft:width*0.1}} />
          </View>
          <View style={{width:'100%', position:'absolute', top:height/2 - height*0.1 + height*0.05}}>
            <View>
              <View style={{width : '100%', height : 25,marginTop : 38, flexDirection:'row', alignItems:'flex-end', paddingLeft:width*0.1}}>
                <Text style={{fontSize : 18, color : 'rgba(0,0,0, 1)', fontWeight:'bold', textAlign:'center', fontFamily : 'NotoSansCJKkr-Medium'}}>카메라 및 사진 라이브러리 </Text>
                <Text style={{fontSize : 14, color : 'rgba(0,0,0, 1)', textAlign:'center', fontFamily:'NotoSansCJKkr-Regular'}}>(선택)</Text>
              </View>
              <View style={{width : '100%', height : 25,marginTop : 12, alignItems:'flex-start', paddingLeft:width*0.1}}>
                <Text style={{fontSize : 15, color : 'rgba(102,102,102, 1)', textAlign:'left', fontFamily:'NotoSansCJKkr-Regular'}}>지갑주소 QR 촬영 기능 실행/이미지를 </Text>
                <Text style={{fontSize : 15, color : 'rgba(102,102,102, 1)', textAlign:'left', fontFamily:'NotoSansCJKkr-Regular'}}>사진 라이브러리에 저장 </Text>
              </View>
            </View>

          </View>
          <TouchableOpacity style={styles.btn_suc} onPress={this.props.onPress}>
            <Text style={styles.btn_suc_text}>확인</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'white', width : '100%'
  },
  btn_suc: {
    position: 'absolute', bottom: 0, left: 0, width: '100%', height: 54, backgroundColor: 'rgba(250,53,82, 1)', justifyContent: 'center', alignItems: 'center'
  },
  btn_suc_text: {
    color: 'rgba(255,255,255, 1)', fontSize: 20, fontFamily:'NotoSansCJKkr-Regular'
  }
});

