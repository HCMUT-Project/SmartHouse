import React, {useState, useEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {NormalButton} from '../../components/button';
import {STRING} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {Status} from '../../models';
import {loginAction} from '../../redux/reducer/user.reducer';
import {MainRoutes} from '../../routes/routes';
import {MainNavigationProp} from '../../routes/type';

const Login = ({navigation}: MainNavigationProp) => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.userReducer.status);
  const message = useAppSelector(state => state.userReducer.message);

  const [username, setUsername] = useState('pheduyetcap1');
  const [password, setPassword] = useState('123456A@a');

  const onChangeUsername = (value: string) => {
    setUsername(value);
  };

  const onChangePassword = (value: string) => {
    setPassword(value);
  };

  const onPressLogin = () => {
    dispatch(
      loginAction({
        username: username,
        Password: password,
        OS: '1',
        DeviceID: '123123123123',
        DeviceToken: 'firebase token',
        LangID: 'VN',
        company: 'HDBANK',
        Version: '1.0',
        build: '10',
      }),
    );
  };

  useEffect(() => {
    if (status === Status.success) {
      navigation.replace(MainRoutes.BottomBar);
    }
    if (status === Status.error && message !== '') {
      Alert.alert(message);
    }
  }, [message, navigation, status]);

  return (
    <View style={styles.container}>
      <NormalButton
        onPress={onPressLogin}
        label={STRING.login}
        style={{
          marginVertical: 10,
        }}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
