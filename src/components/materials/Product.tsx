import React from 'react';
import { StyleSheet, View, Text, TextInput, Alert, Image } from 'react-native';
import { COLOR, STRING } from '../../constants';
import { textStyles, viewStyles } from '../../styles';
import { MaterialModel } from '../../models/order/Order';
import { SIZE } from '../../constants/Size';
export interface ProductProps extends MaterialModel {
  changeDeliverQuanti: Function;
  readOnly?: boolean;
  deliverQuanti?: number | string;
}
const Product = ({
  name,
  materialCode,
  quantity,
  unit,
  image,
  deliverQuanti,
  changeDeliverQuanti,
  readOnly,
}: ProductProps) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.product_img} />
      <View style={viewStyles.flex1}>
        <Text style={textStyles.normal}>{name}</Text>
        <Text style={textStyles.note}>
          {STRING.product.code}: {materialCode}
        </Text>
        <Text style={textStyles.note}>
          {STRING.product.quanti}: {quantity} {unit}
        </Text>
        <View style={styles.diliver_quanti_view}>
          <Text style={textStyles.normal}>{STRING.product.deliverQuanti}</Text>
          <TextInput
            keyboardType={
              unit && unit.toUpperCase() !== 'KG' ? 'number-pad' : 'numeric'
            }
            value={deliverQuanti ? `${deliverQuanti}` : ''}
            editable={!readOnly}
            onChangeText={text => {
              if (
                unit &&
                unit.toUpperCase() !== 'KG' &&
                (text.includes('.') || text.includes(','))
              ) {
                Alert.alert(STRING.popup.notice, STRING.valid.invalidQuanti);
                return;
              }
              if (text.split('.').length > 2 || text.split(',').length > 2) {
                Alert.alert(STRING.popup.notice, STRING.valid.invalidQuanti);
                return;
              }
              if (
                (text.split('.')[1] !== undefined &&
                  text.split('.')[1].length > 2) ||
                (text.split(',')[1] !== undefined &&
                  text.split(',')[1].length > 2)
              ) {
                Alert.alert(STRING.popup.notice, STRING.valid.invalidQuanti);
                return;
              }
              changeDeliverQuanti(text);
            }}
            style={
              readOnly ? styles.input_quanti_read_only : styles.input_quanti
            }
            textAlign={'center'}
          />
        </View>
        {deliverQuanti &&
          quantity &&
          parseFloat(`${deliverQuanti}`.replace(',', '.')) >
          parseFloat(`${quantity}`.replace(',', '.')) && (
            <Text style={[textStyles.small, { color: COLOR.yellow }]}>
              {STRING.product.warQuanti}
            </Text>
          )}
        {deliverQuanti && parseFloat(`${deliverQuanti}`) === 0 && (
          <Text style={[textStyles.small, { color: COLOR.yellow }]}>
            {STRING.product.warning}{STRING.product.quantiIs0}
          </Text>
        )}
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: SIZE[16],
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  product_img: {
    width: SIZE[50] + SIZE[14],
    height: SIZE[50] + SIZE[14],
    marginRight: SIZE[12],
    resizeMode: 'cover',
    borderRadius: SIZE[8],
  },
  diliver_quanti_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input_quanti: {
    borderWidth: 1,
    fontSize: SIZE[14],
    width: 70,
    paddingVertical: SIZE[10],
    borderColor: COLOR._D9D9D9,
    borderRadius: SIZE[4],
    color: 'black',
  },
  input_quanti_read_only: {
    fontSize: SIZE[14],
    width: 70,
    paddingVertical: SIZE[10],
    borderRadius: SIZE[4],
    color: 'black',
  },
});
