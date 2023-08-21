import React from 'react';
import ProfileModule from '../../module/profile/ProfileModule';
// import DashboardModule from '../../module/dashboard/DashboardModule';
import HistoryModule from '../../module/history/HistoryModule';
import DeliveryModule from '../../module/delivery/DeliveryModule';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {STRING, IMAGE, COLOR, FONT} from '../../constants';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {MainRoutes} from '../../routes/routes';
import { SIZE } from '../../constants/Size';
const Tab = createBottomTabNavigator();

export const BottomBar = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      {/* <Tab.Screen
        name={MainRoutes.Delivery}
        component={DeliveryModule}
        options={{
          headerShown: false,
          title: STRING.bottomBar.delivery,
        }}
      /> */}
      <Tab.Screen
        name={MainRoutes.History}
        component={HistoryModule}
        options={{
          headerShown: false,
          title: STRING.bottomBar.history,
        }}
      />
      <Tab.Screen
        name={MainRoutes.Profile}
        component={ProfileModule}
        options={{
          headerShown: false,
          title: STRING.bottomBar.profile,
        }}
      />
    </Tab.Navigator>
  );
};
function MyTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        let label: string;
        if (options.tabBarLabel !== undefined) {
          label = options.tabBarLabel?.toString();
        } else {
          if (options.title !== undefined) {
            label = options.title;
          } else {
            label = route.name;
          }
        }
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let icon;
        switch (route.name) {
          // case MainRoutes.Delivery:
          //   icon = IMAGE.ic_delivery;
          //   break;
          case MainRoutes.History:
            icon = IMAGE.ic_clock;
            break;
          case MainRoutes.Dashboard:
            icon = IMAGE.ic_piechart;
            break;
          case MainRoutes.Profile:
            icon = IMAGE.ic_profile;
            break;
          default:
            break;
        }
        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButtonContainer}>
            <Image
              source={icon}
              style={[
                styles.tabBarIcon,
                isFocused && styles.isSelectedTabBarIcon,
              ]}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.tabBarLabel,
                isFocused && styles.isSelectedTabBarLabel,
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    height: SIZE[40] * 2,
    backgroundColor: COLOR.white,
    borderTopWidth: 1,
    borderColor: COLOR._F5F5F5,
    borderTopLeftRadius: SIZE[14],
    borderTopRightRadius: SIZE[14],
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  tabBarButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.white,
    borderTopLeftRadius: SIZE[14],
    borderTopRightRadius: SIZE[14],
  },
  tabBarLabel: {
    color: COLOR._BFBFBF,
    fontFamily: FONT.regular_400,
    fontSize: SIZE[12],
    lineHeight: SIZE[16],
    textAlign: 'center',
    paddingTop: SIZE[8],
  },
  isSelectedTabBarLabel: {
    color: COLOR.yellow,
  },
  tabBarIcon: {
    width: SIZE[24],
    height: SIZE[24],
    tintColor: COLOR._BFBFBF,
  },
  isSelectedTabBarIcon: {
    tintColor: COLOR.yellow,
  },
});
