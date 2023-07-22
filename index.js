import { registerRootComponent } from "expo";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import App from "./App";


const gestureHandlerWrappedApp = gestureHandlerRootHOC(App);
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(gestureHandlerWrappedApp);
