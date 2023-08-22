import React from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, } from 'react-native';
import { COLOR, FONT, IMAGE, STRING, WIDTH_SCREEN } from '../../constants';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';
import { Header } from '../../components/header';
import { textStyles } from '../../styles';
import DeviceInfo from 'react-native-device-info';
import { SIZE } from '../../constants';
interface AppInformationProps
  extends MainNavigationProp<MainRoutes.AppInformation> { }
const AppInformation = ({ navigation }: AppInformationProps) => {
  const _onPressInfo = (link: string) => {
    Linking.openURL(link)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={STRING.profile.appInfor}
        onPressBack={() => {
          navigation.goBack();
        }}
      />
      <View style={{ backgroundColor: COLOR.white }}>
        <Image source={IMAGE.logo} style={styles.banner} />
        <View style={{ alignItems: 'center' }}>
          <Text style={textStyles.mediumBold}>Smart House</Text>
          <Text style={textStyles.normal}>Phiên bản {DeviceInfo.getVersion()}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Thông tin liên hệ</Text>
        <ScrollView>
          {inforData.map((elem) => (
            <TouchableOpacity onPress={() => _onPressInfo(elem.link)} style={styles.infor_items_view}>
              <Image source={elem.ic} style={styles.ic} />
              <Text style={styles.inforLabel}>{elem.title} {elem.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default AppInformation;

const inforData = [{
  ic: IMAGE.ic_phone_2,
  title: 'Hotline:',
  label: '+84 378 314 546',
  link: 'tel:+84378314546'
},
{
  ic: IMAGE.ic_web,
  title: 'Website:',
  label: 'https://www.facebook.com/wen.tungtrana3/',
  link: 'https://www.facebook.com/wen.tungtrana3/'
},
{
  ic: IMAGE.ic_mail,
  title: 'Email:',
  label: 'tung.tranxuan@hcmut.edu.vn',
  link: 'mailto:tung.tranxuan@hcmut.edu.vn'
},
{
  ic: IMAGE.ic_address,
  title: '',
  label: '268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM',
  link: 'https://www.google.com/maps/search/?api=1&query=' + encodeURI(`268 Lý Thường Kiệt, Phường 14, Quận 10, TP. HCM`)
}]
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZE[16],
    marginTop: SIZE[16]
  },
  banner: {
    height: WIDTH_SCREEN * 0.3,
    width: WIDTH_SCREEN,
    resizeMode: 'contain',
    paddingBottom: SIZE[30],
  },
  title: {
    fontSize: SIZE[20],
    fontFamily: FONT.semiBold_600,
    paddingBottom: SIZE[16]
  },
  infor_items_view: {
    flexDirection: 'row',
    paddingVertical: SIZE[16],
    justifyContent: 'center',
    alignItems: 'center'
  },
  ic: {
    width: SIZE[24],
    height: SIZE[24],
    marginRight: SIZE[16]
  },
  inforLabel: {
    flex: 1,
    fontFamily: FONT.regular_400,
    color: COLOR._595959,
    lineHeight: SIZE[24],
    fontSize: SIZE[16],
  }
});
