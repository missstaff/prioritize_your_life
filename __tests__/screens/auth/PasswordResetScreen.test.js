import renderer from "react-test-renderer";
import PasswordResetScreen from "../../../src/screens/auth/PasswordResetScreen";


describe("PasswordResetScreen", () => {

    afterAll(() => {
        jest.clearAllMocks();
    });

    it("PasswordResetScreen should render correctly", () => {
        const tree = renderer.create(<PasswordResetScreen />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});