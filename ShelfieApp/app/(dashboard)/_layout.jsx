import React from "react";
import { Stack, Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function DashboardLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme] ?? Colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.navBackground,
          paddingTop: 10,
          height: 90,
        },
        tabBarActiveTintColor: theme.iconColorFocused,
        tabBarInactiveTintColor: theme.iconColor,
      }}
    >
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          tabBarLabel: "Books",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "book" : "book-outline"}
              size={24}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          tabBarLabel: "Add Book",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "add-circle" : "add-circle-outline"}
              size={24}
              color={focused ? theme.iconColorFocused : theme.iconColor}
            />
          ),
        }}
      />
    </Tabs>
  );
}
