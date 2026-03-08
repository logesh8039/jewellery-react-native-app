import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import WishlistItem from '../../components/common/WishlistItem'

const WishlistScreen = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const handleRemove = (item) => {
        dispatch(removeFromWishlist(item.id));
    };

    if (wishlistItems.length === 0) {
        return (
            <SafeAreaView style={styles.empty}>
                <Text>Your Wishlist is Empty ❤️</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>My Wishlist</Text>

            <FlatList
                data={wishlistItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <WishlistItem item={item} onRemove={handleRemove} />
                )}
            />
        </SafeAreaView>
    );
};

export default WishlistScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 15,
    },

    header: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
    },

    empty: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});