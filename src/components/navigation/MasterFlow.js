import React, { useEffect, useState } from "react";
import { Text, useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import PasswordResetScreen from "../../screens/login/PasswordResetScreen";
import ShowIf from "../ShowIf";
import SignInScreen from "../../screens/login/SignInScreen";
import SignUpScreen from "../../screens/login/SignUpScreen";
import { getFireApp } from "../../../getFireApp";
import { displayToast, logOut } from "../../utility/utilities";
import { APP_COLORS } from "../../utility/constants";


const MasterFlow = () => {

    let { colors } = useTheme();
    const scheme = useColorScheme();
    const firebase = getFireApp();
    const Stack = createNativeStackNavigator();

    const [isSignedIn, setIsSignedIn] = useState(false);
    const textColor = scheme === "dark" ? colors.background : colors.text;


    useEffect(() => {
        let unsubscribe;
        try {
            unsubscribe = firebase.auth().onAuthStateChanged((user) => {
                setIsSignedIn(!!user);
            });
        } catch (error) {
            (console.log(`Error: ${error.message}\n${error.stack}`));
            displayToast("login_failure", "error");
            return;
        }

        return () => unsubscribe();
    }, []);


    return (
        <>
            <NavigationContainer
                independent={true}
                theme={scheme === "dark" ? DarkTheme : DefaultTheme}>
                <ShowIf
                    condition={isSignedIn}
                    render={() => {
                        return (
                            <Stack.Navigator>
                                <Stack.Screen
                                    component={HomeScreen}
                                    name="Home"
                                    options={{
                                        headerShown: true,
                                        headerBackTitle: "",
                                        headerTintColor: APP_COLORS.primary,
                                        headerShadowVisible: false,
                                        headerTitle: "Dashboard",
                                        headerRight: () => <Text onPress={logOut} style={{ color: textColor }}>Logout</Text>,
                                    }} />
                                <Stack.Screen
                                    component={ProfileScreen}
                                    name="Profile"
                                />
                            </Stack.Navigator>
                        );
                    }}
                    renderElse={() => {
                        return (
                            <Stack.Navigator>
                                <Stack.Screen
                                    component={SignInScreen}
                                    name="SignIn"
                                    options={{
                                        // When logging out, a pop animation feels intuitive
                                        // You can remove this if you want the default 'push' animation
                                        animationTypeForReplace: !isSignedIn ? 'pop' : 'push',
                                        headerShown: false,
                                    }} />
                                <Stack.Screen
                                    component={SignUpScreen}
                                    name="SignUp"
                                    options={{
                                        headerShown: true,
                                        headerBackTitle: "",
                                        headerTintColor: textColor,
                                        headerShadowVisible: false,
                                        headerTitle: "Back",
                                    }} />
                                <Stack.Screen
                                    component={PasswordResetScreen}
                                    name="PasswordResetScreen"
                                    options={{
                                        headerShown: true,
                                        headerBackTitle: "",
                                        headerTintColor: textColor,
                                        headerShadowVisible: false,
                                        headerTitle: "Back",
                                    }} />
                            </Stack.Navigator>
                        );
                    }}
                />
            </NavigationContainer>
            <Toast />
        </>
    );
};

export default MasterFlow;