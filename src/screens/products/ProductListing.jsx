import React, { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Dimensions
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import ProductCard from "../../components/common/ProductCard";
import ProductFilterModal from "../../components/filters/ProductFilterModal";
import { addToWishlist, removeFromWishlist } from "../../redux/slices/wishlistSlice";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 24) / 2;

const ProductListing = ({ route }) => {

    const navigation = useNavigation();
    const products = useSelector((state) => state.product.products);

    /* CATEGORY FROM HOMESCREEN */
    const categoryParam = route?.params?.category || null;
    const badgeParam = route?.params?.badge || null;

    const [searchText, setSearchText] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const [sortType, setSortType] = useState(null);
    const [priceFilter, setPriceFilter] = useState(null);

    const [categoryFilter, setCategoryFilter] = useState(categoryParam);
    const [badgeFilter, setBadgeFilter] = useState(badgeParam);

    const [tempSort, setTempSort] = useState(null);
    const [tempPrice, setTempPrice] = useState(null);
    const [tempCategory, setTempCategory] = useState(categoryParam);
    const [tempBadge, setTempBadge] = useState(badgeParam);
    const dispatch = useDispatch();
    const wishlist = useSelector((state) => state.wishlist.items);

    /* FILTER PRODUCTS */

    let filteredProducts = products;

    /* CATEGORY FILTER */

    if (categoryFilter) {
        filteredProducts = filteredProducts.filter((p) =>
            p.productName.toLowerCase().includes(categoryFilter.toLowerCase())
        );
    }

    const handleFavPress = (product) => {
        const exists = wishlist.some(item => item.id === product.id);

        if (exists) {
            dispatch(removeFromWishlist(product.id));
        } else {
            dispatch(addToWishlist(product));
        }
    };

    /* BADGE FILTER */

    if (badgeFilter) {
        filteredProducts = filteredProducts.filter(
            (p) => p.productBadge === badgeFilter
        );
    }

    /* SEARCH */

    filteredProducts = filteredProducts.filter((item) =>
        item.productName.toLowerCase().includes(searchText.toLowerCase())
    );

    /* SORT */

    if (sortType === "LOW_HIGH") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) =>
                Number(a.offerPrice.replace(/[^0-9]/g, "")) -
                Number(b.offerPrice.replace(/[^0-9]/g, ""))
        );
    }

    if (sortType === "HIGH_LOW") {
        filteredProducts = [...filteredProducts].sort(
            (a, b) =>
                Number(b.offerPrice.replace(/[^0-9]/g, "")) -
                Number(a.offerPrice.replace(/[^0-9]/g, ""))
        );
    }

    /* PRICE FILTER */

    if (priceFilter === "UNDER_200K") {
        filteredProducts = filteredProducts.filter(
            (p) => Number(p.offerPrice.replace(/[^0-9]/g, "")) < 200000
        );
    }

    if (priceFilter === "ABOVE_200K") {
        filteredProducts = filteredProducts.filter(
            (p) => Number(p.offerPrice.replace(/[^0-9]/g, "")) >= 200000
        );
    }

    const applyFilters = () => {
        setSortType(tempSort);
        setPriceFilter(tempPrice);
        setCategoryFilter(tempCategory);
        setBadgeFilter(tempBadge);
        setShowFilters(false);
    };

    const renderItem = ({ item }) => {
        const isFav = wishlist.some(p => p.id === item.id);

        return (
            <View style={{ width: CARD_WIDTH }}>
                <ProductCard
                    product={item}
                    handleFavPress={handleFavPress}
                    isFav={isFav}
                />
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* HEADER */}

            <View style={styles.header}>

                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-outline" size={24} />
                </TouchableOpacity>

                <Text style={styles.title}>
                    {categoryFilter || badgeFilter || "All Products"}
                </Text>

                <View style={{ width: 24 }} />

            </View>

            {/* SEARCH */}

            <View style={styles.searchBox}>

                <Icon name="search-outline" size={18} color="#777" />

                <TextInput
                    placeholder="Search jewellery..."
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />

            </View>

            {/* ACTIVE FILTERS */}

            <View style={styles.filterRow}>

                {categoryFilter && (
                    <View style={styles.activeFilter}>
                        <Text style={styles.activeText}>{categoryFilter}</Text>

                        <TouchableOpacity onPress={() => setCategoryFilter(null)}>
                            <Icon name="close" size={14} />
                        </TouchableOpacity>
                    </View>
                )}

                {badgeFilter && (
                    <View style={styles.activeFilter}>
                        <Text style={styles.activeText}>{badgeFilter}</Text>

                        <TouchableOpacity onPress={() => setBadgeFilter(null)}>
                            <Icon name="close" size={14} />
                        </TouchableOpacity>
                    </View>
                )}

            </View>

            {/* FILTER BUTTON */}

            <View style={styles.filterRow}>
                <TouchableOpacity
                    style={styles.filterBtn}
                    onPress={() => {
                        setTempSort(sortType);
                        setTempPrice(priceFilter);
                        setTempCategory(categoryFilter);
                        setTempBadge(badgeFilter);
                        setShowFilters(true);
                    }}
                >
                    <Icon name="filter-outline" size={18} />
                    <Text style={styles.filterText}>Filter</Text>
                </TouchableOpacity>
            </View>

            {/* PRODUCT GRID */}

            <FlatList
                data={filteredProducts}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                extraData={wishlist}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
            />

            {/* FILTER MODAL */}

            <ProductFilterModal
                visible={showFilters}
                onClose={() => setShowFilters(false)}

                tempSort={tempSort}
                setTempSort={setTempSort}

                tempPrice={tempPrice}
                setTempPrice={setTempPrice}

                tempCategory={tempCategory}
                setTempCategory={setTempCategory}

                tempBadge={tempBadge}
                setTempBadge={setTempBadge}

                onApply={applyFilters}
            />

        </SafeAreaView>
    );
};

export default ProductListing;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12
    },

    title: {
        fontSize: 20,
        fontWeight: "bold"
    },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        marginHorizontal: 16,
        paddingHorizontal: 10,
        borderRadius: 10,
        height: 40,
        marginBottom: 10
    },

    searchInput: {
        marginLeft: 8,
        flex: 1
    },

    filterRow: {
        flexDirection: "row",
        paddingHorizontal: 16,
        marginBottom: 10,
    },

    activeFilter: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#ddd",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        marginRight: 8
    },

    activeText: {
        marginRight: 6
    },

    row: {
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },

    list: {
        paddingBottom: 40
    },

    filterBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        elevation: 2
    },

    filterText: {
        marginLeft: 6,
        fontWeight: "500"
    }

});