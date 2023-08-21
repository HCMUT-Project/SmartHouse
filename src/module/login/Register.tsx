import React, { useState, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import { NormalButton } from '../../components/button';
import { COLOR, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import { MainNavigationProp } from '../../routes/type';
import { SIZE } from '../../constants/Size';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import Loading from '../../components/common/Loading';
import { Header } from '../../components/header';
import {
  signUpAction,
  signUpResetAction,
} from '../../redux/reducer/profile/user.signUp.reducer';

const Register = ({ navigation }: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userSignUpReducer.status);
  const message = useAppSelector(state => state.userSignUpReducer.message);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPwd] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [errPhoneNumber, setErrPhoneNumber] = useState('');
  const [errFullName, setErrFullName] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const [errPwd, setErrPwd] = useState('');
  const [errConfirmPwd, setErrConfirmPwd] = useState('');

  const onChangePhoneNumber = (value: string) => {
    if (value.length > 0 && errPhoneNumber.length > 0) {
      setErrPhoneNumber('');
    }
    setPhoneNumber(value);
  };

  const onChangeFullName = (value: string) => {
    if (value.length > 0 && errFullName.length > 0) {
      setErrFullName('');
    }
    setFullName(value);
  };

  const onChangeEmail = (value: string) => {
    if (value.length > 0 && errEmail.length > 0) {
      setErrEmail('');
    }
    setEmail(value);
  };

  const onChangePassword = (value: string) => {
    if (value.length > 0 && errPwd.length > 0) {
      setErrPwd('');
    }
    setPassword(value);
  };
  const onChangeConfirmPassword = (value: string) => {
    if (value.length > 0 && errConfirmPwd.length > 0) {
      setErrConfirmPwd('');
    }
    setConfirmPwd(value);
  };
  const onPressSignUp = () => {
    let isValid = _onValidate();
    if (isValid) {
      dispatch(
        signUpAction({
          "email": email,
          "password": password,
          "name": fullName,
          "photoURL": "",
          "phoneNumber": phoneNumber
        }),
      );
    }
  };

  const _onValidate = () => {
    let isValid = true;
    if (phoneNumber.length === 0) {
      setErrPhoneNumber(
        `${STRING.signUp.phoneNumber} ${STRING.valid.notBeBlank}`,
      );
      isValid = false;
    }
    if (fullName.length === 0) {
      setErrFullName(`${STRING.signUp.fullName} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    if (email.length === 0) {
      setErrEmail(`${STRING.signUp.email} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    if (confirmPassword.length === 0) {
      setErrConfirmPwd(
        `${STRING.changePwd.confirmPwd} ${STRING.valid.notBeBlank}`,
      );
      isValid = false;
    }
    if (password.length === 0) {
      setErrPwd(`${STRING.password} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    return isValid;
  };
  useEffect(() => {
    if (status === Status.success) {
      Alert.alert(STRING.popup.notice, message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(signUpResetAction());
            navigation.goBack();
          },
        },
      ]);
    }
    if (status === Status.error && message !== '') {
      Alert.alert(STRING.popup.error, message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(signUpResetAction());
          },
        },
      ]);
    }
  }, [status, message, navigation, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        onPressBack={() => {
          navigation.goBack();
        }}
        title={`${STRING.signUp.signUp}`}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={-SIZE[40] * 3}
        style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={'handled'}>
          <View>
            <TextFieldForm
              caption={STRING.signUp.email}
              value={phoneNumber}
              keyboardType={'phone-pad'}
              onChangeText={onChangeEmail}
              error={errPhoneNumber}
            />
            <TextFieldForm
              caption={STRING.signUp.phoneNumber}
              value={phoneNumber}
              keyboardType={'phone-pad'}
              onChangeText={onChangePhoneNumber}
              error={errPhoneNumber}
            />
            <TextFieldForm
              caption={STRING.signUp.fullName}
              value={fullName}
              onChangeText={onChangeFullName}
              error={errFullName}
            />
            <TextFieldForm
              caption={STRING.password}
              value={password}
              onChangeText={onChangePassword}
              textType={'password'}
              error={errPwd}
            />
            <TextFieldForm
              caption={STRING.changePwd.confirmPwd}
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              textType={'password'}
              error={errConfirmPwd}
            />
          </View>
        </ScrollView>
        <NormalButton
          onPress={onPressSignUp}
          label={STRING.signUp.signUp}
          style={styles.login_btn}
        />
      </KeyboardAvoidingView>
      {status === Status.loading && <Loading />}
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZE[20],
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
});
