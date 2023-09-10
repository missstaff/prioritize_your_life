import renderer from "react-test-renderer";
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useNavigation } from "@react-navigation/native";
import PasswordResetScreen from "../../../src/screens/auth/PasswordResetScreen";


describe("PasswordResetScreen", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<PasswordResetScreen />);

        //Test rendering of components
        expect(getByText('SUBMIT')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
    });

    it('navigates to signin screen', () => {
        const { getByText } = render(<PasswordResetScreen />);
        const signinLink = getByText('Sign In');
        fireEvent.press(signinLink);

        expect(useNavigation().navigate).toHaveBeenCalledWith("SignIn", {"displayToast": false});
    });

    it("PasswordResetScreen should render correctly", () => {
        const tree = renderer.create(<PasswordResetScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});