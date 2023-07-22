import { Text, View, useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getFireApp } from "../../getFireApp";


const HomeScreen = () => {
    
    const firebase = getFireApp();
    const scheme = useColorScheme();
    let { colors } = useTheme();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: colors.text }}>Home Screen</Text>

        </View>
    );
};

export default HomeScreen;