jest.mock("@react-navigation/native");
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("@react-native-firebase/app", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/auth", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/firestore", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/storage", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/functions", () => require("@react-native-firebase.js").default);

jest.mock("./getFireApp", () => ({
  getFireApp: jest.fn(),
}));

jest.mock("@react-navigation/native", () => ({
  ...jest.requireActual("@react-navigation/native"),
  useTheme: jest.fn(),
}));
useTheme.mockReturnValue({ colors: { text: "rgb(28, 28, 30)", } });