import renderer from "react-test-renderer";
import App from "../App";


describe("App", () => {
  it("App should render correctly", () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});