import { TextStyle, ViewStyle } from 'react-native';
import colors from './colors';
import sizes from './sizes';

class wStyles {

    public button: ViewStyle = {
        marginBottom: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderTopWidth: 1,
        borderColor: colors.light1,
        backgroundColor: colors.primary,
    };

    public buttonText: TextStyle = {
        color: colors.white,
        fontSize: sizes.default,
    };
}

export default new wStyles();
