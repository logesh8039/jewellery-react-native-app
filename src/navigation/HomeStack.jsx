import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/bottom-tabs/HomeStack/HomeScreen";
import ProductDetails from "../screens/bottom-tabs/HomeStack/ProductDetail";
import ProductListing from "../screens/products/ProductListing";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
            />

            <Stack.Screen
                name="ProductDetails"
                component={ProductDetails}
            />
            <Stack.Screen
                name="ProductListing"
                component={ProductListing}
            />
        </Stack.Navigator>
    );
};

export default HomeStack;