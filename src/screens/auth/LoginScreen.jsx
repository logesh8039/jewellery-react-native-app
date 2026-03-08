import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../contexts/AuthContext';
import { fontFamilies } from '../../constants/fonts';
import { getFontFamily } from '../../utils/fontFamily';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [error, setError] = useState('');
    const { setSignedInUser } = useAuth();
    const passwordRef = useRef(null);

    console.log("LoginScreen");



    const handleSignIn = async () => {
        if (loading) return;

        if (!email || !password) {
            setError("Please enter email and password");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await auth().signInWithEmailAndPassword(email, password);
            setSignedInUser(res.user);
        } catch (err) {
            console.log(err.code);

            const errorMessages = {
                "auth/invalid-email": "The email address is not valid.",
                "auth/user-disabled": "This user account has been disabled.",
                "auth/network-request-failed": "Network error. Check your internet.",
                "auth/too-many-requests": "Too many login attempts. Try again later.",
            };

            if (
                err.code === "auth/user-not-found" ||
                err.code === "auth/wrong-password" ||
                err.code === "auth/invalid-credential"
            ) {
                setError("Invalid email or password.");
            } else {
                setError(errorMessages[err.code] || "Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false} >
            <Text style={styles.heading}>Sign In</Text>
            <View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoComplete="email"
                        textContentType="emailAddress"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        ref={passwordRef}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        returnKeyType="done"
                        onSubmitEditing={handleSignIn}
                    />
                </View>
                {error ? <Text style={{ color: 'red', fontFamily: 'Inter-Regular' }}>{error}</Text> : null}
                <TouchableOpacity style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
                    onPress={handleSignIn}
                    disabled={loading}>
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => console.log('Forgot Password')}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </TouchableWithoutFeedback>
                <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.buttonText}>Create a new account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 50,
        padding: 20,
        backgroundColor: '#fff',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 15,
    },
    inputLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
        fontFamily: getFontFamily(true, "normal"),
    },
    input: {
        height: 45,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
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
