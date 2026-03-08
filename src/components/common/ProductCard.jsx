import React, { memo } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { useNavigation } from "@react-navigation/native";

const ProductCard = ({ product, handleFavPress, isFav }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items);

    const isInCart = cartItems.some(item => item.id === product.id);

    const handleCartPress = () => {
        if (isInCart) {
            dispatch(removeFromCart(product.id));
        } else {
            dispatch(addToCart(product));
        }
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity style={styles.favIcon} onPress={() => handleFavPress(product)}>
                <Icon name={isFav ? "heart" : "heart-outline"} size={28} color="#fa606d" />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate("ProductDetails", { product })}
            >
                <Image source={{ uri: product.productImage }} style={styles.image} />
                <View>
                    <View style={styles.priceRow}>
                        <Text style={styles.offerPrice}>{product.offerPrice}</Text>
                        <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                    </View>

                    <View style={styles.priceWrapper}>
                        <Text style={styles.discount}>{product.discount}</Text>
                        <Text style={styles.charges} numberOfLines={1}>{product.makingCharge}</Text>
                    </View>

                    <Text style={styles.name} numberOfLines={2}>
                        {product.productName}
                    </Text>
                    <TouchableOpacity
                        style={[
                            styles.cartBtn,
                            isInCart && styles.removeBtn
                        ]}
                        onPress={handleCartPress}
                    >
                        <Icon
                            name={isInCart ? "trash-outline" : "cart-outline"}
                            size={16}
                            color="#fff"
                        />
                        <Text style={styles.cartText}>
                            {isInCart ? "Remove" : "Add to Cart"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default memo(ProductCard);
const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        backgroundColor: "#fff",
        padding: 10,
        margin: 8,
        marginLeft: 0,
    },

    image: {
        width: "100%",
        height: 180,
        borderRadius: 10,
    },

    favIcon: {
        position: "absolute",
        right: 12,
        top: 12,
        zIndex: 1,
    },

    priceRow: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },

    offerPrice: {
        fontWeight: "bold",
    },

    originalPrice: {
        textDecorationLine: "line-through",
        color: "grey",
        fontSize: 12,
    },

    priceWrapper: {
        flexDirection: "row",
        gap: 5,
        marginTop: 5,
        flexWrap: "wrap",
    },

    discount: {
        color: "#159d06",
        fontWeight: "bold",
        fontSize: 12,
    },

    charges: {
        color: "#999",
        fontSize: 12,
    },

    name: {
        marginTop: 10,
        fontSize: 14,
        color: "#666",
        minHeight: 40,
    },
    cartBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        backgroundColor: "#fa606d",
        marginTop: 10,
        paddingVertical: 8,
        borderRadius: 8,
    },

    removeBtn: {
        backgroundColor: "#333",
    },

    cartText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 13,
    },
});