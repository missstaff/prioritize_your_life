import renderer from "react-test-renderer";
import ProfileScreen from "../../src/screens/ProfileScreen";


describe("ProfileScreen", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("ProfileScreen should render correctly", () => {
    const tree = renderer.create(<ProfileScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});