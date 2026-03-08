import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../../redux/slices/cartSlice";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const getPrice = (price) =>
    parseInt(price.replace(/[^0-9]/g, ""));

  const totalPrice = cartItems.reduce((total, item) => {
    return total + getPrice(item.offerPrice) * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.empty}>
        <Icon name="cart-outline" size={70} color="#ccc" />
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptySub}>Add products to start shopping</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* HEADER */}
      <Text style={styles.header}>My Cart</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image source={{ uri: item.productImage }} style={styles.image} />

            <View style={styles.details}>

              <Text numberOfLines={2} style={styles.name}>
                {item.productName}
              </Text>

              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.offerPrice}</Text>
                <Text style={styles.originalPrice}>{item.originalPrice}</Text>
              </View>

              <View style={styles.discountRow}>
                <Text style={styles.discount}>{item.discount}</Text>
                <Text style={styles.makingCharge}>{item.makingCharge}</Text>
              </View>

              {/* Quantity */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => dispatch(decreaseQty(item.id))}
                >
                  <Icon name="remove" size={16} />
                </TouchableOpacity>

                <Text style={styles.qty}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyBtn}
                  onPress={() => dispatch(increaseQty(item.id))}
                >
                  <Icon name="add" size={16} />
                </TouchableOpacity>
              </View>

            </View>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => dispatch(removeFromCart(item.id))}
            >
              <Icon name="trash-outline" size={22} color="#fa606d" />
            </TouchableOpacity>

          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalPrice}>
            ₹{totalPrice.toLocaleString()}
          </Text>
        </View>

        <TouchableOpacity style={styles.checkoutBtn}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },

  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },

  emptySub: {
    color: "#777",
    marginTop: 4,
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    alignItems: "stretch",
  },

  image: {
    width: 100,
    borderRadius: 10,
    alignSelf: "stretch",
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

  price: {
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

  makingCharge: {
    fontSize: 12,
    color: "#777",
  },

  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  qtyBtn: {
    width: 30,
    height: 30,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  qty: {
    marginHorizontal: 10,
    fontWeight: "bold",
    fontSize: 14,
  },

  deleteBtn: {
    justifyContent: "center",
    paddingLeft: 6,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },

  totalLabel: {
    fontSize: 12,
    color: "#777",
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: "bold",
  },

  checkoutBtn: {
    backgroundColor: "#fa606d",
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 8,
  },

  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },

});