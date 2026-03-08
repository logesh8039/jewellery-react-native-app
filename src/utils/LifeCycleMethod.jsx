import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class LifeCycleMethod extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        console.log('Constructor Called');
    }

    componentDidMount() {
        console.log('ComponentDidMount - Component Mounted');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('ComponentDidUpdate - Component Updated');
    }

    componentWillUnmount() {
        console.log('ComponentWillUnmount - Component Unmounted');
    }

    render() {
        console.log('🎨 Render Method');
        return (
            <View style={styles.container}>
                <Text style={styles.title}>React Native Lifecycle (Class)</Text>
                <Text style={styles.count}>Count: {this.state.count}</Text>

                <Text
                    style={styles.increment}
                    onPress={() => this.setState({ count: this.state.count + 1 })}
                >
                    + Increment
                </Text>

                <Text
                    style={styles.decrement}
                    onPress={() => this.setState({ count: this.state.count - 1 })}
                >
                    - Decrement
                </Text>

                <Text
                    style={styles.unmount}
                    onPress={this.props.onUnmount}
                >
                    unmount Component
                </Text>
            </View>
        );
    }
}

// Wrapper Component to mount/unmount
export default class App extends Component {
    state = { show: true };

    toggleComponent = () => {
        this.setState({ show: !this.state.show });
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.show ? (
                    <LifeCycleMethod onUnmount={this.toggleComponent} />
                ) : (
                    <View style={styles.container}>
                        <Text>Component Unmounted</Text>
                        <Text style={styles.mount} onPress={this.toggleComponent}>
                            Mount Component
                        </Text>
                    </View>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 22, marginBottom: 10, fontWeight: 'bold' },
    count: { fontSize: 20, marginVertical: 10 },
    increment: { color: 'green', fontSize: 18, marginVertical: 5 },
    decrement: { color: 'red', fontSize: 18, marginVertical: 5 },
    unmount: { color: 'orange', fontSize: 18, marginVertical: 5 },
    mount: { color: 'blue', fontSize: 18, marginVertical: 5 },
});
