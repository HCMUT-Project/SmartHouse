import React from 'react';
import { ImageBackground, StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { COLOR, IMAGE, SIZE, WIDTH_SCREEN } from '../../constants';
import { textStyles } from '../../styles';
import { userData } from '../../configs';
import { MainNavigationProp } from '../../routes/type';
import { MainRoutes } from '../../routes/routes';

const Home = ({ navigation }: MainNavigationProp<MainRoutes.Home>) => {
  const _onPress = (name: string) => {
    navigation.navigate(MainRoutes.HomeDetail, { name: name })
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={IMAGE.banner_2} style={styles.banner}>
        <View style={styles.wellcome}>
          <Text style={textStyles.mediumBold}>Xin chào</Text>
          <Text style={textStyles.medium}>{userData.name}</Text>
        </View>
      </ImageBackground>
      <Text style={[textStyles.mediumBold, { margin: 16 }]}>Danh sách nhà của bạn</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={['Xuân Tùng', 'Thành Tuân', 'Tuấn Cường', 'Tiến Dũng', 'Thạnh Thạnh']}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}
        renderItem={({ item, index }) =>
          <TouchableOpacity style={styles.home} onPress={() => { _onPress(item) }}>
            <View key={index} style={styles.homeIcon}>
              <Image style={styles.icon} source={IMAGE.ic_home} />
            </View>
            <Text style={[textStyles.normalBold]}>{item}</Text>
          </TouchableOpacity>
        } />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
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
    marginTop: 16,
    marginHorizontal: 8,
    backgroundColor: 'white',
    width: WIDTH_SCREEN * 0.4,
    height: WIDTH_SCREEN * 0.3,
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    elevation: Platform.OS === 'android' ? 5 : 1,
    padding: 16
  },
  homeIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#748DA6',
    width: 50,
    height: 50,
    borderRadius: 30,
    marginBottom: 12
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  }
});
