import { TextInput, View } from "react-native";
import { APP_COLORS } from "../../utility/constants";

 
const AppTextInput = ({ icon, onBlur, onChangeText, placeholder, style }) => {
    return (
        <View>
            {/* TODO: Add icon support */}
            {/* {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />} */}
            <TextInput
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    placeholderTextColor={APP_COLORS.triodenary}
                    style={style}
                />
        </View>
    );
};

export default AppTextInput;

