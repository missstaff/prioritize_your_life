import renderer from "react-test-renderer";
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useNavigation } from "@react-navigation/native";
import SignUpScreen from "../../../src/screens/auth/SignUpScreen";


describe("SignUpScreen", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<SignUpScreen />);
    
    // Test rendering of components
    expect(getByText('Submit')).toBeTruthy();
    expect(getByPlaceholderText('Username')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByPlaceholderText('Confirm Password')).toBeTruthy();
    
  });

  it("SignUpScreen should render correctly", () => {
    const tree = renderer.create(<SignUpScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});