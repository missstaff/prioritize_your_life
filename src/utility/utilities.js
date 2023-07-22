import Toast from "react-native-toast-message";
import { getFireApp } from "../../getFireApp";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constants";
import { ERROR_MESSAGES } from "./errorMessages";


const firebase = getFireApp();


export const displayToast = (id, type) => {
    const errorType = ERROR_MESSAGES[id];
    return Toast.show({
        text1: errorType.errorText1,
        text2: errorType.errorText2,
        type: type,
    });
};

export const logOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.log(`Error: ${error.message}\n${error.stack}`);
        displayToast("logout_failure", "error");
        return;
    }
};

export const validateTextInput = (textInput) => {

    let isValid = false;

    switch (textInput.id) {
        case "invalid_email":
            isValid = EMAIL_REGEX.test(textInput.condition);
            break;
        case "invalid_password":
            isValid = PASSWORD_REGEX.test(textInput.condition);
            break;
        case "invalid_username":
            isValid = textInput.condition;
            break;
        case "password_required":
            isValid = PASSWORD_REGEX.test(textInput.condition);
            break;
        case "passwords_do_not_match":
            isValid = textInput.condition;
            break;
    };

    if (!isValid) {
        displayToast(textInput.id, textInput.type);
    }

    textInput?.callback && textInput?.callback(isValid);
    return isValid;
};
