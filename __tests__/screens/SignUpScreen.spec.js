import renderer from "react-test-renderer";
import SignUpScreen from "../../src/screens/auth/SignUpScreen";


describe("SignUpScreen", () => {
  it("SignUpScreen should render correctly", () => {
    const tree = renderer.create(<SignUpScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});