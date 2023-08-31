import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, FlatList, Platform } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { textStyles, viewStyles } from '../../styles';
import { Header } from '../../components/header';
import { SelectForm, SelectItemProps } from '../../components/selectForm';
import { useFocusEffect } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getListTempAction, resetListTempAction } from '../../redux/reducer/device/getTempsReducer';
import { Status } from '../../models';
import { Loading } from '../../components/common';
import { convertDateTime, stringIsEmpty } from '../../constants/Function';
import { setSnackBarMessage } from '../../redux/reducer/snackBarReducer';
import { getListNotificationAction } from '../../redux/reducer/device/getNotificationReducer';
import { COLOR, IMAGE, WIDTH_SCREEN } from '../../constants';
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const DashboardModule = () => {
  const dispatch = useAppDispatch();
  const [dataSelect, setSelect] = useState<SelectItemProps[]>(roomData);
  const [dataSetAir, setDataSetAir] = useState<any[]>([
    {
      data: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      strokeWidth: 1,
      color: (opacity = 1) => 'blue'
    }
  ]);
  const [legend, setLegend] = useState<string[]>(['Phòng khách']);

  const status = useAppSelector(state => state.getTempsReducer.status);
  const message = useAppSelector(state => state.getTempsReducer.message);
  const dataListTemps = useAppSelector(state => state.getTempsReducer.data);

  const statusNoti = useAppSelector(state => state.getNotificationReducer.status);
  const messageNoti = useAppSelector(state => state.getNotificationReducer.message);
  const dataListNoti = useAppSelector(state => state.getNotificationReducer.data);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getListTempAction());
      dispatch(getListNotificationAction());
      return () => {
        setLegend(['Phòng khách'])
        setDataSetAir([{
          data: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
          strokeWidth: 1,
          color: (opacity = 1) => 'blue'
        }])
        dispatch(resetListTempAction());
      };
    }, [dispatch]),
  );
  useEffect(() => {
    if (status !== Status.loading && dataListTemps && dataListTemps?.length > 0) {
      let newData = [
        {
          data: dataListTemps?.map((value) => { return value.data }),
          strokeWidth: 1,
          color: (opacity = 1) => 'blue'
        }
      ]
      setDataSetAir(newData)
    }
  }, [dataListTemps])

  useEffect(() => {
    if (status == Status.error && message && !stringIsEmpty(message)) {
      dispatch(setSnackBarMessage(message, 'error'))
    }
  }, [message])

  const _onSelect = (value: SelectItemProps[]) => {
    let newDataAir = value.map((val, index) => {
      if (val.label == 'Phòng khách (demo)' && dataListTemps && dataListTemps.length > 0) {
        return {
          data: dataListTemps?.map((value) => { return value.data }),
          strokeWidth: 1,
          color: (opacity = 1) => 'blue'
        }
      }
      return {
        data: val.data.dataAir,
        strokeWidth: 1,
        color: (opacity = 1) => val?.data?.color ? val?.data.color : undefined,
      }
    })
    let newlegend = value.map((val) => {
      return val.label
    })
    setLegend(newlegend)
    setDataSetAir(newDataAir)
  }

  return (
    <View style={styles.container}>
      <Header title='Thống kê ( 7 ngày gần nhất )' />
      {status === Status.loading && <Loading />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 16 }}
      >
        <SelectForm
          caption={
            "Chọn phòng"
          }
          multiple
          items={dataSelect}
          editable={true}
          onChangeValue={value => {
            if (value.length > 0) {
              _onSelect(value);
            }
          }}
        />
        <View style={{ marginTop: 12 }}>
          <Text style={textStyles.normalBold}>Nhiệt độ phòng</Text>
          {dataSetAir.length > 0 &&
            <LineChart
              bezier
              data={{
                labels: ['T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy', 'Chủ nhật'],
                datasets: dataSetAir,
                legend: legend,
              }}
              yAxisSuffix="℃"
              width={Dimensions.get('window').width - 20}
              height={Dimensions.get("window").width * 0.65}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: '#9fdce4',
                backgroundGradientTo: '#9fdce4',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />}
        </View>
        <Text style={[textStyles.normalBold,{marginTop:16}]}>Lịch sử thiết bị</Text>
        {dataListNoti?.map((item, index) => (
          <View style={styles.room}>
            <Image style={[styles.icon, { alignSelf: 'center', marginLeft: 10 }]} source={item.feed.includes('fan') ? IMAGE.ic_air : IMAGE.ic_light} />
            <View style={styles.home}>
              <Text style={[textStyles.normalBold, { marginLeft: 16, color: item.content.includes('on') ? 'green' : 'black' }]}>{item.content}</Text>
              <Text style={[textStyles.normal, { marginLeft: 16 }]}>{convertDateTime(item.createAt, 'dd-MM-yyyy hh:mm:ss', false)}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const roomData = [
  {
    id: '1',
    label: 'Phòng khách (demo)',
    data: {
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '2',
    label: 'Phòng Bếp',
    data: {
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '3',
    label: 'Phòng Thờ',
    data: {
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '4',
    label: 'Phòng Ngủ 1',
    data: {
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '5',
    label: 'Phòng Ngủ 2',
    data: {
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
]

export default DashboardModule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  room: {
    borderRadius: 20,
    width: WIDTH_SCREEN*0.9,
    backgroundColor: 'white',
    marginTop: 16,
    alignSelf:'center',
    flexDirection: 'row'
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
  }
});
