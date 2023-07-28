import renderer from "react-test-renderer";
import HomeScreen from "../../src/screens/HomeScreen";


describe("HomeScreen", () => {
  it("HomeScreen should render correctly", () => {
    const tree = renderer.create(<HomeScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});