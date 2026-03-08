import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const HeroBanner = ({ image, title, subtitle, buttonText, onPress }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />

            <View style={styles.content}>
                <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </View>

                {buttonText && (
                    <TouchableOpacity style={styles.button} onPress={onPress}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default HeroBanner;

const styles = StyleSheet.create({
    container: {
        height: 180,
        borderRadius: 20,
        overflow: "hidden",
        marginTop: 20,
        marginRight: 20,
    },

    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    content: {
        flex: 1,
        padding: 15,
        justifyContent: "space-between",
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
    },

    subtitle: {
        color: "#fff",
        fontSize: 14,
    },

    button: {
        backgroundColor: "#ff7842",
        paddingHorizontal: 15,
        paddingVertical: 6,
        borderRadius: 50,
        alignSelf: "flex-start",
    },

    buttonText: {
        color: "#fff",
    },
});