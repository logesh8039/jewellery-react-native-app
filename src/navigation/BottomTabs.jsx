import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { Text, View, TouchableOpacity } from "react-native";
import HomeStack from "../navigation/HomeStack";
import WishlistScreen from "../screens/bottom-tabs/WishlistScreen";
import Cart from "../screens/bottom-tabs/Cart";
import Profile from "../screens/bottom-tabs/Profile";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
    const wishlistCount = useSelector(state => state.wishlist.items.length);
    const cartCount = useSelector(state => state.cart.items.length);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                headerShown: false,

                tabBarActiveTintColor: "#fa606d",
                tabBarInactiveTintColor: "#777",

                tabBarButton: (props) => (
                    <TouchableOpacity {...props} activeOpacity={1} />
                ),

                tabBarIcon: ({ focused, color }) => {
                    let iconName;
                    let badgeCount = 0;

                    if (route.name === "Home")
                        iconName = focused ? "home" : "home-outline";

                    else if (route.name === "Wishlist") {
                        iconName = focused ? "heart" : "heart-outline";
                        badgeCount = wishlistCount;
                    }

                    else if (route.name === "Cart") {
                        iconName = focused ? "cart" : "cart-outline";
                        badgeCount = cartCount;
                    }

                    else if (route.name === "Profile")
                        iconName = focused ? "person" : "person-outline";

                    return (
                        <View style={{ width: 26, height: 26 }}>
                            <Icon name={iconName} size={22} color={color} />

                            {badgeCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>
                                        {badgeCount > 99 ? "99+" : badgeCount}
                                    </Text>
                                </View>
                            )}
                        </View>
                    );
                },

                tabBarStyle: {
                    height: 65,
                    paddingBottom: 8,
                    paddingTop: 5,
                    borderTopWidth: 0,
                    elevation: 10,
                    backgroundColor: "#fff"
                },

                tabBarLabelStyle: {
                    fontSize: 11
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

export default BottomTabs;

const styles = {
    badge: {
        position: "absolute",
        top: -6,
        right: -6,
        backgroundColor: "#fa606d",
        minWidth: 18,
        height: 18,
        borderRadius: 999,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#fff"
    },

    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "600",
        textAlign: "center"
    }
};