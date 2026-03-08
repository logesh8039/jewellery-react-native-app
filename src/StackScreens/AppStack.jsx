import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "../navigation/BottomTabs";
import ProductListing from "../screens/products/ProductListing";
import ProductDetails from "../screens/bottom-tabs/HomeStack/ProductDetail";
import { Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="MainTabs"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    );
};


export default AppStack;