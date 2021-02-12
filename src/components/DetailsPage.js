import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, useWindowDimensions  } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import HTML from "react-native-render-html";

const DetailsPage = ({route}) => {
    const [isLoading, setLoading] = useState(true);
    const [DATA, setData] = useState();
    useEffect( () => {
        fetch('https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&pageids=' + route.params.id + '&formatversion=2')
            .then((response) => response.json())
            .then((json) => {
                setData(json.query.pages[0].extract);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    });
    const contentWidth = useWindowDimensions().width;
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Animatable.View animation="zoomInDown" delay={200.0}>
                {isLoading ? <Text style={{fontSize: 15, fontWeight: 'bold'}}>Cargando...</Text> : (
                    <HTML source={{ html: DATA }} contentWidth={contentWidth} />
                    )}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
        
    );
}

export default DetailsPage;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        height: '100%',
        backgroundColor: '#bfbfbf'
    },
    response: {
        fontSize: 15
    }
});
