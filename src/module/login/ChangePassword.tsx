import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Platform,
} from 'react-native';
import { COLOR, STRING } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';
import { MainRoutes } from '../../routes/routes';
import { MainNavigationProp } from '../../routes/type';
import { SIZE } from '../../constants/Size';
import { TextFieldForm } from '../../components/textField/TextFieldForm';
import { Header } from '../../components/header';
import { BottomView } from '../../components/bottomView';
import { viewStyles } from '../../styles';
import {
  changePwdAction,
  resetStatusChangePwd,
} from '../../redux/reducer/profile/changePwd.reducer';
import * as Keychain from 'react-native-keychain';
import { stringIsEmpty } from '../../constants/Function';
import { logOutAction } from '../../redux/reducer/profile/user.reducer';

const newPwdConditions = [
  {
    regex: '^.{8,}',
    errMsg: STRING.valid.length,
  },
  // {
  //   // regex: '^[A-Za-z0-9]*$',
  //   regex: '[!@#$%^&*(),.?":{}|<>]',
  //   errMsg: STRING.valid.specialChar,
  // },
  {
    regex: '[a-z]',
    errMsg: STRING.valid.lowercaseChar,
  },
  {
    regex: '[A-Z]',
    errMsg: STRING.valid.uppercaseChar,
  },
  {
    regex: '[0-9]',
    errMsg: STRING.valid.numberChar,
  },
];

interface ChangePwdModuleProps
  extends MainNavigationProp<MainRoutes.ChangePwd> { }

const ChangePwdModule = ({ navigation, route }: ChangePwdModuleProps) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.changePwdReducer.status);
  const message = useAppSelector(state => state.changePwdReducer.message);

  const [currentPwd, setCurrentPwd] = useState('');
  const [errCurrentPwd, setErrCurrentPwd] = useState('');

  const [newPwd, setNewPwd] = useState('');
  const [errNewPwd, setNewErrPwd] = useState('');

  const [confirmPwd, setConfirmPwd] = useState('');
  const [errConfirmPwd, setErrConfirmPwd] = useState('');

  const onChangePassword = (
    value: string,
    field: 'currentPwd' | 'newPwd' | 'confirmPwd',
  ) => {
    if (field === 'currentPwd') {
      setCurrentPwd(value);
      if (value.length > 0 && errCurrentPwd.length > 0) {
        setErrCurrentPwd('');
      }
    }
    if (field === 'confirmPwd') {
      setConfirmPwd(value);
      if (value.length > 0 && value === newPwd && errConfirmPwd.length > 0) {
        setErrConfirmPwd('');
      }
    }
    if (field === 'newPwd') {
      setNewPwd(value);
      if (value.length > 0 && newPwd.length > 0) {
        setNewErrPwd('');
      }
    }
  };

  const onSubmit = () => {
    let isValid = _onValidate();
    if (isValid) {
      dispatch(changePwdAction({ oldPassword: currentPwd, newPassword: newPwd }));
    }
  };

  const _onValidate = () => {
    let isValid = true;
    if (currentPwd.length === 0) {
      setErrCurrentPwd(
        `${STRING.changePwd.currentPwd} ${STRING.valid.notBeBlank}`,
      );
      isValid = false;
    }
    if (newPwd.length === 0) {
      setNewErrPwd(`${STRING.changePwd.newPwd} ${STRING.valid.notBeBlank}`);
      isValid = false;
    }
    if (confirmPwd !== newPwd) {
      setErrConfirmPwd(STRING.valid.pwdNotMatch);
      isValid = false;
    }
    for (let condition of newPwdConditions) {
      if (new RegExp(condition.regex).test(newPwd) === false) {
        isValid = false;
      }
    }
    return isValid;
  };
  const _onResetState = () => {
    setNewPwd('');
    setConfirmPwd('');
    setCurrentPwd('');
  };
  const savePwd = useCallback(async () => {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      if (!stringIsEmpty(credentials.username)) {
        await Keychain.setGenericPassword(credentials.username, newPwd);
        _onResetState();
        navigation.goBack();
      }
    }
  }, [newPwd, navigation]);
  useEffect(() => {
    if (status === Status.success) {
      Alert.alert('Thông báo', STRING.changePwd.reLogin, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(logOutAction());
          },
        },
      ]);
      dispatch(resetStatusChangePwd());
    }
    if (status === Status.error && message !== '') {
      Alert.alert('Thông báo', message, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(resetStatusChangePwd());
          },
        },
      ]);
    }
  }, [
    message,
    status,
    navigation,
    savePwd,
    dispatch,
  ]);

  return (
    <View style={styles.container}>
      <Header
        onPressBack={
          () => {
            navigation.goBack();
          }
        }
        title={
          STRING.changePwd.changePwd
        }
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        style={viewStyles.flex1}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}>
          <View style={styles.content}>
            <TextFieldForm
              caption={STRING.changePwd.currentPwd}
              value={currentPwd}
              onChangeText={value => {
                onChangePassword(value, 'currentPwd');
              }}
              error={errCurrentPwd}
              placeholder={STRING.changePwd.currentPwd}
              textType={'password'}
            />
            <TextFieldForm
              caption={STRING.changePwd.newPwd}
              value={newPwd}
              onChangeText={value => {
                onChangePassword(value, 'newPwd');
              }}
              error={errNewPwd}
              placeholder={STRING.changePwd.inputNewPwd}
              textType={'password'}
            />
            <View style={styles.validation}>
              {newPwdConditions.map((item, index) => {
                let textColor = COLOR._BFBFBF;
                if (new RegExp(item.regex).test(newPwd)) {
                  textColor = COLOR.successPrimary;
                } else {
                  textColor = COLOR.red;
                }
                if (newPwd.length === 0) {
                  textColor = COLOR._BFBFBF;
                }
                return (
                  <Text
                    key={index}
                    style={[styles.validationText, { color: textColor }]}>
                    {item.errMsg}
                  </Text>
                );
              })}
            </View>
            <TextFieldForm
              caption={STRING.changePwd.confirmPwd}
              value={confirmPwd}
              error={errConfirmPwd}
              onChangeText={value => {
                onChangePassword(value, 'confirmPwd');
              }}
              placeholder={STRING.changePwd.inputNewPwd}
              textType={'password'}
            />
          </View>
        </ScrollView>
        <BottomView
          buttons={[
            {
              label: STRING.save,
              onPress: () => {
                onSubmit();
              },
            },
          ]}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePwdModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: SIZE[16],
    backgroundColor: COLOR.white,
  },
  validation: {
    paddingVertical: SIZE[10],
  },
  validationText: {
    padding: SIZE[4],
  },
  submit_btn: {
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
    bottom: 0,
    marginHorizontal: SIZE[20],
    backgroundColor: COLOR.red,
  },
});
