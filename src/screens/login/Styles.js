import { ScaledSheet, moderateScale, scale, verticalScale } from "react-native-size-matters";
import { APP_COLORS } from "../../utility/constants";

export const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: scale(50),
        color: APP_COLORS.secondary,
        marginBottom: verticalScale(40),
    },
    inputView: {
        width: "80%",
        backgroundColor: APP_COLORS.quaternary,
        borderRadius: moderateScale(25),
        height: scale(50),
        marginBottom: verticalScale(20),
        justifyContent: "center",
        padding: scale(20),
    },
    inputText: {
        height: scale(50),
        color: APP_COLORS.white
    },
    forgotAndSignUpText: {
        color: APP_COLORS.white,
        fontSize: scale(11),
    },
    loginBtn: {
        width: "80%",
        backgroundColor: APP_COLORS.secondary,
        borderRadius: moderateScale(25),
        height: scale(50),
        alignItems: "center",
        justifyContent: "center",
        marginTop: verticalScale(40),
        marginBottom: verticalScale(10),
    },
});