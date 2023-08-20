import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native';
import {IMAGE, STRING} from '../../constants';
import {MaterialModel} from '../../models/order/Order';
import {BottomView} from '../bottomView';
import Product from './Product';
import {ListMaterialsProps} from './ListMaterials';
import {stringIsEmpty} from '../../constants/Function';

const ListProducts = ({onConfirm, data, readOnly}: ListMaterialsProps) => {
  const [products, setProducts] = useState<MaterialModel[]>([]);
  const _onChangeProductDeliverQuanti = (
    indexEdit: number,
    deliverQuanti: string,
  ) => {
    setProducts(
      products.map((product, index) => {
        if (index === indexEdit) {
          return {...product, actualQuantity: deliverQuanti};
        }
        return product;
      }),
    );
  };
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);
  const _onPressConfirm = () => {
    let findIndexError = products.findIndex(product => {
      return (
        // parseFloat(`${product.actualQuantity}`) === 0 ||
        stringIsEmpty(`${product.actualQuantity}`)
      );
    });
    if (findIndexError !== -1) {
      Alert.alert(STRING.popup.error, STRING.product.invalidQuanti);
      return;
    }
    onConfirm(products);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={true}
        renderItem={({item, index}) => {
          return (
            <Product
              key={index}
              changeDeliverQuanti={(text: string) => {
                _onChangeProductDeliverQuanti(index, text);
              }}
              image={IMAGE.banner}
              deliverQuanti={
                item?.actualQuantity ? item.actualQuantity : undefined
              }
              readOnly={readOnly}
              materialCode={item.materialCode}
              name={item.name}
              unit={item.unit}
              quantity={item.quantity}
            />
          );
        }}
      />
      {!readOnly && (
        <BottomView
          buttons={[
            {
              label: STRING.btn.save,
              icon: IMAGE.ic_success_white,
              onPress: () => {
                _onPressConfirm();
              },
            },
          ]}
        />
      )}
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
