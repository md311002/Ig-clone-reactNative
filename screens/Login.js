import { Image, StyleSheet, Text, View } from "react-native"
import LoginForm from "../components/loginScreen/LoginForm"

const INSTAGRAM_URL = "https://img.icons8.com/fluency/144/000000/instagram-new.png"

export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: INSTAGRAM_URL, height: 100, width: 100 }} />
            </View>
            <LoginForm navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12
    },
    logoContainer: {
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})