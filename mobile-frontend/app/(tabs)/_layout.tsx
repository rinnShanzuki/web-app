import { Tabs } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import TopBar from "../components/TopBar";
import { View, Image } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        {/* ⭐ TopBar visible on all tabs */}
        <TopBar />

        {/* Tabs */}
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: "#eee",
            tabBarStyle: {
              height: 65,
              paddingBottom: 2,
              borderTopWidth: 0,
              backgroundColor: "transparent",
              position: "absolute",
            },
            tabBarBackground: () => (
              <LinearGradient
                colors={["#D30019", "#3F0008"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{ flex: 1 }}
              />
            ),
          }}
        >
          {/* ⭐ MDRRMO */}
          <Tabs.Screen
            name="MdrrmoScreen"
            options={{
              title: "MDRRMO",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/mdrrmo-filled.png")
                      : require("../../assets/images/mdrrmo-outline.png")
                  }
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />

          {/* ⭐ PNP */}
          <Tabs.Screen
            name="PnpScreen"
            options={{
              title: "PNP",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/pnp-filled.png")
                      : require("../../assets/images/pnp-outline.png")
                  }
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />

          {/* ⭐ Home */}
          <Tabs.Screen
            name="home"
            options={{
              title: "",
              tabBarIcon: ({ focused }) => (
                <View
                  style={{
                    backgroundColor: "#D30019",
                    width: 65,
                    height: 65,
                    borderRadius: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: 25,
                  }}
                >
                  <Image
                    source={
                      focused
                        ? require("../../assets/images/home-filled.png")
                        : require("../../assets/images/home-outline.png")
                    }
                    style={{ width: 28, height: 28 }}
                  />
                </View>
              ),
            }}
          />

          {/* ⭐ BFP */}
          <Tabs.Screen
            name="BfpScreen"
            options={{
              title: "BFP",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/bfp-filled.png")
                      : require("../../assets/images/bfp-outline.png")
                  }
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />

          {/* ⭐ RDH */}
          <Tabs.Screen
            name="RDHScreen"
            options={{
              title: "RDH",
              tabBarIcon: ({ focused }) => (
                <Image
                  source={
                    focused
                      ? require("../../assets/images/rdh-filled.png")
                      : require("../../assets/images/rdh-outline.png")
                  }
                  style={{ width: 24, height: 24 }}
                />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
