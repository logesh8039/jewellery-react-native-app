import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";

const FILTER_TABS = ["Sort", "Price", "Category", "Highlights"];

const ProductFilterModal = ({
    visible,
    onClose,
    tempSort,
    setTempSort,
    tempPrice,
    setTempPrice,
    tempCategory,
    setTempCategory,
    tempBadge,
    setTempBadge,
    onApply
}) => {

    const [activeTab, setActiveTab] = useState("Sort");

    useEffect(() => {
        if (visible) {
            setActiveTab("Sort");
        }
    }, [visible]);

    const Radio = ({ selected }) => (
        <Icon
            name={selected ? "radio-button-on" : "radio-button-off"}
            size={20}
            color="#000"
        />
    );

    /* SORT */

    const renderSortOptions = () => (
        <>
            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempSort("LOW_HIGH")}
            >
                <Text>Price Low → High</Text>
                <Radio selected={tempSort === "LOW_HIGH"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempSort("HIGH_LOW")}
            >
                <Text>Price High → Low</Text>
                <Radio selected={tempSort === "HIGH_LOW"} />
            </TouchableOpacity>
        </>
    );

    /* PRICE */

    const renderPriceOptions = () => (
        <>
            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempPrice("UNDER_200K")}
            >
                <Text>Under ₹2L</Text>
                <Radio selected={tempPrice === "UNDER_200K"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempPrice("ABOVE_200K")}
            >
                <Text>Above ₹2L</Text>
                <Radio selected={tempPrice === "ABOVE_200K"} />
            </TouchableOpacity>
        </>
    );

    /* CATEGORY */

    const renderCategoryOptions = () => (
        <>
            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempCategory("Bangle")}
            >
                <Text>Bangle</Text>
                <Radio selected={tempCategory === "Bangle"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempCategory("Necklace")}
            >
                <Text>Necklace</Text>
                <Radio selected={tempCategory === "Necklace"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempCategory("Ring")}
            >
                <Text>Ring</Text>
                <Radio selected={tempCategory === "Ring"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempCategory("Earrings")}
            >
                <Text>Earrings</Text>
                <Radio selected={tempCategory === "Earrings"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempCategory("Bracelet")}
            >
                <Text>Bracelet</Text>
                <Radio selected={tempCategory === "Bracelet"} />
            </TouchableOpacity>
        </>
    );

    /* BADGE */

    const renderBadgeOptions = () => (
        <>
            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempBadge("New Arrival")}
            >
                <Text>New Arrival</Text>
                <Radio selected={tempBadge === "New Arrival"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempBadge("Best Seller")}
            >
                <Text>Best Seller</Text>
                <Radio selected={tempBadge === "Best Seller"} />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.optionRow}
                onPress={() => setTempBadge("Express Delivery")}
            >
                <Text>Express Delivery</Text>
                <Radio selected={tempBadge === "Express Delivery"} />
            </TouchableOpacity>
        </>
    );

    const renderOptions = () => {
        if (activeTab === "Sort") return renderSortOptions();
        if (activeTab === "Price") return renderPriceOptions();
        if (activeTab === "Category") return renderCategoryOptions();
        if (activeTab === "Highlights") return renderBadgeOptions();
    };

    return (
        <Modal visible={visible} transparent animationType="slide">

            <TouchableOpacity
                style={styles.overlay}
                onPress={onClose}
                activeOpacity={1}
            >
                <TouchableOpacity activeOpacity={1} style={styles.panel}>

                    <View style={styles.container}>

                        {/* LEFT FILTER TABS */}

                        <View style={styles.leftPanel}>

                            {FILTER_TABS.map(tab => (
                                <TouchableOpacity
                                    key={tab}
                                    style={[
                                        styles.tab,
                                        activeTab === tab && styles.activeTab
                                    ]}
                                    onPress={() => setActiveTab(tab)}
                                >
                                    <Text
                                        style={[
                                            styles.tabText,
                                            activeTab === tab && styles.activeTabText
                                        ]}
                                    >
                                        {tab}
                                    </Text>
                                </TouchableOpacity>
                            ))}

                        </View>

                        {/* RIGHT OPTIONS */}

                        <View style={styles.rightPanel}>
                            {renderOptions()}
                        </View>

                    </View>

                    {/* FOOTER */}

                    <View style={styles.footer}>

                        <TouchableOpacity
                            style={styles.resetBtn}
                            onPress={() => {
                                setTempSort(null);
                                setTempPrice(null);
                                setTempCategory(null);
                                setTempBadge(null);
                            }}
                        >
                            <Text>Reset</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.applyBtn}
                            onPress={onApply}
                        >
                            <Text style={{ color: "#fff" }}>Apply</Text>
                        </TouchableOpacity>

                    </View>

                </TouchableOpacity>
            </TouchableOpacity>

        </Modal>
    );
};

export default ProductFilterModal;

const styles = StyleSheet.create({

    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.6)"
    },

    panel: {
        height: "50%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },

    container: {
        flex: 1,
        flexDirection: "row"
    },

    leftPanel: {
        width: 120,
        backgroundColor: "#f4f4f4"
    },

    tab: {
        padding: 16
    },

    activeTab: {
        backgroundColor: "#fff"
    },

    tabText: {
        color: "#666"
    },

    activeTabText: {
        fontWeight: "bold",
        color: "#000"
    },

    rightPanel: {
        flex: 1,
        padding: 16
    },

    optionRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 14,
        borderBottomWidth: 0.5,
        borderColor: "#eee"
    },

    footer: {
        flexDirection: "row",
        padding: 15,
        borderTopWidth: 1,
        borderColor: "#eee"
    },

    resetBtn: {
        flex: 1,
        alignItems: "center",
        padding: 12,
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 8,
        marginRight: 10
    },

    applyBtn: {
        flex: 1,
        alignItems: "center",
        padding: 12,
        backgroundColor: "#000",
        borderRadius: 8
    }

});