import { Image, StyleSheet, Text, View } from "react-native"
import SignupForm from "../components/signUp/SignUpForm"

const INSTAGRAM_URL = "https://img.icons8.com/fluency/144/000000/instagram-new.png"

export default function SignUp({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={{ uri: INSTAGRAM_URL, height: 100, width: 100 }} />
            </View>
            <SignupForm navigation={navigation} />
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