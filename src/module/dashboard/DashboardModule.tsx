import React, { createRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { textStyles, viewStyles } from '../../styles';
import { Header } from '../../components/header';
import { BottomSheet, BottomSheetRef } from '../../components/bottomSheet';
import { COLOR, HEIGHT_WINDOW, IMAGE } from '../../constants';
import { SelectForm, SelectItemProps } from '../../components/selectForm';
const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const DashboardModule = () => {
  const [dataSelect, setSelect] = useState<SelectItemProps[]>(roomData);
  const [dataSetAir, setDataSetAir] = useState<any[]>([
    {
      data: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      strokeWidth: 1,
      color: (opacity = 1) => getRandomColor()
    }
  ]);
  const [dataSetLight, setDataSetLight] = useState<any[]>([
    {
      data: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      strokeWidth: 1,
      color: (opacity = 1) => getRandomColor()
    }
  ]);
  const [legend, setLegend] = useState<string[]>(['Phòng khách']);

  const _onSelect = (value: SelectItemProps[]) => {
    let newDataAir = value.map((val) => {
      return {
        data: val.data.dataAir,
        strokeWidth: 1,
        color: (opacity = 1) => val.data.color ? val.data.color : undefined,
      }
    })
    let newDataLight = value.map((val) => {
      return {
        data: val.data.dataLight,
        strokeWidth: 1,
        color: (opacity = 1) => val.data.color ? val.data.color : undefined,
      }
    })
    let newlegend = value.map((val) => {
      return val.label
    })
    setLegend(newlegend)
    setDataSetLight(newDataLight)
    setDataSetAir(newDataAir)
  }
  return (
    <View style={styles.container}>
      <Header title='Thống kê' />
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
        <View>
          <Text style={textStyles.normalBold}>Thời gian sử dụng đèn</Text>
          {dataSetLight.length > 0 &&
            <LineChart
              data={{
                labels: ['T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy', 'Chủ nhật'],
                datasets: dataSetLight,
                legend: legend,
              }}
              width={Dimensions.get("window").width - 20}
              height={Dimensions.get("window").width * 0.65}
              yAxisSuffix="h"
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "5",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />}

        </View>
        <View style={{ marginTop: 12 }}>
          <Text style={textStyles.normalBold}>Thời gian sử dụng điều hoà</Text>
          {dataSetAir.length > 0 &&
            <LineChart
              bezier
              data={{
                labels: ['T.Hai', 'T.Ba', 'T.Tư', 'T.Năm', 'T.Sáu', 'T.Bảy', 'Chủ nhật'],
                datasets: dataSetAir,
                legend: legend,
              }}
              yAxisSuffix="h"
              width={Dimensions.get('window').width - 20}
              height={250}
              chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                borderRadius: 16,
              }}
            />}
        </View>
      </ScrollView>
    </View>
  );
};

const roomData = [
  {
    id: '1',
    label: 'Phòng khách',
    data: {
      dataLight: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '2',
    label: 'Phòng Bếp',
    data: {
      dataLight: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '3',
    label: 'Phòng Thờ',
    data: {
      dataLight: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '4',
    label: 'Phòng Ngủ 1',
    data: {
      dataLight: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      dataAir: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
      color: getRandomColor()
    }
  },
  {
    id: '5',
    label: 'Phòng Ngủ 2',
    data: {
      dataLight: [Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24, Math.random() * 24],
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
});
