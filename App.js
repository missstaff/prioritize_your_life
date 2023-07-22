import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MasterFlow from "./src/components/navigation/MasterFlow";
import { useColorScheme } from "react-native";


const App = () => {
  const scheme = useColorScheme();
  const statusBarStyle = scheme === "dark" ? "light" : "dark";
  return (
    <SafeAreaProvider>
      <MasterFlow />
      <StatusBar style={statusBarStyle} />
    </SafeAreaProvider>
  );
};

export default App;
