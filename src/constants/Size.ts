import { Dimensions } from 'react-native';
export const WIDTH_WINDOW = Dimensions.get('window').width;
export const HEIGHT_WINDOW = Dimensions.get('window').height;
export const WIDTH_SCREEN = Dimensions.get('screen').width;
export const HEIGHT_SCREEN = Dimensions.get('screen').height;
export var SCREEN_TYPE;
(function (SCREEN_TYPE) {
    SCREEN_TYPE[SCREEN_TYPE["SMALL_PHONE"] = 320] = "SMALL_PHONE";
    SCREEN_TYPE[SCREEN_TYPE["MEDIUM_PHONE"] = 479] = "MEDIUM_PHONE";
    SCREEN_TYPE[SCREEN_TYPE["MEDIUM_TABLET"] = 767] = "MEDIUM_TABLET";
    SCREEN_TYPE[SCREEN_TYPE["LARGE_TABLET"] = 991] = "LARGE_TABLET";
})(SCREEN_TYPE || (SCREEN_TYPE = {}));
export const scaleSize = (size) => {
    if (WIDTH_WINDOW <= SCREEN_TYPE.SMALL_PHONE) {
        return size * 0.9;
    }
    if (WIDTH_WINDOW <= SCREEN_TYPE.MEDIUM_PHONE) {
        return size;
    }
    if (WIDTH_WINDOW <= SCREEN_TYPE.MEDIUM_TABLET) {
        return size * 1.1;
    }
    if (WIDTH_WINDOW <= SCREEN_TYPE.LARGE_TABLET) {
        return size * 1.2;
    }
    return size * 1.2;
};
export const SIZE = {
    2: scaleSize(2),
    4: scaleSize(4),
    6: scaleSize(6),
    8: scaleSize(8),
    10: scaleSize(10),
    12: scaleSize(12),
    14: scaleSize(14),
    16: scaleSize(16),
    18: scaleSize(18),
    20: scaleSize(20),
    22: scaleSize(22),
    24: scaleSize(24),
    26: scaleSize(26),
    28: scaleSize(28),
    30: scaleSize(30),
    32: scaleSize(32),
    34: scaleSize(34),
    36: scaleSize(36),
    38: scaleSize(38),
    40: scaleSize(40),
    42: scaleSize(42),
    44: scaleSize(44),
    46: scaleSize(46),
    48: scaleSize(48),
    50: scaleSize(50),
};
export const BASE_SIZE = {
    label: SIZE[16],
    labelLineHeight: SIZE[24],
    subLabel: SIZE[12],
    subLabelLineHeight: SIZE[20],
    icon: SIZE[24],
    paddingVertical: SIZE[8],
    paddingHorizontal: SIZE[8],
};
export var ICON_SIZE;
(function (ICON_SIZE) {
    ICON_SIZE[ICON_SIZE["SMALL"] = SIZE[16]] = "SMALL";
    ICON_SIZE[ICON_SIZE["MEDIUM"] = SIZE[24]] = "MEDIUM";
    ICON_SIZE[ICON_SIZE["LARGE"] = SIZE[32]] = "LARGE";
})(ICON_SIZE || (ICON_SIZE = {}));
