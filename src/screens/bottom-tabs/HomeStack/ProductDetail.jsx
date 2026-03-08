import React, { useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { addToCart, removeFromCart } from "../../../redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist
} from "../../../redux/slices/wishlistSlice";
import { useNavigation } from "@react-navigation/native";

import HorizontalCardList from "../../../components/common/HorizontalCardList";

const ProductDetails = ({ route }) => {
  const { product } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const favProducts = useSelector(state => state.wishlist.items);
  const cartItems = useSelector(state => state.cart.items);
  const products = useSelector(state => state.product.products || []);

  const favIds = useMemo(() => new Set(favProducts.map(p => p.id)), [favProducts]);

  const isFav = favProducts.some(item => item.id === product.id);
  const isInCart = cartItems.some(item => item.id === product.id);

  const handleFavPress = (item) => {
    if (isFav) dispatch(removeFromWishlist(item.id));
    else dispatch(addToWishlist(item));
  };

  const handleCart = () => {
    if (isInCart) dispatch(removeFromCart(product.id));
    else dispatch(addToCart(product));
  };

  const getCategoryFromName = (name) => {
    const lower = name.toLowerCase();

    if (lower.includes("necklace")) return "necklace";
    if (lower.includes("bangle")) return "bangle";
    if (lower.includes("choker")) return "choker";
    if (lower.includes("earring")) return "earring";
    if (lower.includes("jhumka") || lower.includes("jhumki")) return "jhumka";
    if (lower.includes("ring")) return "ring";
    if (lower.includes("pendant")) return "pendant";
    if (lower.includes("bracelet")) return "bracelet";

    return "other";
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "New Arrival":
        return "#ff4d4f";
      case "Best Seller":
        return "#1890ff";
      case "Express Delivery":
        return "#52c41a";
      default:
        return "#fa606d";
    }
  };

  const currentCategory = getCategoryFromName(product.productName);

  const relatedProducts = products
    .filter(
      p =>
        getCategoryFromName(p.productName) === currentCategory &&
        p.id !== product.id
    )
    .slice(0, 10);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* IMAGE */}
        <View style={styles.imageSection}>
          <Image source={{ uri: product.productImage }} style={styles.image} />

          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={22} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => handleFavPress(product)}
          >
            <Icon name={isFav ? "heart" : "heart-outline"} size={24} color="#fa606d" />
          </TouchableOpacity>
        </View>

        {/* PRODUCT DETAILS */}
        <View style={styles.card}>

          {/* BADGE */}
          {product.productBadge && (
            <View
              style={[
                styles.pill,
                { backgroundColor: getBadgeColor(product.productBadge) + "20" }
              ]}
            >
              <Icon
                name="flash-outline"
                size={14}
                color={getBadgeColor(product.productBadge)}
              />

              <Text
                style={[
                  styles.pillText,
                  { color: getBadgeColor(product.productBadge) }
                ]}
              >
                {product.productBadge}
              </Text>
            </View>
          )}

          <Text style={styles.title}>{product.productName}</Text>

          <View style={styles.priceRow}>
            <Text style={styles.price}>{product.offerPrice}</Text>
            <Text style={styles.oldPrice}>{product.originalPrice}</Text>
          </View>

          {/* MAKING CHARGE + DISCOUNT */}
          <View style={styles.infoRow}>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}</Text>
            </View>
            <Text style={styles.charges}>{product.makingCharge}</Text>

          </View>

          <TouchableOpacity
            style={styles.websiteBtn}
            onPress={() => Linking.openURL(product["product-live-url"])}
          >
            <Text style={styles.websiteText}>View on Website</Text>
          </TouchableOpacity>

        </View>

        {/* RELATED PRODUCTS */}
        <View style={{ paddingHorizontal: 15 }}>
          <HorizontalCardList
            title="You Might Also Like"
            data={relatedProducts}
            handleFavPress={handleFavPress}
            favIds={favIds}
          />
        </View>

        <View style={{ height: 10 }} />

      </ScrollView>

      {/* ADD TO CART */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.cartBtn, isInCart && styles.removeBtn]}
          onPress={handleCart}
        >
          <Icon
            name={isInCart ? "trash-outline" : "cart-outline"}
            size={18}
            color="#fff"
          />
          <Text style={styles.cartText}>
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f4f4"
  },

  imageSection: {
    backgroundColor: "#fff",
    padding: 15
  },

  image: {
    width: "100%",
    height: 320,
    borderRadius: 12
  },

  backBtn: {
    position: "absolute",
    left: 25,
    top: 25,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 4
  },

  wishlistBtn: {
    position: "absolute",
    right: 25,
    top: 25,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 4
  },

  card: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 18
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 6
  },

  pillText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600"
  },

  title: {
    fontSize: 18,
    fontWeight: "600"
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fa606d"
  },

  oldPrice: {
    marginLeft: 8,
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#888"
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  charges: {
    color: "#666",
    fontSize: 13,
    marginLeft: 10,
  },

  discountBadge: {
    backgroundColor: "#e8f7ea",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6
  },

  discountText: {
    color: "#159d06",
    fontWeight: "600",
    fontSize: 12
  },

  websiteBtn: {
    marginTop: 14
  },

  websiteText: {
    color: "#fa606d",
    fontWeight: "600",
    fontSize: 14
  },

  bottomBar: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee"
  },

  cartBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#fa606d",
    paddingVertical: 13,
    borderRadius: 10
  },

  removeBtn: {
    backgroundColor: "#333"
  },

  cartText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15
  }

});