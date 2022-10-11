import { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import BottomTabs, { BottmIcons } from "../components/homeScreen/BottomTabs";
import Header from "../components/homeScreen/Header";
import Post from "../components/homeScreen/Post";
import Stories from "../components/homeScreen/Stories";
import { db } from "../firebase";


export default function Home({ navigation }) {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        db.collectionGroup('posts')
            .onSnapshot(snapshot => {
                setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation}></Header>
            <Stories></Stories>
            <ScrollView>
                {posts.map((post, index) => (
                    <Post post={post} key={index}></Post>
                ))}
            </ScrollView>
            <BottomTabs icons={BottmIcons}></BottomTabs>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    }
})