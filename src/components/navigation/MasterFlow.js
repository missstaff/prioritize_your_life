import React, { useEffect, useState } from "react";
import { Text, View, useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer, useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import HomeScreen from "../../screens/HomeScreen";
import LoadingSpinner from "../ui/LoadingSpinner";
import ProfileScreen from "../../screens/ProfileScreen";
import PasswordResetScreen from "../../screens/auth/PasswordResetScreen";
import ShowIf from "../ShowIf";
import SignInScreen from "../../screens/auth/SignInScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import { getFireApp } from "../../../getFireApp";
import { logout } from "../../utility/auth-utilities";
import { displayToast } from "../../utility/utilities";
import { APP_COLORS } from "../../utility/constants";
const firebase = getFireApp();


const MasterFlow = () => {

    let { colors } = useTheme();
    const scheme = useColorScheme();
    const Stack = createNativeStackNavigator();

    const [isLoading, setIsLoading] = useState(true);
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
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        return () => unsubscribe();
    }, []);


    if (isLoading === true) {
        return (
            <View
                style={{
                    alignItems: "center",
                    backgroundColor: APP_COLORS.primary,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                }}>
                <LoadingSpinner color={APP_COLORS.secondary} size="large" />
            </View>
        );
    };

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
                                        headerBackTitle: "",
                                        headerShadowVisible: false,
                                        headerShown: true,
                                        headerTintColor: APP_COLORS.primary,
                                        headerTitle: "Dashboard",
                                        headerRight: () => <Text onPress={logout} style={{ color: textColor }}>Logout</Text>,
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
                                        headerBackTitle: "",
                                        headerShadowVisible: false,
                                        headerShown: true,
                                        headerTintColor: textColor,
                                        headerTitle: "Back",
                                    }} />
                                <Stack.Screen
                                    component={PasswordResetScreen}
                                    name="PasswordResetScreen"
                                    options={{
                                        headerBackTitle: "",
                                        headerShadowVisible: false,
                                        headerShown: true,
                                        headerTintColor: textColor,
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