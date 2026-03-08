import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    console.log("WelcomeScreen");


    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "160301339904-mgtdj61bo10j30l7gaj3d2r1mq0m4864.apps.googleusercontent.com",
            offlineAccess: true,
            forceCodeForRefreshToken: true,
        });
    }, []);

    const googleLogin = async () => {
        if (loading) return;
        try {
            setLoading(true);

            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true
            });

            const userInfo = await GoogleSignin.signIn();
            console.log("User Info:", userInfo);

            if (userInfo.idToken) {
                const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
                await auth().signInWithCredential(googleCredential);
            } else {
                const tokens = await GoogleSignin.getTokens();
                if (!tokens.idToken) throw new Error("No ID token available");

                const googleCredential = GoogleAuthProvider.credential(tokens.idToken);
                await auth().signInWithCredential(googleCredential);
            }

            console.log("Successfully signed in!");
            // navigation.replace("Main");

        } catch (error) {
            console.error("Google Sign-In Error:", error);
            console.error("Error code:", error.code);
            console.error("Full error:", JSON.stringify(error, null, 2));

            if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
                alert("Sign-in was cancelled");
            } else if (error?.code === statusCodes.IN_PROGRESS) {
                alert("Sign-in already in progress");
            } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert("Google Play Services not available or outdated");
            } else {
                alert("Sign-in failed: " + (error.message || "Unknown error"));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled' showsVerticalScrollIndicator={false}
        >
            <View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.heading}>Welcome Back!</Text>
                    <Text style={{ fontSize: 16, color: '#555', textAlign: 'center' }}>
                        Please sign in to continue using the app.
                    </Text>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SignIn")}>
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.buttonText}>Create a new account</Text>
                </TouchableOpacity>

                <TouchableWithoutFeedback onPress={() => console.log('Forgot Password')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableWithoutFeedback>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#DB4437', marginTop: 30 }]}
                    onPress={googleLogin}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign In with Google</Text>}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        marginTop: 10,
    },
    signUpButton: {
        backgroundColor: '#28A745',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
    forgotPassword: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 10,
    },
});
