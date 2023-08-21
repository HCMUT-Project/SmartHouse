import React, {useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SIZE } from '../../constants/Size';
import { WIDTH_SCREEN } from '../../constants/Function';
import {COLOR, FONT} from '../../constants';

export interface TabBarProps {
  items: TabBarItemProps[];
  type: 'line' | 'tag';
  isAvailableScroll?: boolean;
  isAvailableChildrenScroll?: boolean;
  onPressTab?: (index: number, isCurrent: boolean) => void;
}

export interface TabBarItemProps {
  id: number;
  label: string;
  children: React.ReactNode;
  isSelected: boolean;
}

export const TabBar = ({
  items,
  type = 'line',
  isAvailableScroll = false,
  isAvailableChildrenScroll = true,
  onPressTab,
}: TabBarProps) => {
  const headerRef = useRef<any>();
  const childrenRef = useRef<any>();
  const [activeScroll, setActiveScroll] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<number>(
    items.findIndex(_ => _?.isSelected) !== -1
      ? items.findIndex(_ => _?.isSelected)
      : 0,
  );

  useEffect(() => {
    let offset = 0;
    headerRef?.current?.scrollTo?.({
      x: offset - WIDTH_SCREEN * 0.3,
      animated: true,
    });
    setTimeout(() => {
      setActiveScroll(true);
    }, 200);
  }, [selectedTab]);

  const _onSelectTab = (index: number) => {
    setActiveScroll(false);
    onPressTab && onPressTab(index, index === selectedTab);
    childrenRef?.current?.scrollTo?.({
      x: WIDTH_SCREEN * index,
      animated: true,
    });
    setSelectedTab(index);
    setTimeout(() => {
      setActiveScroll(true);
    }, 300);
  };

  const _handleScrollChildren = (nativeEvent: NativeScrollEvent) => {
    if (activeScroll) {
      let width = nativeEvent?.contentOffset?.x;
      if (width > 0) {
        let index = Math.round(width / WIDTH_SCREEN);
        setSelectedTab(index);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <ScrollView
          ref={headerRef}
          style={styles.header}
          showsHorizontalScrollIndicator={false}
          horizontal>
          {items.map((_, index) => {
            let isSelected = index === selectedTab;
            switch (type) {
              case 'line':
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => _onSelectTab(index)}
                    style={[
                      styles.headerItem,
                      !isAvailableScroll && {
                        width: (WIDTH_SCREEN - 32) / items.length,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.headerTitle,
                        isSelected && styles.selectedHeaderTitle,
                        isAvailableScroll && {
                          paddingHorizontal: SIZE[30],
                        },
                      ]}>
                      {_?.label}
                    </Text>
                    {isSelected ? (
                      <View style={styles.selectedHeaderItem} />
                    ) : null}
                  </TouchableOpacity>
                );
              case 'tag':
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => _onSelectTab(index)}
                    style={[
                      styles.headerItemTag,
                      isSelected && styles.headerItemTagSelected,
                      !isAvailableScroll && {
                        width:
                          (WIDTH_SCREEN - SIZE[8] * items.length) /
                          items.length,
                      },
                      index === 0 && {marginLeft: SIZE[12]},
                    ]}>
                    <Text
                      style={[
                        styles.headerTitleTag,
                        isSelected && {
                          color: COLOR.white,
                        },
                        isAvailableScroll && {
                          paddingHorizontal: SIZE[16],
                        },
                      ]}>
                      {_?.label}
                    </Text>
                  </TouchableOpacity>
                );
              default:
                return null;
            }
          })}
        </ScrollView>
      </View>
      <ScrollView
        ref={childrenRef}
        pagingEnabled
        scrollEventThrottle={16}
        onLayout={() => {
          let index = selectedTab;
          if (index !== 0) {
            childrenRef?.current?.scrollTo?.({
              x: WIDTH_SCREEN * index,
              animated: true,
            });
          }
        }}
        scrollEnabled={isAvailableChildrenScroll}
        onScroll={({nativeEvent}) => {
          _handleScrollChildren(nativeEvent);
        }}
        style={[styles.childrenContainer]}
        showsHorizontalScrollIndicator={false}
        horizontal>
        {items.map((_, index) => {
          return (
            <View style={styles.childrenItem} key={index}>
              {_?.children}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: COLOR.white,
  },
  headerItem: {
    flex: 1,
    alignItems: 'center',
  },
  headerItemTag: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR._F5F5F5,
    borderRadius: SIZE[18],
    marginHorizontal: SIZE[4],
  },
  headerItemTagSelected: {
    backgroundColor: 'blue',
  },
  selectedHeaderItem: {
    backgroundColor: COLOR.light_red,
    width: '100%',
    height: 2,
  },
  headerTitle: {
    fontSize: SIZE[14],
    lineHeight: SIZE[20],
    paddingVertical: SIZE[10],
    color: COLOR._7A7A7A,
    fontFamily: FONT.regular_400,
  },
  headerTitleTag: {
    fontSize: SIZE[14],
    lineHeight: SIZE[18],
    paddingVertical: SIZE[10],
    color: COLOR._7A7A7A,
    fontFamily: FONT.bold_700,
  },
  selectedHeaderTitle: {
    fontFamily: FONT.bold_700,
    color: COLOR.light_red,
  },
  childrenContainer: {
    width: '100%',
    height: '100%',
  },
  childrenItem: {
    width: WIDTH_SCREEN - 32,
    flex: 1,
  },
});
