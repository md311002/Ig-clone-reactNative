import { SafeAreaView } from "react-native";
import AddNewPost from "../components/addPost/AddNewPost";
import FormikPostUploader from "../components/addPost/FormikPostUploader";

export default function NewPost({ navigation }) {
    return (
        <SafeAreaView style={{ backgroundColor: 'black', flex: 1 }}>
            <AddNewPost navigation={navigation}></AddNewPost>
            <FormikPostUploader navigation={navigation}></FormikPostUploader>
        </SafeAreaView>
    )
}