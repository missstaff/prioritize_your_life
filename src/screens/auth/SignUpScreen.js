import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/ui/AppTextInput";
import { createAccount, validateTextInput } from "../../utility/auth-utilities";
import { APP_COLORS } from "../../utility/constants";
import { styles } from "./Styles";



const SignUpScreen = () => {

    const navigation = useNavigation();

    const [confirmPasswordIsValid, setConfirmPasswordIsValid] = useState(false);
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [passwordIsValid, setPasswordIsValid] = useState(false);
    const [submitIsDisabled, setSubmitIsDisabled] = useState(true);
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
        await createAccount(state);
    };

    useEffect(() => {
        if (confirmPasswordIsValid && emailIsValid && passwordIsValid && userNameIsValid) {
            setSubmitIsDisabled(false);
        } else {
            setSubmitIsDisabled(true);
        }
    }, [confirmPasswordIsValid, emailIsValid, passwordIsValid, userNameIsValid,]);


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
                                type: "error",
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
                                type: "error",
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
                                type: "error",
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
                                type: "error",
                            }
                        )
                    }
                />
            </View>
            <TouchableOpacity
                accessibilityRole="link"
                accessibilityLabel="Forgot password link"
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>
                    Forgot Password?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Submit button"
                disabled={submitIsDisabled}
                onPress={onPressSubmit}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>
                    Submit
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignUpScreen;