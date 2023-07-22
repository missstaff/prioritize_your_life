import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/ui/AppTextInput";
import { getFireApp } from "../../../getFireApp";
import { displayToast, validateTextInput } from "../../utility/utilities";
import { APP_COLORS } from "../../utility/constants";
import { styles } from "./Styles";


const SignInScreen = () => {

    const firebase = getFireApp();
    const navigation = useNavigation();

    const [state, setState] = useState({
        email: "",
        password: "",
    });


    const onPressLogin = async () => {
        let user;

        const isValidEmail = validateTextInput({
            condition: state.email,
            id: "invalid_email",
            type: "error"
        });

        const isValidPassword = validateTextInput({
            condition: state.password,
            id: "password_required",
            type: "error"
        });

        
        if (!isValidEmail || !isValidPassword) {
            return;
        }


        try {
            user = await firebase.auth().signInWithEmailAndPassword(state.email, state.password);;
        } catch (error) {
            console.log(`Error: ${error.message}\n${error.stack}`);
            displayToast("login_failure", "error");
            return;
        }

        try {
            firebase.firestore().collection("users").doc(user.user.uid).update({
                last_login: new Date(),
            });
        } catch (error) {
            console.log(`Error: ${error.message}\n${error.stack}`);
        }

    };


    const onPressForgotPassword = () => {
        navigation.navigate("PasswordResetScreen");
    };

    const onPressSignUp = () => {
        navigation.navigate("SignUp");
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor={APP_COLORS.triodenary}
                    onChangeText={(text) => setState({ ...state, email: text })} />
            </View>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor={APP_COLORS.triodenary}
                    onChangeText={(text) => setState({ ...state, password: text })} />
            </View>

            <TouchableOpacity
                accessibilityRole="link"
                onPress={onPressForgotPassword}>
                <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity
                accessibilityRole="button"
                onPress={onPressLogin}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity
                accessibilityRole="link"
                onPress={onPressSignUp}>
                <Text style={styles.forgotAndSignUpText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;