import React from 'react';
import Module1 from '../../module/module1/Module1';
import Module2 from '../../module/module2/Module2';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export const BottomBar = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Module1"
        component={Module1}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Module2"
        component={Module2}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};
