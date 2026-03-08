import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

const CircleCategoryList = ({ data, onPressItem }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {data.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    style={styles.item}
                    onPress={() => onPressItem(item.category)}
                >
                    <View style={styles.imageWrapper}>
                        <Image source={{ uri: item.productImage }} style={styles.image} />
                    </View>

                    <Text style={styles.text}>{item.category}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

export default CircleCategoryList;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        paddingRight: 20
    },

    item: {
        alignItems: "center",
        marginRight: 12,
    },

    imageWrapper: {
        width: 65,
        height: 65,
        borderRadius: 50,
        backgroundColor: "#fff",
        overflow: "hidden",
    },

    image: {
        width: "100%",
        height: "100%",
    },

    text: {
        marginTop: 5,
        fontSize: 14,
    },
});