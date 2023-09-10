import "react-native-gesture-handler/jestSetup";

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react-native/Libraries/EventEmitter/NativeEventEmitter");
jest.mock("@react-native-firebase/app", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/auth", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/firestore", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/storage", () => require("@react-native-firebase.js").default);
jest.mock("@react-native-firebase/functions", () => require("@react-native-firebase.js").default);

jest.mock("./getFireApp", () => ({
  getFireApp: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: {
    signInWithEmailAndPassword: jest.fn(),
  },
}));

jest.mock("@react-navigation/native", () => {
  const originalNavigationModule = jest.requireActual("@react-navigation/native");
  return {
    ...originalNavigationModule,
    useNavigation: jest.fn().mockReturnValue({ navigate: jest.fn() }),
    useTheme: jest.fn().mockReturnValue({ colors: { text: "rgb(28, 28, 30)" } }),
  };
});

jest.mock("react-native-reanimated", () => {
  const Reanimated = require("react-native-reanimated/mock");
  Reanimated.default.call = () => { };
  return Reanimated;
});
