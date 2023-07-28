import renderer from "react-test-renderer";
import App from "../App";


describe("App", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it("App should render correctly", () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  });
});