import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/ui/AppTextInput";
import { getFireApp } from "../../../getFireApp";
import { displayErrorToast, validateTextInput } from "../../utility/utilities";
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
            displayErrorToast("Failed to create account.", "Please try again.");
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
                                errorText1: "Username must be at least 2 letters.",
                                errorText2: "Please try again.",
                                type: 1,
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
                                errorText1: "A valid email is required.",
                                errorText2: "Please try again.",
                                type: 2,
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
                                errorText1: "Password must be 7 to 25 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
                                errorText2: "Please try again.",
                                type: 3,
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
                                errorText1: "Passwords must match.",
                                errorText2: "Please try again.",
                                type: 4,
                            }
                        )
                    }
                />
            </View>
            <TouchableOpacity
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={submitIsDisabled}
                onPress={onPressSubmit}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Submit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SignUpScreen;