import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "../screens/auth/LoginScreen";
import SignUp from "../screens/auth/SignupScreen";
import WelcomeScreen from "../screens/auth/WelcomeScreen";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
    return (
        <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
            />

        </Stack.Navigator>
    );
};

export default GuestStack;