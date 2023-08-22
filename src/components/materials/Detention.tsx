// import React from 'react';
// import {StyleSheet, View, Text, TouchableOpacity,Image} from 'react-native';
// import {IMAGE, STRING} from '../../constants';
// import {textStyles} from '../../styles';
// import {orderType} from '../../models';
// import { SIZE } from '../../constants/Size';

// interface DetentionProps {
//   onPressBtn: Function;
//   odType: orderType;
// }
// const Detention = ({onPressBtn, odType}: DetentionProps) => {
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => {
//           onPressBtn('cancel');
//         }}>
//         <Image source={IMAGE.ic_bill_cancel} style={styles.icon} />
//         <Text style={textStyles.normalMedium}>
//           {odType === orderType.DELIVERY_ORDER_DELIVER
//             ? STRING.btn.cancelDeliver
//             : STRING.btn.cancelHandover}
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={[styles.btn, styles.btn_appointment]}
//         onPress={() => {
//           onPressBtn('appointment');
//         }}>
//         <Image source={IMAGE.ic_truck_orange} style={styles.icon} />
//         <Text style={textStyles.normalMedium}>
//           {odType === orderType.DELIVERY_ORDER_DELIVER
//             ? STRING.btn.deliverAppointment
//             : STRING.btn.handoverAppointment}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default Detention;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     padding: SIZE[16],
//     justifyContent: 'space-evenly',
//     flexDirection: 'row',
//   },
//   btn: {
//     backgroundColor: '#FFF1F0',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: SIZE[8],
//     height: SIZE[50] * 3,
//     width: SIZE[50] * 3,
//   },
//   btn_appointment: {
//     backgroundColor: '#FFF1F0',
//   },
//   icon: {
//     width: SIZE[40],
//     height: SIZE[40],
//     resizeMode: 'cover',
//   },
// });
