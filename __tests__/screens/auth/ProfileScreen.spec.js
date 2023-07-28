import renderer from "react-test-renderer";
import ProfileScreen from "../../../src/screens/ProfileScreen";



describe("ProfileScreen", () => {
  it("ProfileScreen should render correctly", () => {
    const tree = renderer.create(<ProfileScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});