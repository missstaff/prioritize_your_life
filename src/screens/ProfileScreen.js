import { Text, View, useColorScheme } from "react-native";
import { useTheme } from "@react-navigation/native";
import { getFireApp } from "../../getFireApp";


const ProfileScreen = () => {
   
    const firebase = getFireApp();
    const scheme = useColorScheme();
    let { colors } = useTheme();
    
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Profile Screen</Text>
        </View>
    );
};

export default ProfileScreen;