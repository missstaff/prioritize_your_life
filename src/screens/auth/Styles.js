import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { APP_COLORS } from "../../utility/constants";

export const styles = ScaledSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: APP_COLORS.primary,
        flex: 1,
        justifyContent: "center",
    },
    title: {
        color: APP_COLORS.secondary,
        fontSize: scale(50),
        fontWeight: "bold",
        marginBottom: verticalScale(40),
    },
    inputView: {
        backgroundColor: APP_COLORS.quaternary,
        borderRadius: moderateScale(25),
        height: scale(50),
        justifyContent: "center",
        marginBottom: verticalScale(20),
        padding: scale(20),
        width: "80%",
    },
    inputText: {
        color: APP_COLORS.white,
        height: scale(50),
    },
    forgotAndSignUpText: {
        color: APP_COLORS.white,
        fontSize: scale(11),
    },
    loginBtn: {
        alignItems: "center",
        backgroundColor: APP_COLORS.secondary,
        borderRadius: moderateScale(25),
        height: scale(50),
        justifyContent: "center",
        marginBottom: verticalScale(10),
        marginTop: verticalScale(40),
        width: "80%",
    },
});