import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Header({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity >
                <Image style={styles.iglogo} source={require('../../assets/ig-logo.png')}></Image>
            </TouchableOpacity>
            <View style={styles.iconsConatiner}>
                <TouchableOpacity onPress={() => navigation.push('AddPost')}>
                    <Image
                        style={styles.logos}
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png"
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.logos}
                        source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png" }}

                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadMessage}>
                        <Text style={styles.text}>11</Text>
                    </View>
                    <Image
                        style={styles.logos}
                        source={{ uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png" }}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20
    },
    iglogo: {
        height: 50,
        width: 100,
        resizeMode: 'contain'
    },
    logos: {
        height: 30,
        width: 30,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    iconsConatiner: {
        flexDirection: 'row'
    },
    unreadMessage: {
        backgroundColor: '#FF3250',
        position: 'absolute',
        left: 20,
        bottom: 18,
        height: 18,
        width: 25,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100
    },
    text: {
        color: 'white',
        fontWeight: '600'
    }
})