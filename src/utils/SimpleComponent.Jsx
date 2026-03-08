import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SimpleComponent = () => {
    const [show, setShow] = useState(true);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
                title={show ? 'Hide Component' : 'Show Component'}
                onPress={() => setShow(!show)}
            />
            {show && <LifeCycleMethod />}
        </View>
    );
}

export default SimpleComponent;

const styles = StyleSheet.create({})
