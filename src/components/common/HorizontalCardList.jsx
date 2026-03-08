import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";

const HorizontalCardList = ({ title, data, handleFavPress, onPressSeeAll, favIds }) => {
    return (
        <View style={styles.container}>
            <SectionHeader title={title} onPressSeeAll={onPressSeeAll} />

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
                {data?.slice(0, 8).map((item) => (
                    <View style={{ width: 200 }} key={item.id}>
                        <ProductCard
                            product={item}
                            handleFavPress={handleFavPress}
                            isFav={favIds?.has(item.id)}
                        />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default React.memo(HorizontalCardList);


const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },

    list: {
        marginTop: 10,
    },
});