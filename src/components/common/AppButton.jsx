import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

const AppButton = ({ title, onPress, color = "#007BFF", loading = false, style }) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: color }, style]}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default AppButton;

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    text: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 16,
    },
});