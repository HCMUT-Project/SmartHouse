import React, { useEffect, useState } from 'react';
import { Switch, StyleSheet, Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { COLOR, IMAGE, SIZE, WIDTH_SCREEN } from '../../constants';
import { textStyles } from '../../styles';
import { MainNavigationProp } from '../../routes/type';
import { MainRoutes } from '../../routes/routes';
import { Header } from '../../components/header';
import { objectIsNull, stringIsEmpty } from '../../constants/Function';
import { useFocusEffect } from '@react-navigation/native';
import { getRoomDataAction, getRoomResetAction } from '../../redux/reducer/device/deviceReducer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Status } from '../../models';

import { getTempAction, resetTempAction } from '../../redux/reducer/device/tempReducer';
import { Loading } from '../../components/common';
import { resetSetFanAction, setFanAction } from '../../redux/reducer/device/setFanReducer';
import { resetSetLedAction, setLedAction } from '../../redux/reducer/device/setLightReducer';
import { setSnackBarMessage } from '../../redux/reducer/snackBarReducer';

const HomeDetail = ({ navigation, route }: MainNavigationProp<MainRoutes.HomeDetail>) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(state => state.deviceReducer.status);
  const message = useAppSelector(state => state.deviceReducer.message);
  const messageLed = useAppSelector(state => state.deviceReducer.messageLed);
  const dataAir = useAppSelector(state => state.deviceReducer.dataAir);
  const dataLed = useAppSelector(state => state.deviceReducer.dataLed);


  const statusTemp = useAppSelector(state => state.tempReducer.status);
  const messageTemp = useAppSelector(state => state.tempReducer.message);
  const dataTemp = useAppSelector(state => state.tempReducer.data);

  const messageSetFan = useAppSelector(state => state.setFanReducer.message);
  const statusSetFan = useAppSelector(state => state.setFanReducer.status);

  const messageSetLed = useAppSelector(state => state.setLightReducer.message);
  const statusSetLed = useAppSelector(state => state.setLightReducer.status);

  const [data, setData] = useState([
    {
      text: 'Phòng khách (demo)',
      airCond: {
        isOn: false,
        value: ''
      },
      light: {
        isOn: false,
        value: ''
      },
    },
    {
      text: 'Phòng Bếp',
      airCond: {
        isOn: false,
        value: '25'
      },
      light: {
        isOn: true,
        value: ''
      },
    },
    {
      text: 'Phòng Ngủ 1',
      airCond: {
        isOn: false,
        value: '1'
      },
      light: {
        isOn: false,
        value: ''
      },
    },
    {
      text: 'Phòng Ngủ 2',
      airCond: {
        isOn: false,
        value: '30'
      },
      light: {
        isOn: false,
        value: ''
      },
    },
    {
      text: '',
      airCond: {
        isOn: false,
        value: '17'
      },
      light: {
        isOn: false,
        value: ''
      },
    },
  ])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getRoomDataAction());
      dispatch(getTempAction());
      return () => {
        dispatch(getRoomResetAction());
        dispatch(resetTempAction());
      };
    }, [dispatch]),
  );

  useEffect(() => {
    if (status !== Status.loading) {
      let newData = data.map((elem, index) => {
        if (index == 0) {
          let device = elem
          device.airCond.isOn = dataAir == '1'
          return device
        }
        return elem
      })
      setData(newData)
    }
  }, [dataAir])
  useEffect(() => {
    if (statusTemp !== Status.loading && dataTemp) {
      let newData = data.map((elem, index) => {
        if (index == 0) {
          let device = elem
          device.airCond.value = dataTemp
          return device
        }
        return elem
      })
      setData(newData)
    }
  }, [dataTemp])
  useEffect(() => {
    if (status != Status.loading) {
      let newData = data.map((elem, index) => {
        if (index == 0) {
          let device = elem
          device.light.isOn = dataLed == '1'
          return device
        }
        return elem
      })
      setData(newData)
    }
  }, [dataLed])

  useEffect(() => {
    if (status == Status.error) {
      if (message && !stringIsEmpty(message)) {
        dispatch(setSnackBarMessage(message, 'error'))
      }
      if (messageLed && !stringIsEmpty(messageLed)) {
        dispatch(setSnackBarMessage(messageLed, 'error'))
      }
    }
    if (statusTemp == Status.error) {
      if (messageTemp && !stringIsEmpty(messageTemp)) {
        dispatch(setSnackBarMessage(messageTemp, 'error'))
      }
    }
  }, [message, messageLed, messageTemp])


  useEffect(() => {
    if (statusSetLed == Status.error) {
      if (messageSetLed && !stringIsEmpty(messageSetLed)) {
        dispatch(setSnackBarMessage(messageSetLed, 'error'))
        dispatch(getRoomDataAction());
        dispatch(resetSetLedAction());
      }
    }
    if (statusSetLed == Status.success) {
      if (messageSetLed && !stringIsEmpty(messageSetLed)) {
        dispatch(setSnackBarMessage(messageSetLed, 'success'))
        dispatch(getRoomDataAction());
        dispatch(resetSetLedAction());
      }
    }
  }, [messageSetLed])

  useEffect(() => {
    if (statusSetFan == Status.error) {
      if (messageSetFan && !stringIsEmpty(messageSetFan)) {
        dispatch(setSnackBarMessage(messageSetFan, 'error'))
        dispatch(getRoomDataAction());
        dispatch(resetSetFanAction())
      }
    }
    if (statusSetFan == Status.success) {
      if (messageSetFan && !stringIsEmpty(messageSetFan)) {
        dispatch(setSnackBarMessage(messageSetFan, 'success'))
        dispatch(resetSetFanAction())
        dispatch(getRoomDataAction());
      }
    }
  }, [messageSetFan])

  const _onPress = (idPress: number, type: 'light' | 'air') => {
    if (idPress == 0) {
      if (type == 'air') {
        dispatch(setFanAction(!data[0].airCond.isOn))
      } else {
        dispatch(setLedAction(!data[0].light.isOn))
      }
    }

    let newData = data.map((elem, index) => {
      if (index === idPress) {
        let device = elem
        if (type == 'air') {
          device.airCond.isOn = !device.airCond.isOn
        } else {
          device.light.isOn = !device.light.isOn
        }
        return device
      }
      return elem
    })
    setData(newData)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={` Nhà của: ${route.params.name}`}
        onPressBack={() => { navigation.goBack() }}
      />
      {(status == Status.loading || statusTemp == Status.loading) && <Loading></Loading>}
      {(statusSetFan == Status.loading || statusSetLed == Status.loading) && <Loading></Loading>}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        contentContainerStyle={{ paddingHorizontal: 16, justifyContent: 'center', alignItems: 'center' }}
        renderItem={({ item, index }) => {
          if (index < data.length - 1) {
            return (
              <View style={styles.room}>
                <Text style={[textStyles.normalBold, { marginLeft: 16 }]}>{item.text}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles.home}>
                    <View key={index} style={styles.homeIcon}>
                      <Image style={styles.icon} source={IMAGE.ic_air} />
                      <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={item.airCond.isOn ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { _onPress(index, 'air') }}
                        value={item.airCond.isOn}
                      />
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={[textStyles.normalBold]}>{item.airCond.value} ℃</Text>
                      {!stringIsEmpty(item.airCond.value) &&
                        <Text style={[textStyles.normal]}>{' - '}
                          {parseInt(item.airCond.value) > 30
                            ? 'Rất nóng'
                            : parseInt(item.airCond.value) > 20 ? 'Nóng'
                              :
                              parseInt(item.airCond.value) > 15 ? 'Mát mẻ'
                                :
                                parseInt(item.airCond.value) > 0 ? 'Lạnh'
                                  : 'Rất lạnh'}
                        </Text>}
                    </View>
                  </View>
                  <View style={styles.home}>
                    <View key={index} style={styles.homeIcon}>
                      <Image style={styles.icon} source={IMAGE.ic_light} />
                      <Switch
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={item.light.isOn ? '#f5dd4b' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={() => { _onPress(index, "light") }}
                        value={item.light.isOn}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )
          } else {
            return <TouchableOpacity style={[styles.home, { alignItems: 'center', flex: undefined }]} onPress={() => {
              Alert.alert('Thông báo', 'Chức năng thêm phòng đang được phát triển')
             }}>
              <Image style={{
                width: 60,
                height: 60,
                resizeMode: 'cover',
              }} source={IMAGE.ic_add} />
            </TouchableOpacity>

          }
        }
        } />
    </SafeAreaView>
  );
};

export default HomeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },
  room: {
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    elevation: Platform.OS === 'android' ? 5 : 1,
    width: WIDTH_SCREEN * 0.9,
    backgroundColor: 'white',
    marginTop: 16,
    paddingVertical: 16
  },
  home: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 10,
    backgroundColor: COLOR._F5F5F5,
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 },
    elevation: Platform.OS === 'android' ? 5 : 1,
    padding: 16
  },
  homeIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 12
  },
  icon: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    marginRight: 16
  }
});
