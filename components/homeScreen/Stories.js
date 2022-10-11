import { useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { USERS } from "../../data/users";

export default function Stories() {

    return (
        <View style={{ marginBottom: 13 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {USERS.map((user, index) => (

                    <View key={index} style={styles.container}>
                        <Image
                            style={styles.storyImg}
                            source={{ uri: user.img }}
                        />
                        <Text style={{ color: 'white' }}>{
                            user.userName.length > 11
                                ? user.userName.slice(0, 8).toLowerCase() + '...'
                                : user.userName.toLowerCase()}
                        </Text>

                    </View>
                ))}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    storyImg: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 18,
        borderWidth: 3,
        borderColor: '#ff8501'
    }
})