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

    public textInput: TextStyle = {
        paddingVertical: 5,
        paddingHorizontal: 20,
        height: 50,
        color: colors.primary,
    };

    public divider: ViewStyle = {
        height: 2,
        backgroundColor: colors.light1,
    };
}

export default new wStyles();
