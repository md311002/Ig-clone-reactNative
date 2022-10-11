import * as Yup from 'yup';
import { Formik } from 'formik'
import { StyleSheet, TextInput, View, Text, Pressable, TouchableOpacity, Alert } from 'react-native';
import validator from 'email-validator'
import { auth } from '../../firebase';




export default function LoginForm({ navigation }) {
    const loginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An EmailAddress Is Required'),
        password: Yup.string().required().min(8, 'Your password must be of minimum 8 characters')
    })

    const onLogin = async (email, password) => {
        try {
            await auth.signInWithEmailAndPassword(email, password)
            console.log('Login Successful')
        } catch (error) {
            Alert.alert(error.message)
        }
    }


    return (
        <View style={{ marginTop: 80 }}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
                }}
                validationSchema={loginFormSchema}
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
                        <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
                            <Text style={{ color: '#6BB0F5' }}>Forget Password?</Text>
                        </View>
                        <Pressable
                            titelSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>
                                Log In
                            </Text>
                        </Pressable>
                        <View style={styles.signUpContainer}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.push('Signup')}>
                                <Text style={{ color: "#6BB0F5" }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}

            </Formik>
        </View >

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
        borderRadius: 4
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