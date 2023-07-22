import { getFireApp } from "../../getFireApp";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constants";
import { displayToast } from "./utilities";


export const logout = async () => {
    const firebase = getFireApp();
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
        case "password_required":
            isValid = PASSWORD_REGEX.test(textInput.condition);
            break;
        case "invalid_username":
            isValid = textInput.condition;
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

export const createAccount = async (state) => {

    const { email, password, username } = state;
    const firebase = getFireApp();
    let user = {};
   
    try {
        user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        if (user) {
            await user.user.updateProfile({
                displayName: username,
            });
        }
    } catch (error) {
        console.log(`Error: ${error.message}\n${error.stack}`);
        displayToast("create_account_failure", "error");
        return;
    }

    await createDocument(user, username);
};

export const createDocument = async (user, username) => {
    if (user) {
        const firebase = getFireApp();
        const uid = user.user.uid;
        try {
            firebase.firestore().collection("users").doc(uid).set({
                account_created: new Date(),
                last_login: new Date(),
                username: username,
            });
        } catch (error) {
            console.log(`Error: ${error.message}\n${error.stack}`);
        }
    }
};
