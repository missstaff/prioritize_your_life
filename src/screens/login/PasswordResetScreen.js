import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../components/ui/AppTextInput";
import { getFireApp } from "../../../getFireApp";
import { displayErrorToast, validateTextInput } from "../../utility/utilities";
import { APP_COLORS } from "../../utility/constants";
import { styles } from "./Styles";


const PasswordResetScreen = () => {

    const firebase = getFireApp();
    const navigation = useNavigation();

    const [state, setState] = useState({
        email: "",
    });


    const onPressSignUp = () => {
        navigation.navigate("SignUp");
    };

    const onPressSubmit = async () => {
        try {

            const isValid = validateTextInput({
                condition: state.email,
                errorText1: "A valid email is required.",
                errorText2: "Please try again.",
                type: 2
            });

            if (!isValid) {
                return;
            } else {
                await firebase.auth().sendPasswordResetEmail(state.email);
                setState({ ...state, email: "" });
                navigation.navigate("SignIn");
            }

        } catch (error) {
            console.log(`Error: ${error.message}\n${error.stack}`);
            displayErrorToast("Failed to send password reset email.", "Please check your email address.");
            return;
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reset password</Text>
            <View style={styles.inputView}>
                <AppTextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor={APP_COLORS.triodenary}
                    onChangeText={(text) => setState({ ...state, email: text })}
                    onBlur={() =>
                        validateTextInput(
                            {
                                callback: null,
                                condition: state.email,
                                errorText1: "A valid email is required.",
                                errorText2: "Please try again.",
                                type: 2,
                            }
                        )
                    }
                />
            </View>

            <TouchableOpacity
                onPress={onPressSubmit}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>SUBMIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPressSignUp}>
                <Text style={styles.forgotAndSignUpText}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PasswordResetScreen;