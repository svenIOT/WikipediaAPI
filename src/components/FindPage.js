import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';



const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

const FindPage = ({ navigation, route }) => {
    const [selectedId, setSelectedId] = useState(null);

    const renderItem = ({ item }) => {
        const backgroundColor = item.pageid === selectedId ? "#7130ff" : "#a982ff";

        return (
            <Item
                item={item}
                onPress={() => {
                    setSelectedId(item.pageid);
                    navigation.navigate('details', {id: item.pageid});
                }}
                style={{ backgroundColor }}
            />
        );
    };

    const [isLoading, setLoading] = useState(true);
    const [DATA, setData] = useState([]);
    useEffect(() => {
        fetch('https://en.wikipedia.org/w/api.php?action=query&titles=' + route.params.text + '&format=json&formatversion=2')
            .then((response) => response.json())
            .then((json) => setData(json.query.pages))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SafeAreaView style={styles.body}>
            <View style={{ paddingRight: 50, paddingLeft: 50, paddingBottom: 10 }}>
            </View>
            <Animatable.View animation="zoomIn" style={styles.listContainer} delay={200.0}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.pageid}
                />
            </Animatable.View>
        </SafeAreaView>
    );
}

export default FindPage;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#bfbfbf'
    },
    item: {
        backgroundColor: '#c7cfff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    title: {
        fontSize: 32,
    },

});
