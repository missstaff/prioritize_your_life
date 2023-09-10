import renderer from "react-test-renderer";
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import * as authModule from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import SignInScreen from "../../../src/screens/auth/SignInScreen";


describe("SignInScreen", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByText, getByPlaceholderText } = render(<SignInScreen />);
        
        // Test rendering of components
        expect(getByText('Login')).toBeTruthy();
        expect(getByPlaceholderText('Email')).toBeTruthy();
        expect(getByPlaceholderText('Password')).toBeTruthy();
      });
    
      it('navigates to password reset screen', () => {
        const { getByText } = render(<SignInScreen />);
        const forgotPasswordLink = getByText('Forgot Password?');
        
        fireEvent.press(forgotPasswordLink);
        
        expect(useNavigation().navigate).toHaveBeenCalledWith('PasswordResetScreen');
      });

      it('navigates to signup screen', () => {
        const { getByText } = render(<SignInScreen />);
        const signupLink = getByText('Signup');
  
        fireEvent.press(signupLink);
        
        expect(useNavigation().navigate).toHaveBeenCalledWith('SignUp');
      });
    
      it('logs in with valid credentials', async() => {
        const { getByText, getByPlaceholderText } = render(<SignInScreen />);
        const loginButton = getByText('LOGIN');
    
        fireEvent.changeText(getByPlaceholderText('Email'), 'shawnastaff@gmail.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'Abc123!');
    
        fireEvent.press(loginButton);
        
        waitFor(() => {
            expect(authModule.signInWithEmailAndPassword)
              .toHaveBeenCalledWith('shawnastaff@gmail.com', 'Abc123!');
          });
      });
    
    
      it('matches snapshot', () => {
        const tree = renderer.create(<SignInScreen />).toJSON();
        expect(tree).toMatchSnapshot();
      });
});