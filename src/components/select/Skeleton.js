import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { SIZE, COLOR } from '../../constants';
import { useEffect } from 'react';
import { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming, } from 'react-native-reanimated';
function useSkeletonAnimation({ speed = 1000, targetOpacityValue = 0.2, }) {
    const shared = useSharedValue(0);
    useEffect(() => {
        shared.value = withRepeat(withTiming(1, { duration: speed }), Infinity, true);
    }, []);
    const animatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(shared.value, [0, 1], [targetOpacityValue, 1]),
    }));
    return animatedStyle;
}


const Skeleton = ({ style = {
    backgroundColor: COLOR.typoDisable,
    height: SIZE[50],
    marginVertical: SIZE[16],
    borderRadius: SIZE[16],
}, numberOfItems = 3, direction = 'row', speed = 1000, targetOpacityValue = 0.2, }) => {
    const animatedStyle = useSkeletonAnimation({ speed, targetOpacityValue });
    return (<View style={{ flexDirection: direction }}>
        {Array.from(Array(numberOfItems), (_a, i) => (<Animated.View key={`s${i}`} style={[style, animatedStyle]} />))}
    </View>);
};
export default Skeleton;
export { useSkeletonAnimation };
