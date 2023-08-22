import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';

import { COLOR, IMAGE, STRING, SIZE } from '../../constants';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';
import { textStyles } from '../../styles';
import { Header } from '../../components/header';
import * as Keychain from 'react-native-keychain';
import { logOutAction } from '../../redux/reducer/profile/user.reducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';

import DeviceInfo from 'react-native-device-info';
import { API_DOMAIN } from '../../configs';

interface ProfileModuleProps extends MainNavigationProp<MainRoutes.Profile> { }
const ProfileModule = ({ navigation }: ProfileModuleProps) => {
  const dispatch = useAppDispatch();

  const loginData = useAppSelector(state => state.userReducer.loginData);

  const _onPressProfileButton = (screenNavigate: any) => {
    if (screenNavigate === MainRoutes.ChangePwd) {
      navigation.navigate(screenNavigate);
    } else {
      navigation.navigate(screenNavigate);
    }
  };
  const _onPressLogout = async () => {
    await Keychain.resetGenericPassword();
    dispatch(logOutAction());
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={STRING.bottomBar.profile}
        rightBtn={
          <TouchableOpacity
            style={styles.logout_btn}
            onPress={() => {
              _onPressLogout();
            }}>
            <Text style={styles.logout_label}>{STRING.profile.logout}</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.profile_view}>
            {/* <Image source={IMAGE.no_img} style={styles.avatar} /> */}
            <Image source={loginData?.avatar ? { uri: loginData?.avatar } : IMAGE.no_img} style={styles.avatar} />
            <View style={styles.profile_info}>
              <Text style={textStyles.medium}>{loginData?.name}</Text>
              <Text style={[textStyles.normal, { color: COLOR._7A7A7A }]}>
                {loginData?.phoneNumber}
              </Text>
              {/* <Text
                style={[
                  textStyles.normal,
                  { color: COLOR.red, marginTop: SIZE[8] },
                ]}>
                {loginData?.user.positionName}
              </Text> */}
            </View>
          </View>
          <View
            style={{
              marginTop: SIZE[8],
            }}>
            {buttonProfile.map((item, index) => (
              <TouchableOpacity
                style={styles.pofile_btn}
                key={index}
                onPress={() => {
                  _onPressProfileButton(item.screenNavigate);
                }}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={styles.label_btn}>{item.label}</Text>
                <Image source={IMAGE.ic_next_arrow} style={styles.icon} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const buttonProfile = [
  {
    icon: IMAGE.ic_lock,
    label: STRING.profile.changePwd,
    screenNavigate: MainRoutes.ChangePwd,
  },
  {
    icon: IMAGE.ic_i,
    label: STRING.profile.appInfor,
    screenNavigate: MainRoutes.AppInformation,
  },
];
export default ProfileModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.white,
  },
  body: {
    paddingHorizontal: SIZE[16],
    width: '100%',
    flex: 1,
    marginTop: SIZE[16],
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  header_label: {
    ...textStyles.medium,
  },
  logout_btn: {
    padding: SIZE[14],
    right: SIZE[30] * 2,
  },
  logout_label: {
    ...textStyles.normal,
    lineHeight: SIZE[24],
    color: COLOR.red,
  },
  profile_view: {
    backgroundColor: COLOR._F5F5F5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: SIZE[12],
    paddingHorizontal: SIZE[24],
    borderWidth: 1,
    borderRadius: SIZE[12],
    borderColor: COLOR._D9D9D9,
  },
  profile_info: {
    paddingHorizontal: SIZE[16],
  },
  avatar: {
    borderRadius: SIZE[26],
    height: SIZE[28] * 2,
    width: SIZE[28] * 2,
    overflow: 'hidden',
  },
  pofile_btn: {
    backgroundColor: COLOR.white,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: SIZE[16],
    borderWidth: 1,
    borderRadius: SIZE[12],
    borderColor: COLOR._D9D9D9,
    marginTop: SIZE[16],
  },
  label_btn: {
    ...textStyles.normal,
    flex: 1,
  },
  label_btn_delete: {
    ...textStyles.normal,
    color: COLOR.red,
    flex: 1,
  },
  btn_delete: {
    borderColor: COLOR.red,
  },
  icon: {
    width: SIZE[24],
    height: SIZE[24],
    resizeMode: 'contain',
    marginRight: SIZE[8],
  },
});
