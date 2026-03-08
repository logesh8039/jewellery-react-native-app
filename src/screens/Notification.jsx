import { Dimensions, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { Switch } from 'react-native-paper';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { Screen } from 'react-native-screens';

const Notification = () => {
	const [toggleSwitchData, setToggleSwitchData] = React.useState([
		{ label: 'App theme', value: true },
		{ label: 'Push Notifications', value: true },
		{ label: 'Sound Effects', value: false },
		{ label: 'Vibration', value: true },
		{ label: 'Data Usage', value: false },
		{ label: 'Location Services', value: false },
	]);

	console.log("Toggle Switch Data" + toggleSwitchData);

	const toggleSwitch = (index) => {
		setToggleSwitchData((prev) =>
			prev.map((item, i) =>
				i === index ? { ...item, value: !item.value } : item
			)
		);
	};


	const ref = React.useRef(null);

	const progress = useSharedValue(0);

	const data = [...new Array(6).keys()];
	const width = Dimensions.get("window").width;

	const onPressPagination = (index) => {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		});
	};





	return (
		<ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
			<StatusBar backgroundColor={'#fff'} />
			<Text style={styles.heading}>Notification Settings</Text>

			{/* i want switch toggle will be working on off will repeated */}
			{
				toggleSwitchData.map((item, index) => (
					<View key={index} style={[styles.toggleWrapper]} >
						<Text style={styles.toggleText}>{item.label}</Text>
						<Switch onValueChange={() => toggleSwitch(index)} value={item.value} style={[styles.toggleBtn]} color='#ddb892' />
					</View>
				))
			}
			<Text style={[styles.heading, { marginTop: 10 }]}>Carousel Slider</Text>
			<View>
				<Carousel
					ref={ref}
					width={width}
					style={styles.carouselWrapper}
					height={width / 2}
					loop={true}
					autoPlayInterval={2000}
					data={data}
					onProgressChange={progress}
					renderItem={({ index }) => (
						<View style={{ flex: 1, marginRight: 40, }}>
							<View style={{ borderWidth: 1, justifyContent: "center", height: '100%', flexWrap: 'nowrap', }} >
								<Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
							</View>
							<View>
								<TouchableOpacity style={{ backgroundColor: '#6f1d1b', marginHorizontal: 'auto', marginTop: 15, borderRadius: 5 }}>
									<Text style={{ fontSize: 16, color: '#fff', paddingVertical: 5, paddingHorizontal: 15, }}>Index : {index}</Text>
								</TouchableOpacity>
							</View>

						</View>
					)}
				/>
				<Pagination.Basic
					progress={progress}
					data={data}
					dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
					containerStyle={{ gap: 5, marginTop: 10 }}
					onPress={onPressPagination}
				/>
			</View>
		</ScrollView >
	);
};

export default Notification;

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingTop: Platform.OS === "ios" ? 70 : 15,
		padding: 20,
		backgroundColor: '#fff',
	},

	heading: {
		fontSize: 20,
		fontFamily: 'PoppinsSemiBold',
		fontWeight: '600',
		marginBottom: 20,
	},
	toggleWrapper: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	toggleText: {
		fontSize: 16,
		fontFamily: 'PoppinsRegular',
	},
	toggleBtn: {
		transform: [{ scaleX: 1 }, { scaleY: 1 }]
	},
	carouselWrapper: {
		height: Platform.OS === "ios" ? 280 : 250,
		overflow: 'hidden',
		marginTop: 10,
	},

});
