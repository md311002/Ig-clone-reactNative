import * as Yup from 'yup';
import { Formik } from 'formik'
import { StyleSheet, TextInput, View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import validator from 'email-validator'
import { auth, db } from '../../firebase';


export default function SignupForm({ navigation }) {
    const signUpFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An EmailAddress Is Required'),
        email: Yup.string().required().min(2, 'A username Is Required'),
        password: Yup.string().required().min(8, 'Your password must be of minimum 8 characters')
    })

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async (email, password, username) => {
        try {
            const authUser = await auth.createUserWithEmailAndPassword(email, password)
            console.log('SignUp Successfully')
            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture()
            })
        } catch (error) {
            Alert.alert(error.message)
        }
    }

    return (
        <View style={{ marginTop: 80 }}>
            <Formik
                initialValues={{ email: '', password: '', username: '' }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username)
                }}
                validationSchema={signUpFormSchema}
                validateOnMount={true}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isValid }) => (
                    <>
                        <View style={[
                            styles.inputField,
                            { borderColor: values.email.length < 1 || validator.validate(values.email) ? '#ccc' : 'red' }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Phone number,username or email '
                                autoCapitalize='none'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[
                            styles.inputField,
                            { borderColor: 1 > values.username.length || values.username.length >= 4 ? '#ccc' : 'red' }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Username'
                                autoCapitalize='none'
                                autoCorrect={false}
                                textContentType='username'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View style={[
                            styles.inputField,
                            {
                                borderColor:
                                    values.password.length < 1 || values.password.length >= 8 ? '#ccc' : 'red'
                            }
                        ]}>
                            <TextInput
                                placeholderTextColor='#444'
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>

                        <Pressable
                            titelSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>
                                Sign Up
                            </Text>
                        </Pressable>
                        <View style={styles.signUpContainer}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Text style={{ color: "#6BB0F5" }}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </Formik>
        </View>

    )
}


const styles = StyleSheet.create({
    wrapper: {
        marginTop: 80
    },
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
        marginTop: 50
    }),
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20
    },
    signUpContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})