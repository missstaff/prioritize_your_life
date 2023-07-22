import Toast from "react-native-toast-message";
import { getFireApp } from "../../getFireApp";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constants";


const firebase = getFireApp();


export const displayErrorToast = (errorText1, errorText2) => {
    return Toast.show({
        text1: errorText1,
        text2: errorText2,
        type: "error",
    });
};

export const logOut = async () => {
    try {
        await firebase.auth().signOut();
    } catch (error) {
        console.log(`Error: ${error.message}\n${error.stack}`);
        displayToast("Failed to log out.", "Please try again.");
        return;
    }
};

export const validateTextInput = (textInput) => {

    let isValid = false;

    switch (textInput.type) {
        case 1:
            isValid = textInput.condition;
            break;
        case 2:
            isValid = EMAIL_REGEX.test(textInput.condition);
            break;
        case 3:
            isValid = PASSWORD_REGEX.test(textInput.condition);
            break;
        case 4:
            isValid = textInput.condition;
            break;
    };

    if (!isValid) {
        displayErrorToast(textInput.errorText1, textInput.errorText2);
    }

    textInput?.callback && textInput?.callback(isValid);
    return isValid;
};
