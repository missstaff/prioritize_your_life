import renderer from "react-test-renderer";
import SignInScreen from "../../../src/screens/auth/SignInScreen";


describe("SignInScreen", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("SignInScreen should render correctly", () => {
        const tree = renderer.create(<SignInScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});