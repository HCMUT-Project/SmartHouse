// import React from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
// import { COLOR, IMAGE, STRING } from '../../constants';
// import { textStyles, viewStyles } from '../../styles';
// import { MaterialModel } from '../../models/order/Order';
// import { SIZE } from '../../constants/Size';
// interface MaterialProps extends MaterialModel {
//   index: number;
//   // recommentQuanti?: number;
//   onEdit?: Function;
//   onDelete?: Function;
//   readOnly?: boolean;
// }

// const Material = ({
//   materialCode,
//   name,
//   quantity,
//   index,
//   onDelete,
//   onEdit,
//   readOnly,
// }: // recommentQuanti,
//   MaterialProps) => {
//   return (
//     <View style={styles.container}>
//       <View style={viewStyles.flex1}>
//         <Text style={styles.label}>
//           {index + 1 + '. ' + materialCode + ' - ' + name}
//         </Text>
//         <Text style={textStyles.note}>
//           {STRING.material.quanti}: {quantity}
//         </Text>
//       </View>
//       <View style={styles.btn_view}>
//         {onDelete && !readOnly && (
//           <TouchableOpacity
//             onPress={() => {
//               onDelete();
//             }}
//             style={styles.btn}>
//             <Image source={IMAGE.ic_trash} style={styles.icon} />
//           </TouchableOpacity>
//         )}
//         {onEdit && !readOnly && (
//           <TouchableOpacity
//             style={styles.btn}
//             onPress={() => {
//               onEdit();
//             }}>
//             <Image source={IMAGE.ic_edit} style={styles.icon} />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// export default Material;

// const styles = StyleSheet.create({
//   container: {
//     width: '100%',
//     padding: SIZE[16],
//     backgroundColor: 'white',
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: COLOR._F3F3F3,
//     borderRadius: SIZE[12],
//     marginVertical: SIZE[8],
//   },
//   label: {
//     ...textStyles.normalMedium,
//     width: '100%',
//   },
//   btn_view: { flexDirection: 'row', alignItems: 'center' },
//   btn: {
//     padding: SIZE[10],
//     paddingHorizontal: SIZE[4],
//   },
//   icon: {
//     width: SIZE[24],
//     height: SIZE[24],
//     resizeMode: 'contain',
//   },
// });
