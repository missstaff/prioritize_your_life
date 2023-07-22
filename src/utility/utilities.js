import Toast from "react-native-toast-message";
import { ERROR_MESSAGES } from "./errorMessages";


export const displayToast = (id, type) => {
    const errorType = ERROR_MESSAGES[id];
    return Toast.show({
        text1: errorType.errorText1,
        text2: errorType.errorText2,
        type: type,
    });
};