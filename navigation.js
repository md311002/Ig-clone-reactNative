import Home from './screens/Home';
import NewPost from './screens/NewPost';
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator()

export const SignInStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='HomeScreen'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='HomeScreen' component={Home} />
            <Stack.Screen name='AddPost' component={NewPost} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Signup' component={SignUp} />
        </Stack.Navigator>
    </NavigationContainer>
)

