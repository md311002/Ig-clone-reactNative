import * as Yup from 'yup';
import { Formik } from 'formik'
import { useEffect, useState } from 'react';
import { Image, TextInput, View, Text, Button } from 'react-native';
import { Divider } from 'react-native-elements';
import validUrl from 'valid-url'
import { firebase, auth, db } from '../../firebase';

const PLACEHOLDER = 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814051_1280.png'

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL Is Required'),
    caption: Yup.string().max(2200, 'Caption has reached its max length')
})

export default function FormikPostUploader({ navigation }) {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState({ profilePicture: '', username: '' });

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

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe =
            db.collection('users')
                .doc(auth.currentUser.email)
                .collection('posts')
                .add({
                    imageUrl: imageUrl,
                    caption: caption,
                    user: currentLoggedInUser.username,
                    profile_picture: currentLoggedInUser.profilePicture,
                    owner_email: auth.currentUser.email,
                    owner_uid: auth.currentUser.uid,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    liked_by_users: [],
                    comments: []
                })
                .then(() => navigation.goBack())
                .catch(errors => console.log(errors))
        return unsubscribe
    }
    return (
        <Formik
            initialValues={{ caption: '', imageUrl: '' }}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }}
            validationSchema={uploadPostSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <>
                    <View style={{
                        margin: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Image
                            source={{ uri: validUrl.isUri(thumbnailUrl) ? thumbnailUrl : PLACEHOLDER }}
                            style={{ width: 100, height: 100 }}
                        />
                        <View style={{ marginLeft: 12, flex: 1 }}>
                            <TextInput
                                style={{ color: 'white', fontSize: 20 }}
                                placeholder='Write a caption...'
                                placeholderTextColor='gray'
                                multiline={true}
                                onChangeText={handleChange('caption')}
                                value={values.caption}
                                onBlur={handleBlur('caption')}
                            />
                        </View>
                    </View>
                    <Divider width={0.2} orientation='vertical' />
                    <TextInput
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: 'white', fontSize: 18 }}
                        placeholder='Enter Image Url'
                        placeholderTextColor='gray'
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: 'red' }}>{errors.imageUrl}</Text>
                    )}
                    <Button onPress={handleSubmit} title='Share' disabled={!isValid}></Button>
                </>)}

        </Formik>
    )
}