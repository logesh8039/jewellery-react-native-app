import React, { useRef, useState, useEffect } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useAuth } from "../../contexts/AuthContext";

const { height } = Dimensions.get("window");

const GOLD = "#C9A84C";
const GOLD_DARK = "#9A7020";
const BG = "#FAF7F2";
const TEXT_PRIMARY = "#1A1209";
const TEXT_MUTED = "#9A8C7A";

const SignUp = () => {
    const navigation = useNavigation();
    const { setSignedInUser } = useAuth();

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [focusedField, setFocusedField] = useState(null);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
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
        ]).start();
    }, [fadeAnim, slideAnim]);

    const handleSignUp = async () => {
        if (loading) return;

        if (!username || !email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await auth().createUserWithEmailAndPassword(email, password);

            await res.user.updateProfile({
                displayName: username
            });

            setSignedInUser(res.user);
        } catch (err) {
            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("This email is already registered.");
                    break;

                case "auth/invalid-email":
                    setError("Please enter a valid email address.");
                    break;

                case "auth/weak-password":
                    setError("Password must be at least 6 characters.");
                    break;

                default:
                    setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        if (error) setError("");
    };

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="dark-content" backgroundColor={BG} />

            <View style={styles.circleTopRight} />
            <View style={styles.circleBottomLeft} />

            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>

                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                    }}
                >
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>✦ Join Us Today</Text>
                    </View>

                    <Text style={styles.heading}>
                        Create an Account
                    </Text>

                    <Text style={styles.subtitle}>
                        Start your journey with us.{"\n"}Discover jewellery made for you.
                    </Text>

                    <View style={styles.form}>
                        {/* Username */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Username</Text>

                            <TextInput
                                style={[
                                    styles.input,
                                    focusedField === "username" && styles.inputFocused
                                ]}
                                placeholder="Your display name"
                                placeholderTextColor="#C4B89A"
                                value={username}
                                onChangeText={(text) => {
                                    setUserName(text);
                                    clearError();
                                }}
                                returnKeyType="next"
                                autoCapitalize="none"
                                onFocus={() => setFocusedField("username")}
                                onBlur={() => setFocusedField(null)}
                                onSubmitEditing={() => emailRef.current?.focus()}
                            />
                        </View>

                        {/* Email */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email</Text>

                            <TextInput
                                style={[
                                    styles.input,
                                    focusedField === "email" && styles.inputFocused
                                ]}
                                placeholder="you@example.com"
                                placeholderTextColor="#C4B89A"
                                value={email}
                                ref={emailRef}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    clearError();
                                }}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                                onFocus={() => setFocusedField("email")}
                                onBlur={() => setFocusedField(null)}
                                onSubmitEditing={() => passwordRef.current?.focus()}
                            />
                        </View>

                        {/* Password */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Password</Text>

                            <TextInput
                                ref={passwordRef}
                                style={[
                                    styles.input,
                                    focusedField === "password" && styles.inputFocused
                                ]}
                                placeholder="Min. 6 characters"
                                placeholderTextColor="#C4B89A"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    clearError();
                                }}
                                secureTextEntry
                                autoCapitalize="none"
                                returnKeyType="done"
                                onFocus={() => setFocusedField("password")}
                                onBlur={() => setFocusedField(null)}
                                onSubmitEditing={handleSignUp}
                            />
                        </View>

                        {error ? (
                            <View style={styles.errorBox}>
                                <Text style={styles.errorText}>⚠ {error}</Text>
                            </View>
                        ) : null}

                        <TouchableOpacity
                            style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={BG} />
                            ) : (
                                <Text style={styles.primaryText}>Create Account</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.line} />
                            <Text style={styles.orText}>or</Text>
                            <View style={styles.line} />
                        </View>

                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate("SignIn")}
                        >
                            <Text style={styles.secondaryText}>
                                Already have an account? Sign In
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <Text style={styles.footer}>
                    By signing up, you agree to our{" "}
                    <Text style={styles.footerLink}>Terms</Text> &{" "}
                    <Text style={styles.footerLink}>Privacy Policy</Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: BG
    },

    circleTopRight: {
        position: "absolute",
        width: 260,
        height: 260,
        borderRadius: 130,
        backgroundColor: "#F0E6CC",
        top: -70,
        right: -70,
        opacity: 0.6
    },

    circleBottomLeft: {
        position: "absolute",
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: "#EDE0C8",
        bottom: 80,
        left: -60,
        opacity: 0.45
    },

    container: {
        flexGrow: 1,
        paddingHorizontal: 28,
        paddingTop: 16,
        paddingBottom: 36
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "#F0E8D8",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18
    },

    backArrow: {
        fontSize: 20,
        color: TEXT_PRIMARY
    },

    badge: {
        alignSelf: "flex-start",
        backgroundColor: "#F3E8C8",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 6,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: "#E2D0A0"
    },

    badgeText: {
        fontSize: 12,
        color: GOLD_DARK,
        fontWeight: "600"
    },

    heading: {
        fontSize: 36,
        fontWeight: "800",
        color: TEXT_PRIMARY,
        marginBottom: 10
    },

    subtitle: {
        fontSize: 14,
        color: TEXT_MUTED,
        marginBottom: 36,
        lineHeight: 22
    },

    form: {
        width: "100%"
    },

    inputGroup: {
        marginBottom: 18
    },

    label: {
        fontSize: 13,
        fontWeight: "600",
        color: TEXT_PRIMARY,
        marginBottom: 8
    },

    input: {
        height: 52,
        borderWidth: 1.5,
        borderColor: "#E0D5C5",
        borderRadius: 14,
        paddingHorizontal: 16,
        fontSize: 15,
        backgroundColor: "#FFF"
    },

    inputFocused: {
        borderColor: GOLD
    },

    errorBox: {
        backgroundColor: "#FFF0EE",
        borderRadius: 10,
        padding: 10,
        marginBottom: 16
    },

    errorText: {
        color: "#C0392B",
        fontSize: 13
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

    divider: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24
    },

    line: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#D9CEBD"
    },

    orText: {
        marginHorizontal: 12,
        color: TEXT_MUTED
    },

    secondaryButton: {
        borderWidth: 1.5,
        borderColor: GOLD,
        paddingVertical: 15,
        borderRadius: 14,
        alignItems: "center"
    },

    secondaryText: {
        color: GOLD_DARK,
        fontWeight: "700",
        fontSize: 15
    },

    footer: {
        textAlign: "center",
        marginTop: 32,
        fontSize: 12,
        color: TEXT_MUTED
    },

    footerLink: {
        color: GOLD_DARK,
        fontWeight: "600",
        textDecorationLine: "underline"
    }
});