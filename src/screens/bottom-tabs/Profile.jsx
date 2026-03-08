import {
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../auth/firebaseConfig";

const Profile = () => {
    const navigation = useNavigation();
    const { loggedInUser, setSignedInUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const signOutUser = () => {
        Alert.alert("Logout", "Are you sure you want to logout?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Logout",
                onPress: async () => {
                    try {
                        setLoading(true);
                        await signOut(FIREBASE_AUTH);
                        setSignedInUser(null);
                    } catch (err) {
                        console.log(err);
                    } finally {
                        setLoading(false);
                    }
                },
            },
        ]);
    };

    const MenuItem = ({ icon, text, iconType = "feather", onPress }) => {
        const IconComponent = iconType === "feather" ? Feather : Ionicons;

        return (
            <TouchableOpacity style={styles.menuItem} onPress={onPress}>
                <View style={styles.iconBox}>
                    <IconComponent name={icon} size={20} color="#fa606d" />
                </View>

                <Text style={styles.menuText}>{text}</Text>

                <Feather
                    name="chevron-right"
                    size={20}
                    color="#888"
                    style={{ marginLeft: "auto" }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {loading && (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Feather name="chevron-left" size={24} color="#333" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                {/* PROFILE CARD */}
                <View style={styles.profileCard}>
                    <Image
                        source={{
                            uri:
                                loggedInUser?.photoURL ||
                                "https://i.ibb.co/MDJbjc4/luke-1.jpg",
                        }}
                        style={styles.profileImage}
                    />

                    <Text style={styles.name}>
                        {loggedInUser?.displayName || "User"}
                    </Text>

                    <Text style={styles.email}>{loggedInUser?.email}</Text>

                    <TouchableOpacity style={styles.editBtn}>
                        <Text style={styles.editText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* STATS */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Coupons</Text>
                    </View>

                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>1200</Text>
                        <Text style={styles.statLabel}>Points</Text>
                    </View>

                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>25</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                </View>

                {/* MENU */}
                <View style={{ marginTop: 18 }}>
                    <MenuItem icon="user" text="Membership" />

                    <MenuItem
                        icon="wallet-outline"
                        iconType="ion"
                        text="Wallet"
                    />

                    <MenuItem
                        icon="notifications-outline"
                        iconType="ion"
                        text="Notifications"
                    />

                    <MenuItem
                        icon="settings-outline"
                        iconType="ion"
                        text="Settings"
                    />
                </View>

                {/* LOGOUT */}
                <TouchableOpacity style={styles.logoutBtn} onPress={signOutUser}>
                    <Ionicons name="power-outline" size={20} color="#fff" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f8f8",
        paddingHorizontal: 16,
        paddingTop: 10,
    },

    loader: {
        position: "absolute",
        zIndex: 10,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "center",
        alignItems: "center",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginLeft: 10,
    },

    profileCard: {
        backgroundColor: "#fff",
        marginTop: 18,
        borderRadius: 16,
        alignItems: "center",
        paddingVertical: 20,
        elevation: 3,
    },

    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },

    name: {
        fontSize: 19,
        fontWeight: "700",
        marginTop: 10,
    },

    email: {
        color: "#777",
        marginTop: 3,
        fontSize: 13,
    },

    editBtn: {
        marginTop: 10,
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: "#fa606d",
    },

    editText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },

    statsContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 14,
        marginTop: 15,
        paddingVertical: 14,
        elevation: 2,
    },

    statBox: {
        flex: 1,
        alignItems: "center",
    },

    statNumber: {
        fontSize: 18,
        fontWeight: "700",
        color: "#fa606d",
    },

    statLabel: {
        color: "#888",
        fontSize: 12,
        marginTop: 2,
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingVertical: 13,
        paddingHorizontal: 14,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 1,
    },

    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: "#fff0f2",
        justifyContent: "center",
        alignItems: "center",
    },

    menuText: {
        fontSize: 15,
        marginLeft: 12,
        fontWeight: "500",
    },

    logoutBtn: {
        marginTop: 15,
        backgroundColor: "#fa606d",
        paddingVertical: 13,
        borderRadius: 12,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    logoutText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 8,
    },
});

