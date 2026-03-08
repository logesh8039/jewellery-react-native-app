import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { useAuth } from '../../contexts/AuthContext';

const SignUp = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [username, setUserName] = useState('');
    const { setSignedInUser } = useAuth();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    console.log("SignupScreen");


    const handleSignUp = async () => {
        if (loading) return;

        if (!username || !email || !password) {
            setError("Please fill all fields");
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await auth().createUserWithEmailAndPassword(email, password);

            await res.user.updateProfile({
                displayName: username,
            });

            setSignedInUser(res.user);

        } catch (err) {
            console.log(err.code);

            switch (err.code) {
                case "auth/email-already-in-use":
                    setError("Email already registered");
                    break;

                case "auth/invalid-email":
                    setError("Invalid email address");
                    break;

                case "auth/weak-password":
                    setError("Password must be at least 6 characters");
                    break;

                default:
                    setError("Something went wrong");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <Text style={styles.heading}>Sign Up</Text>
            <View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontFamily: 'Inter-Regular', borderRadius: 5, paddingHorizontal: 10 }}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUserName}
                        keyboardType="text"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current?.focus()}
                        autoCapitalize="none" >
                    </TextInput>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontFamily: 'Inter-Regular', borderRadius: 5, paddingHorizontal: 10 }}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        ref={emailRef}
                        keyboardType="email-address"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        autoCapitalize="none" >
                    </TextInput>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1, fontFamily: 'Inter-Regular', borderRadius: 5, paddingHorizontal: 10 }}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        onSubmitEditing={handleSignUp}
                        secureTextEntry={true}
                        ref={passwordRef}
                        returnKeyType="done"
                        autoCapitalize="none">
                    </TextInput>
                </View>

                {error ? <Text style={{ color: 'red', marginTop: 10, fontFamily: 'Inter-Regular' }}>{error}</Text> : null}

                {/* <TouchableOpacity style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 20 }} onPress={handleSignUp}> */}
                <TouchableOpacity
                    style={{ backgroundColor: '#007BFF', padding: 10, borderRadius: 5, marginTop: 20, opacity: loading ? 0.7 : 1 }}
                    onPress={handleSignUp}
                    disabled={loading}
                >
                    {
                        loading ? <ActivityIndicator size="small" color="#fff" />
                            : <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'Inter-Bold' }}>Sign Up</Text>
                    }
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={() => console.log('Forgot Password')}>
                    <Text style={{ color: '#007BFF', textAlign: 'center', marginTop: 10, fontFamily: 'Inter-Regular' }}>Forgot Password?</Text>
                </TouchableWithoutFeedback>

                <TouchableOpacity style={{ backgroundColor: '#28A745', padding: 10, borderRadius: 5, marginTop: 20 }} onPress={() => navigation.navigate('SignIn')}>
                    <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'Inter-Bold' }}>Already have an account</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default SignUp

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
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
        fontFamily: 'Inter-Bold',
    },
    inputLabel: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
        fontFamily: 'Inter-Regular',
    },
})