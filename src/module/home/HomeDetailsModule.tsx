import React from 'react';
import { ImageBackground, StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from 'react-native';
import { COLOR, IMAGE, SIZE, WIDTH_SCREEN } from '../../constants';
import { textStyles } from '../../styles';
import { userData } from '../../configs';

const HomeDetail = () => {

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={IMAGE.banner_2} style={styles.banner}>
        <View style={styles.wellcome}>
          <Text style={textStyles.mediumBold}>Xin chào</Text>
          <Text style={textStyles.medium}>{userData.name}</Text>
        </View>
      </ImageBackground>
      <Text style={[textStyles.mediumBold, { margin: 16 }]}>Danh sách nhà của bạn</Text>
      
    </SafeAreaView>
  );
};
export default HomeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR._E1EDFF
  },
  banner: {
    height: WIDTH_SCREEN * 0.4,
    width: WIDTH_SCREEN,
    resizeMode: 'stretch',
    justifyContent: 'flex-end',
    paddingBottom: SIZE[30],
  },
  wellcome: {
    right: 20,
    top: 20,
    position: 'absolute'
  },
  home: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  homeIcon: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#748DA6',
    borderRadius: 50,
  },
  icon: {
    width: 70,
    height: 70,
    resizeMode: 'cover',

  }
});