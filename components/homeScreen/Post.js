import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Divider, Icon } from "react-native-elements";
import { firebase, auth, db } from "../../firebase";

const postFooterIcons = [
    {
        name: 'Like',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedImageUrl: "https://img.icons8.com/fluency/48/ffffff/filled-like.png"
    },
    {
        name: 'Comment',
        imageUrl: 'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble.png'
    },
    {
        name: 'Share',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/sent.png'
    },
    {
        name: 'Save',
        imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon.png'
    }
]

export default function Post({ post }) {
    const handleLike = (post) => {
        const currentLikeStatus = !post.liked_by_users.includes(
            auth.currentUser.email
        )
        db.collection('users')
            .doc(post.owner_email)
            .collection('posts')
            .doc(post.id)
            .update({
                liked_by_users: currentLikeStatus ?
                    firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email) :
                    firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => console.log('Successfully Liked'))
            .catch((errors) => console.log(errors))
    }

    return (
        <View>
            <Divider width={1} orientation='vertical'></Divider>
            <Header post={post}></Header>
            <PostImg post={post}></PostImg>
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <Footer post={post} handleLike={handleLike}></Footer>
                <Likes post={post}></Likes>
                <Caption post={post}></Caption>
                <CommentSection post={post}></CommentSection>
                <Comments post={post}></Comments>
            </View>
        </View>
    )
}

function Comments({ post }) {
    return (
        <>
            {post.comments.map((comment, index) => (
                <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ color: 'white' }}>
                        <Text style={{ fontWeight: '600' }}>{comment.user} </Text>
                        {comment.comment}
                    </Text>
                </View>
            ))}
        </>
    )
}

function CommentSection({ post }) {
    return (
        <View style={{ marginTop: 5 }}>
            {!!post.comments.length && (<Text style={{ color: 'gray' }}>
                View {post.comments.length > 1 ? 'all' : ''} {post.comments.length} {post.comments.length > 1 ? 'comments' : 'comment'}
            </Text>)}
        </View>
    )
}

function Caption({ post }) {
    return (
        <View style={{ marginTop: 5 }}>
            <Text style={{ color: 'white', }}>
                <Text style={{ fontWeight: '600' }}>{post.user} </Text>
                <Text>{post.caption}</Text>
            </Text>
        </View>
    )
}

function Likes({ post }) {
    return (
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
            <Text style={{ color: 'white', fontWeight: '600' }}>
                {post.liked_by_users.length.toLocaleString('en')} likes
            </Text>
        </View>
    )
}

function Footer({ handleLike, post }) {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.leftFooterIcons}>
                <TouchableOpacity onPress={() => handleLike(post)}>
                    <Image
                        style={styles.footerIcon}
                        source={{
                            uri: post.liked_by_users.includes(auth.currentUser.email) ?
                                postFooterIcons[0].likedImageUrl :
                                postFooterIcons[0].imageUrl
                        }}
                    />
                </TouchableOpacity>
                <Image style={styles.footerIcon} source={{ uri: postFooterIcons[1].imageUrl }}></Image>
                <Image style={[styles.footerIcon, styles.shareIcon]} source={{ uri: postFooterIcons[2].imageUrl }}></Image>
            </View>
            <View>
                <Image style={styles.footerIcon} source={{ uri: postFooterIcons[3].imageUrl }}></Image>
            </View>
        </View>
    )
}

function Header({ post }) {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.container}>
                <Image style={styles.storyImg} source={{ uri: post.profile_picture }} />
                <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>{post.user}</Text>
            </View>
            <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
        </View>
    )
}

function PostImg({ post }) {
    return (
        <View style={{ width: '100%', height: 450 }}>
            <Image
                source={{ uri: post.imageUrl }}
                style={{ height: '100%', resizeMode: 'cover' }}
            ></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    storyImg: {
        width: 35,
        height: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        alignItems: 'center'
    },
    footerIcon: {
        width: 33,
        height: 33
    },
    leftFooterIcons: {
        flexDirection: 'row',
        width: '32%',
        justifyContent: 'space-between'
    },
    shareIcon: {
        transform: [{ rotate: '320deg' }],
        marginTop: -3
    }
})