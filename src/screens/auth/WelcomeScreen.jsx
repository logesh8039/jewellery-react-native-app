import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height } = Dimensions.get("window");

const GOLD = "#C9A84C";
const GOLD_DARK = "#9A7020";
const BG = "#FAF7F2";
const TEXT_PRIMARY = "#1A1209";
const TEXT_MUTED = "#9A8C7A";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(40)).current;
    const badgeFade = useRef(new Animated.Value(0)).current;
    const buttonSlide = useRef(new Animated.Value(60)).current;

    useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "160301339904-mgtdj61bo10j30l7gaj3d2r1mq0m4864.apps.googleusercontent.com",
            offlineAccess: true
        });

        Animated.sequence([
            Animated.timing(badgeFade, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true
                }),
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true
                })
            ]),
            Animated.timing(buttonSlide, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }, [badgeFade, fadeAnim, slideAnim, buttonSlide]);

    const googleLogin = async () => {
        try {
            setLoading(true);

            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });

            // Optional: show account picker every time
            await GoogleSignin.signOut();

            const userInfo = await GoogleSignin.signIn();

            const { idToken } = await GoogleSignin.getTokens();

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential);

        } catch (error) {
            console.log("Google SignIn Error:", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />

            {/* Decorative shapes */}
            <View style={styles.circleTopRight} />
            <View style={styles.circleBottomLeft} />

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
            >
                {/* Badge */}
                <Animated.View style={[styles.badge, { opacity: badgeFade }]}>
                    <Text style={styles.badgeText}>NEW • 2025 COLLECTION</Text>
                </Animated.View>

                {/* Heading */}
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }}
                >
                    <Text style={styles.heading}>
                        Jewellery{"\n"}Redefined.
                    </Text>

                    <Text style={styles.subtitle}>
                        Discover handcrafted pieces that tell{"\n"}your unique story.
                    </Text>
                </Animated.View>

                {/* Dots */}
                <Animated.View style={[styles.dotsRow, { opacity: fadeAnim }]}>
                    {[0, 1, 2].map((i) => (
                        <View key={i} style={[styles.dot, i === 1 && styles.dotActive]} />
                    ))}
                </Animated.View>

                {/* Buttons */}
                <Animated.View
                    style={[
                        styles.buttonsBlock,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: buttonSlide }]
                        }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate("SignIn")}
                    >
                        <Text style={styles.primaryText}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.secondaryButton}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.secondaryText}>Create an new Account</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot your password?</Text>
                    </TouchableOpacity>

                    {/* Divider */}
                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.orText}>or</Text>
                        <View style={styles.line} />
                    </View>

                    {/* Google Login */}
                    <TouchableOpacity
                        style={styles.googleButton}
                        onPress={googleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color={GOLD} />
                        ) : (
                            <View style={styles.googleInner}>
                                <Ionicons name="logo-google" size={18} color="#DB4437" />
                                <Text style={styles.googleText}>Continue with Google</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </Animated.View>

                {/* Footer */}
                <Animated.Text style={[styles.footer, { opacity: fadeAnim }]}>
                    By continuing, you agree to our{" "}
                    <Text style={styles.footerLink}>Terms</Text> &{" "}
                    <Text style={styles.footerLink}>Privacy</Text>
                </Animated.Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: BG
    },

    circleTopRight: {
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: 140,
        backgroundColor: "#F0E6CC",
        top: -80,
        right: -80,
        opacity: 0.6
    },

    circleBottomLeft: {
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: "#EDE0C8",
        bottom: 60,
        left: -70,
        opacity: 0.45
    },

    container: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingTop: height * 0.1,
        paddingBottom: 36
    },

    badge: {
        alignSelf: "flex-start",
        backgroundColor: "#F3E8C8",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 28,
        borderWidth: 1,
        borderColor: "#E2D0A0"
    },

    badgeText: {
        fontSize: 12,
        color: GOLD_DARK,
        fontWeight: "600",
        letterSpacing: 1
    },

    heading: {
        fontSize: 48,
        fontWeight: "800",
        color: TEXT_PRIMARY,
        lineHeight: 56,
        letterSpacing: -1,
        marginBottom: 16
    },

    subtitle: {
        fontSize: 15,
        color: TEXT_MUTED,
        lineHeight: 24
    },

    dotsRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 28,
        marginBottom: 40,
        gap: 6
    },

    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: "#D9CEBD"
    },

    dotActive: {
        width: 22,
        backgroundColor: GOLD
    },

    buttonsBlock: {
        width: "100%"
    },

    primaryButton: {
        backgroundColor: TEXT_PRIMARY,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: "center",
        elevation: 6
    },

    primaryText: {
        color: BG,
        fontWeight: "700",
        fontSize: 16
    },

    secondaryButton: {
        borderWidth: 1.5,
        borderColor: GOLD,
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center",
        marginTop: 12
    },

    secondaryText: {
        color: GOLD_DARK,
        fontWeight: "700",
        fontSize: 16
    },

    forgotPassword: {
        textAlign: "center",
        marginTop: 18,
        color: TEXT_MUTED,
        fontSize: 13,
        textDecorationLine: "underline"
    },

    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 28,
        gap: 12
    },

    line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#D9CEBD"
    },

    orText: {
        color: TEXT_MUTED,
        fontSize: 13,
        fontWeight: "500"
    },

    googleButton: {
        borderWidth: 1,
        borderColor: "#E0D5C5",
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center",
        backgroundColor: "#FFFFFF"
    },

    googleInner: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },

    googleText: {
        fontSize: 15,
        fontWeight: "600",
        color: TEXT_PRIMARY
    },

    footer: {
        textAlign: "center",
        marginTop: 28,
        fontSize: 12,
        color: TEXT_MUTED
    },

    footerLink: {
        color: GOLD_DARK,
        fontWeight: "600",
        textDecorationLine: "underline"
    }
});