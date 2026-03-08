import { Platform } from 'react-native';

export const isIOS = () => Platform.OS === 'ios';

export const fontFamilies = {
  POPPINS: {
    normal: isIOS() ? 'Poppins-Regular' : 'PoppinsRegular',
    medium: isIOS() ? 'Poppins-Medium' : 'PoppinsMedium',
    semiBold: isIOS() ? 'Poppins-SemiBold' : 'PoppinsSemiBold',
    bold: isIOS() ? 'Poppins-Bold' : 'PoppinsBold',
    extraBold: isIOS() ? 'Poppins-ExtraBold' : 'PoppinsExtraBold',
  },
};
