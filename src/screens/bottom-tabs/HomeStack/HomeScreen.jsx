

import { ScrollView, StyleSheet } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../contexts/AuthContext';
import HomeHeader from '../../../components/common/HomeHeader';
import HeroBanner from '../../../components/common/HeroBanner';
import CircleCategoryList from '../../../components/common/CircleCategoryList';
import SectionHeader from '../../../components/common/SectionHeader';
import HorizontalCardList from '../../../components/common/HorizontalCardList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { addToWishlist, removeFromWishlist } from '../../../redux/slices/wishlistSlice';

const HomeScreen = () => {
    const { loggedInUser } = useAuth();

    const products = useSelector((state) => state?.product?.products || []);
    const productCategories = useSelector((state) => state?.product?.productCategories || []);
    const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
    const dispatch = useDispatch();
    const favProducts = useSelector(state => state.wishlist.items);
    const navigation = useNavigation();

    const favIds = useMemo(() => {
        return new Set(favProducts.map(item => item.id));
    }, [favProducts]);

    const handleFavPress = useCallback((product) => {
        const isFav = favProducts.some(item => item.id === product.id);

        if (isFav) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    }, [favProducts, dispatch]);

    const filterByCategory = (category) => {
        const filtered = products.filter(product =>
            product?.productName.toLowerCase().includes(category.toLowerCase())
        );
        console.log('Filtered products:', filtered.length);
        setFilteredCategoryProducts(filtered);
    };

    const filteredByBadge = (badge) => {
        if (badge === "" || badge === "All") {
            return products;
        }
        return products.filter(product =>
            product?.productBadge.toLowerCase().includes(badge.toLowerCase())
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
            <ScrollView
                contentContainerStyle={styles.content}>
                {/* Welcome Header */}
                <HomeHeader
                    username={loggedInUser?.displayName?.trim() || "Maria Jane"}
                />

                {/* Banner */}
                <HeroBanner
                    image="https://www.shutterstock.com/image-photo/jewellery-diamond-ring-on-black-600nw-621499595.jpg"
                    title="Summer Sale"
                    subtitle="Up to 50% off on all products"
                    buttonText="Shop Now"
                    onPress={() => navigation.navigate("ProductListing")}
                />

                {/* Categories */}
                <SectionHeader title="Categories" onPressSeeAll={() => navigation.navigate("ProductListing")}
                />

                <CircleCategoryList
                    data={productCategories}
                    onPressItem={(category) =>
                        navigation.navigate("ProductListing", { category })
                    }
                />
                {/* Sections */}
                <HorizontalCardList
                    title="New Arrivals"
                    data={
                        filteredCategoryProducts.length
                            ? filteredCategoryProducts
                            : filteredByBadge("New Arrival")
                    }
                    favProducts={favProducts}
                    handleFavPress={handleFavPress}
                    favIds={favIds}
                    onPressSeeAll={() =>
                        navigation.navigate("ProductListing", { badge: "New Arrival" })
                    }
                />

                <HorizontalCardList
                    title="Best Seller"
                    data={filteredByBadge("Best Seller")}
                    handleFavPress={handleFavPress}
                    favIds={favIds}
                    onPressSeeAll={() =>
                        navigation.navigate("ProductListing", { badge: "Best Seller" })
                    }
                />

                <HorizontalCardList
                    title="Express Delivery"
                    data={filteredByBadge("Express Delivery")}
                    handleFavPress={handleFavPress}
                    favIds={favIds}
                    onPressSeeAll={() =>
                        navigation.navigate("ProductListing", { badge: "Express Delivery" })
                    }
                />
            </ScrollView>
        </SafeAreaView>
    );
};


export default HomeScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },

    content: {
        padding: 20,
        paddingRight: 0,
        paddingBottom: 50,
    },
});

