import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {IMAGE, STRING} from '../../constants';
import {
  SIZE,
  SelectItemProps,
  WIDTH_SCREEN,
} from '@ddc-fis-hcm/react-native-sdk';
import {BottomView} from '../bottomView';
import Material from './Material';
import {MaterialModel, MaterialsType} from '../../models/order/Order';
import {TextFieldForm} from '../textField/TextFieldForm';
import {SelectForm} from '../select';
import {stringIsEmpty} from '../../constants/Function';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getMaterialsAction} from '../../redux/reducer/delivery/materials.reducer';
import {Status} from '../../models';
import {textStyles} from '../../styles';
import {sum} from '../../module/order/OrderDetailModule';

export interface ListMaterialsProps {
  readOnly?: boolean;
  onConfirm: Function;
  data?: MaterialModel[];
  dataMaterialDeliver?: MaterialModel[];
  type: MaterialsType;
  shipmentOrderCode: string;
}
interface MaterialProps extends MaterialModel {
  // recommentQuanti?: number;
}
export const ListMaterials = ({
  onConfirm,
  data,
  type,
  shipmentOrderCode,
  dataMaterialDeliver,
  readOnly,
}: ListMaterialsProps) => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(state => state.materialsReducer.status);
  // const message = useAppSelector(state => state.materialsReducer.message);

  const listMaterialOffset = useAppSelector(
    state => state.materialsReducer.listMaterialOffset,
  );
  const listMaterialDiliver = useAppSelector(
    state => state.materialsReducer.listMaterialDiliver,
  );
  const listMaterialCollect = useAppSelector(
    state => state.materialsReducer.listMaterialCollect,
  );
  const listMaterialCollectRecomment = useAppSelector(
    state => state.materialsReducer.listMaterialCollectRecomment,
  );

  const orderDetail = useAppSelector(state => state.orderDetailReducer.data);

  const childrenRef = useRef<any>();
  const [activeScroll, setActiveScroll] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const [materialCode, setMaterialCode] = useState<string>('');
  const [textSearch, setTextSearch] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [unit, setUnit] = useState<string>('');
  const [newQuanti, setNewQuanti] = useState<string>('');
  const [quantiRecomment, setQuantiRecomment] = useState<number>(0);
  const [defaultValue, setDefaultValue] = useState<SelectItemProps | undefined>(
    undefined,
  );
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [indexEdit, setIndexEdit] = useState<number>(-1);

  const [errQuanti, setErrQuanti] = useState<string>('');
  const [errData, setErrData] = useState<string>('');

  const [dataSelect, setSelect] = useState<SelectItemProps[]>([]);

  const [listMaterials, setListMaterials] = useState<MaterialProps[]>([]);

  const _addMaterial = () => {
    if (newName === '') {
      setErrData(
        `"${STRING.material.metarialOffsetName}" ${STRING.valid.notBeBlank}`,
      );
      return;
    }
    if (
      newQuanti.length === 0 ||
      parseFloat(newQuanti) === 0 ||
      isNaN(Number(newQuanti))
    ) {
      setErrQuanti(STRING.valid.plsInputQuanti);
      return;
    }
    if (newQuanti.includes('.') || newQuanti.includes(',')) {
      setErrQuanti(STRING.valid.numberMustBeInt);
      return;
    }
    let currentData: MaterialModel[] = [];
    switch (type) {
      case MaterialsType.material: {
        currentData = listMaterials;
        break;
      }
      case MaterialsType.materialCollect: {
        currentData = listMaterialCollect;
        break;
      }
      case MaterialsType.materialOffset: {
        currentData = listMaterialOffset;
        break;
      }
      case MaterialsType.materialDiliver: {
        currentData = listMaterialDiliver;
        break;
      }
      default:
        [];
    }
    let unit = currentData.find(
      elem => elem.materialCode === materialCode,
    )?.unit;
    if (indexEdit !== -1 && listMaterials.length >= indexEdit) {
      setListMaterials(
        listMaterials.map((item, index) => {
          if (index === indexEdit) {
            return {
              ...item,
              quantity:
                item.quantity && !isEdit
                  ? item.quantity + Number(newQuanti)
                  : Number(newQuanti),
            };
          } else {
            return item;
          }
        }),
      );
    } else {
      setListMaterials([
        ...listMaterials,
        ...[
          {
            materialCode: materialCode,
            name: newName,
            quantity: Number(newQuanti),
            unit: unit,
          },
        ],
      ]);
    }
    setIsEdit(false);
    setIndexEdit(-1);
    _onSelectTab(1);
  };
  const _clearState = () => {
    setNewName('');
    setMaterialCode('');
    setNewQuanti('');
    setUnit('');
    setErrQuanti('');
    setErrData('');
    setDefaultValue(undefined);
  };
  const _deleteMaterial = (indexDelete: number) => {
    setListMaterials(listMaterials.filter((_, index) => index !== indexDelete));
  };
  const _onPressEditMaterial = (item: MaterialModel, index: number) => {
    setIsEdit(true);
    setIndexEdit(index);
    setNewQuanti(`${item.quantity}`);
    setUnit(`${item.unit}`);
    setMaterialCode(`${item.materialCode}`);
    setNewName(`${item.name}`);
    setDefaultValue({id: item.materialCode, label: item.name});
    _onSelectTab(0);
  };
  const _onPressSelect = () => {
    dispatch(
      getMaterialsAction({
        page: 1,
        pageSize: 50,
        customerCode: orderDetail?.customerCode,
        saleOrg: orderDetail?.saleOrg,
        shipmentOrderCode: shipmentOrderCode,
        type: type,
        textSearch: encodeURI(textSearch),
      }),
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setActiveScroll(true);
    }, 200);
  }, [selectedTab]);
  useEffect(() => {
    if (data) {
      let newData = data;
      if (dataMaterialDeliver) {
        newData = data?.map(elem => {
          return {
            ...elem,
          };
        });
      }
      setListMaterials(newData);
    }
  }, [data, dataMaterialDeliver, listMaterialCollectRecomment]);
  useEffect(() => {
    if (status !== Status.loading) {
      let currentData: MaterialModel[] = [];
      let newData: SelectItemProps[] = [];
      switch (type) {
        case MaterialsType.material: {
          currentData = listMaterials;
          break;
        }
        case MaterialsType.materialCollect: {
          currentData = listMaterialCollect;
          break;
        }
        case MaterialsType.materialOffset: {
          currentData = listMaterialOffset;
          break;
        }
        case MaterialsType.materialDiliver: {
          currentData = listMaterialDiliver;
          break;
        }
      }
      if (currentData.length > 0) {
        newData = currentData.map(elem => {
          return {
            id: elem.materialCode,
            label: elem.materialCode + ' - ' + elem.name,
            data: {
              unit: elem.unit,
              totalbets: elem.totalbets,
              quantity: elem.quantity,
            },
          };
        });
      }
      setSelect(newData);
    }
  }, [
    listMaterialOffset,
    listMaterialDiliver,
    listMaterialCollect,
    type,
    status,
    listMaterials,
  ]);
  useEffect(() => {
    _onPressSelect();
  }, [textSearch]);
  const _handleScrollChildren = (nativeEvent: NativeScrollEvent) => {
    if (activeScroll) {
      let width = nativeEvent?.contentOffset?.x;
      if (width > 0) {
        let index = Math.round(width / WIDTH_SCREEN);
        setSelectedTab(index);
        if (index === 1) {
          _clearState();
        }
      }
    }
  };
  const _onSelectTab = (index: number) => {
    setActiveScroll(false);
    childrenRef?.current?.scrollTo?.({
      x: WIDTH_SCREEN * index,
      animated: true,
    });
    setSelectedTab(index);
    setTimeout(() => {
      setActiveScroll(true);
    }, 300);
    if (index === 1) {
      _clearState();
    }
  };
  const _onSelect = (value: SelectItemProps) => {
    let {unit, quantity, totalbets} = value.data;
    if (unit) {
      setUnit(unit);
    }
    if (!stringIsEmpty(value.label) && !stringIsEmpty(errData)) {
      setErrData('');
    }
    setNewName(value.label);
    setMaterialCode(`${value.id}`);
    setQuantiRecomment(
      _findRecommendQuanty(
        `${value.id}`,
        quantity,
        totalbets,
        dataMaterialDeliver,
      ),
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        ref={childrenRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        scrollEventThrottle={16}
        horizontal
        onLayout={() => {
          let index = selectedTab;
          if (index !== 0) {
            childrenRef?.current?.scrollTo?.({
              x: WIDTH_SCREEN * index,
              animated: true,
            });
            _clearState();
          }
        }}
        onScroll={({nativeEvent}) => {
          _handleScrollChildren(nativeEvent);
        }}>
        {!readOnly && (
          <View style={styles.add_material_from}>
            <View style={styles.add_material_view}>
              {selectedTab === 0 && (
                <>
                  <SelectForm
                    caption={
                      type === MaterialsType.materialOffset
                        ? STRING.material.metarialOffsetName
                        : STRING.material.packagingName
                    }
                    items={dataSelect}
                    editable={true}
                    onPress={() => {
                      _onPressSelect();
                    }}
                    defaultValue={defaultValue}
                    error={errData}
                    onChangeValue={value => {
                      if (value[0]) {
                        _onSelect(value[0]);
                      }
                    }}
                    searchBox
                    onChangeTextSearchBox={text => {
                      setTextSearch(text);
                    }}
                  />
                  <TextFieldForm
                    caption={STRING.material.packagingCollectQuanti}
                    value={`${newQuanti}`}
                    keyboardType={'numeric'}
                    onChangeText={text => {
                      if (!stringIsEmpty(text) && !stringIsEmpty(errQuanti)) {
                        setErrQuanti('');
                      }
                      if (
                        unit !== 'KG' &&
                        unit !== 'kg' &&
                        (text.includes('.') || isNaN(parseInt(text)))
                      ) {
                        setErrQuanti(STRING.valid.invalidQuanti);
                      }
                      setNewQuanti(text);
                    }}
                    error={errQuanti}
                  />
                  {quantiRecomment !== 0 && (
                    <Text style={styles.recomment}>
                      {STRING.material.quantiRecomment}: {quantiRecomment}
                    </Text>
                  )}
                  {type === MaterialsType.materialOffset && (
                    <TextFieldForm
                      caption={STRING.product.unit}
                      disabled
                      value={unit}
                    />
                  )}
                </>
              )}
            </View>
            <BottomView
              buttons={[
                {
                  label: STRING.btn.save,
                  icon: IMAGE.ic_success_white,
                  onPress: () => {
                    _addMaterial();
                  },
                },
              ]}
            />
          </View>
        )}
        <View style={styles.add_material_from}>
          <FlatList
            data={listMaterials}
            style={styles.add_material_view}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'handled'}
            renderItem={({item, index}) => {
              return (
                <Material
                  key={index}
                  materialCode={item.materialCode}
                  name={item.name}
                  readOnly={readOnly}
                  onDelete={() => {
                    _deleteMaterial(index);
                  }}
                  onEdit={() => {
                    _onPressEditMaterial(item, index);
                  }}
                  quantity={item.quantity}
                  index={index}
                />
              );
            }}
          />
          {!readOnly && (
            <BottomView
              buttons={[
                {
                  label:
                    type === MaterialsType.materialDiliver
                      ? STRING.material.addBBLCDelivery
                      : type === MaterialsType.materialCollect
                      ? STRING.material.addBBLCCollect
                      : STRING.material.addMetarialOffset,
                  type: 'light',
                  icon: IMAGE.ic_add,
                  onPress: () => {
                    setIsEdit(false);
                    setIndexEdit(-1);
                    _onSelectTab(0);
                  },
                },
                {
                  label: STRING.btn.comfirm,
                  icon: IMAGE.ic_success_white,
                  onPress: () => {
                    onConfirm && onConfirm(listMaterials);
                  },
                },
              ]}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const _findRecommendQuanty = (
  materialCode: string,
  quantity: undefined | number,
  totalbets: undefined | number,
  dataMaterialDeliver: MaterialModel[] | undefined,
) => {
  let result = 0;
  if (dataMaterialDeliver) {
    let totalDeliver = sum(dataMaterialDeliver, materialCode);
    if (quantity !== undefined && totalbets !== undefined) {
      if (totalbets < 0 || quantity < 0) {
        result = 0;
      } else if (totalbets - totalDeliver - quantity < 0) {
        result = -1 * (totalbets - totalDeliver - quantity);
      }
    }
  }
  return result;
};
ListMaterials.defaultProps = {
  label: 'button',
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  add_material_from: {
    width: WIDTH_SCREEN,
    flex: 1,
  },
  add_material_view: {
    flex: 1,
    paddingHorizontal: SIZE[16],
  },
  recomment: {
    ...textStyles.normal,
    marginTop: SIZE[8],
  },
});
