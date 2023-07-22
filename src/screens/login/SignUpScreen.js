import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/ui/AppTextInput";
import { getFireApp } from "../../../getFireApp";
import { displayToast, validateTextInput } from "../../utility/utilities";
import { APP_COLORS } from "../../utility/constants";
import { styles } from "./Styles";



const SignUpScreen = () => {

    const firebase = getFireApp();
    const navigation = useNavigation();

    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
    const [userNameIsValid, setUserNameIsValid] = useState(false);
    const [state, setState] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
    });


    const onPressForgotPassword = () => {
        navigation.navigate("PasswordResetScreen");
    };

    const onPressSubmit = async () => {
        try {
            await firebase.auth().createUserWithEmailAndPassword(state.email, state.password);
        } catch (error) {
            console.log(`Error: ${error.message}\n${error.stack}`);
            displayToast("create_account_failure", "error");
        }
    };

    useEffect(() => {
        if (userNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid) {
            setSubmitIsDisabled(false);
        } else {
            setSubmitIsDisabled(true);
        }
    }, [userNameIsValid, emailIsValid, passwordIsValid, confirmPasswordIsValid]);


    return (
        <ScrollView
            contentContainerStyle={{
                alignItems: "center",
                backgroundColor: APP_COLORS.primary,
                flexGrow: 1,
                justifyContent: "center",
            }}>
            <Text style={styles.title}>SignUp</Text>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    placeholder="Username"
                    onChangeText={(text) => setState({ ...state, username: text.trim() })}
                    onBlur={() =>
                        validateTextInput(
                            {
                                callback: setUserNameIsValid,
                                condition: state.username.length > 1,
                                id: "invalid_username",
                                type: "error"
                            }
                        )
                    }
                />
            </View>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    placeholder="Email"
                    onChangeText={(text) => setState({ ...state, email: text.trim() })}
                    onBlur={() =>
                        validateTextInput(
                            {
                                callback: setEmailIsValid,
                                condition: state.email,
                                id: "invalid_email",
                                type: "error"
                            }
                        )
                    }
                />
            </View>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    placeholder="Password"
                    onChangeText={(text) => setState({ ...state, password: text.trim() })}
                    onBlur={() =>
                        validateTextInput(
                            {
                                callback: setPasswordIsValid,
                                condition: state.password,
                                id: "invalid_password",
                                type: "error"
                            }
                        )
                    }
                />
            </View>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    placeholder="Confirm Password"
                    onChangeText={(text) => setState({ ...state, confirmPassword: text.trim() })}
                    onBlur={() =>
                        validateTextInput(
                            {
                                callback: setConfirmPasswordIsValid,
                                condition: state.confirmPassword === state.password,
                                id: "passwords_do_not_match",
                                type: "error"
                            }
                        )
                    }
                />
            </View>
            <TouchableOpacity
                accessibilityRole="link"
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                accessibilityRole="button"
                disabled={submitIsDisabled}
                onPress={onPressSubmit}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignUpScreen;