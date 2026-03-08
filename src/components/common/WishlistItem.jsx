import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const WishlistItem = ({ item, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.productImage }} style={styles.image} />

            <View style={styles.details}>
                <Text numberOfLines={2} style={styles.name}>
                    {item.productName}
                </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.offerPrice}>{item.offerPrice}</Text>
                    <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>

                <View style={styles.discountRow}>
                    <Text style={styles.discount}>{item.discount}</Text>
                    <Text style={styles.charges}>{item.makingCharge}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.heartBtn}
                onPress={() => onRemove(item)}
            >
                <Icon name="heart" size={28} color="#fa606d" />
            </TouchableOpacity>
        </View>
    );
};

export default WishlistItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },

    image: {
        width: 85,
        height: 85,
        borderRadius: 10,
    },

    details: {
        flex: 1,
        marginLeft: 12,
    },

    name: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },

    priceRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 6,
    },

    offerPrice: {
        fontWeight: "bold",
        fontSize: 15,
        marginRight: 8,
    },

    originalPrice: {
        textDecorationLine: "line-through",
        color: "#999",
        fontSize: 12,
    },

    discountRow: {
        flexDirection: "row",
        marginTop: 4,
        alignItems: "center",
    },

    discount: {
        color: "#159d06",
        fontWeight: "bold",
        fontSize: 12,
        marginRight: 6,
    },

    charges: {
        fontSize: 12,
        color: "#777",
    },

    heartBtn: {
        padding: 6,
    },
});