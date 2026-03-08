import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const HomeHeader = ({ username }) => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.greeting}>Welcome 👋</Text>
                <Text style={styles.userName}>{username}</Text>
            </View>

            <View style={styles.headerIcons}>
                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="search-outline" size={22} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <Icon name="notifications-outline" size={22} color="#000" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
    },
    greeting: {
        fontSize: 16,
        color: 'grey',
    },
    userName: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    iconButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#fa7842',
        width: 9,
        height: 9,
        borderRadius: 50,
    },
});