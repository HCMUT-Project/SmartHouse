import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { NormalButton } from '../../components/button';
import { COLOR, IMAGE, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import {
  logOutAction,
  loginAction,
} from '../../redux/reducer/user.reducer';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';
import { BaseImage, Checkbox, SIZE } from '@ddc-fis-hcm/react-native-sdk';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import * as Keychain from 'react-native-keychain';
import { stringIsEmpty } from '../../constants/Function';
import { setSnackBarMessage } from '../../redux/reducer/snackBarReducer';
import Loading from '../../components/common/Loading';
import { textStyles } from '../../styles';
import DeviceInfo from 'react-native-device-info';

const Login = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);
  const loginData = useAppSelector(state => state.userReducer.loginData);

  const [isRegisterAccount, setIsRegisterAccount] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errUsername, setErrUsername] = useState('');
  const [errPwd, setErrPwd] = useState('');

  const [isRememberPwd, setIsRememberPwd] = useState(true);

  const onChangeUsername = (value: string) => {
    if (value.length > 0 && errUsername.length > 0) {
      setErrUsername('');
    }
    setUsername(value);
  };

  const onChangePassword = (value: string) => {
    if (value.length > 0 && errPwd.length > 0) {
      setErrPwd('');
    }
    setPassword(value);
  };

  const onPressLogin = () => {
    let isValid = _onValidate();
    if (isValid) {
      dispatch(
        loginAction({
          username,
          password,
        }),
      );
    }
  };

  const _onValidate = () => {
    let isValid = true;
    if (username.length === 0) {
      setErrUsername(`${STRING.username} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    if (password.length === 0) {
      setErrPwd(`${STRING.password} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    return isValid;
  };

  const getCredentials = async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      if (!stringIsEmpty(credentials.username)) {
        setUsername(credentials.username);
      }
      if (!stringIsEmpty(credentials.password)) {
        setPassword(credentials.password);
      }
      if (
        !stringIsEmpty(credentials.username) &&
        !stringIsEmpty(credentials.password)
      ) {
        dispatch(
          loginAction({
            username: credentials.username,
            password: credentials.password,
          }),
        );
      }
    } else {
      console.log('LoginModule -> No credentials stored');
    }
  };
  const savePwd = useCallback(async (usr: string, pwd: string) => {
    await Keychain.setGenericPassword(usr, pwd);
  }, []);

  useEffect(() => {
    if (status === Status.success) {
      if (isRememberPwd) {
        savePwd(username, password);
      }
      dispatch(setSnackBarMessage('Đăng nhập thành công', 'success'));
    }
    if (status === Status.error && message !== '') {
      Alert.alert(STRING.popup.error, message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(logOutAction());
          },
        },
      ]);
    }
  }, [
    status,
    message,
    savePwd,
    navigation,
    isRememberPwd,
    dispatch,
    username,
    password,
    loginData,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={-SIZE[40] * 3}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={'handled'}>
          <BaseImage source={IMAGE.logo} style={styles.logo} />
          <View>
            <TextFieldForm
              caption={STRING.username}
              value={username}
              onChangeText={onChangeUsername}
              error={errUsername}
            />
            <TextFieldForm
              caption={STRING.password}
              value={password}
              onChangeText={onChangePassword}
              textType={'password'}
              error={errPwd}
            />
            <View style={styles.signUp}>
              <Checkbox
                style={styles.rmb_pwd_btn}
                onPress={() => setIsRememberPwd(!isRememberPwd)}
                isSelected={isRememberPwd}
                color="warning"
                label={STRING.rememberPwd}
              />
              {isRegisterAccount && (
                <TouchableOpacity
                  onPress={() => navigation.navigate(MainRoutes.Register)}>
                  <Text style={styles.signUpLabel}>{STRING.signUp.signUp}</Text>
                </TouchableOpacity>
              )}
            </View>
            <NormalButton
              onPress={onPressLogin}
              label={STRING.login}
              style={styles.login_btn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      {status === Status.loading && <Loading />}
      <Text style={styles.version}>{DeviceInfo.getVersion()}</Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZE[10],
    backgroundColor: COLOR.white,
  },
  logo: {
    width: '50%',
    alignSelf: 'center',
    top: Dimensions.get('screen').height * 0.05,
    position: 'absolute',
    resizeMode: 'contain',
  },
  rmb_pwd_btn: {
    alignSelf: 'flex-start',
    paddingVertical: SIZE[10],
  },
  login_btn: {
    borderRadius: 10,
    marginVertical: SIZE[10],
    backgroundColor: COLOR.red,
  },
  version: {
    bottom: SIZE[24],
    position: 'absolute',
    alignSelf: 'center',
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signUpLabel: {
    ...textStyles.normal,
    color: COLOR._FA8C16,
  },
});
