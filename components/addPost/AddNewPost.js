import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "react-native";

export default function AddNewPost({ navigation }) {
    return (
        <View style={styles.container}>
            <Header navigation={navigation}></Header>
        </View>
    )
}

function Header({ navigation }) {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={{ uri: 'https://img.icons8.com/ios-glyphs/90/ffffff/back.png' }}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 23
    }
})