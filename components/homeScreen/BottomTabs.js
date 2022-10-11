import { useState, useEffect } from "react"
import { StyleSheet } from "react-native";
import { View, TouchableOpacity, Image } from "react-native"
import { Divider } from "react-native-elements";
import { auth, db } from "../../firebase";

export const BottmIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        nonActive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png'
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        nonActive: 'https://img.icons8.com/ios/500/ffffff/search--v1.png'
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        nonActive: 'https://img.icons8.com/ios/500/ffffff/instagram-reel.png'
    },
    {
        name: 'Shopping',
        active: 'https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png',
        nonActive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag.png',
    },
    {
        name: 'Profile',
        active: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
        nonActive: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=800',
    }

]

const handleSignOut = async () => {
    try {
        await auth.signOut()
        console.log('SignOut Successfully')
    } catch (error) {
        console.log(error.message)
    }
}

export default function BottomTabs({ icons }) {
    const [activeTab, setActiveTab] = useState('Home');
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({ username: '', profilePicture: '' });

    const getUserName = () => {
        const user = auth.currentUser
        const unsubcribe = db.collection('users').where('owner_uid', '==', user.uid).limit(1)
            .onSnapshot(snapshot => snapshot.docs.map(doc => {
                setCurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            }))
        return unsubcribe
    }
    useEffect(() => {
        getUserName()
    }, [])

    const Icon = ({ icon }) => (
        <TouchableOpacity onPress={() => icon.name === 'Profile' ? handleSignOut() : setActiveTab(icon.name)}>
            <Image source={{ uri: icon.name !== 'Profile' ? (activeTab === icon.name ? icon.active : icon.nonActive) : currentLoggedInUser.profilePicture }} style={[styles.icon, icon.name === 'Profile' ? styles.profile : null]} />
        </TouchableOpacity>
    )
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical'></Divider>
            <View style={styles.container}>
                {
                    icons.map((icon, index) => (
                        <Icon icon={icon} key={index}></Icon>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        bottom: '3%',
        backgroundColor: '#000',
        zIndex: 999
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        height: 50
    },
    icon: {
        width: 30,
        height: 30,
    },
    profile: {
        borderRadius: 50,
        borderColor: '#fff'
    }
})