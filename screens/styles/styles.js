import { StyleSheet } from 'react-native';

export default StyleSheet.create({

    scrollView: {
        marginTop: 100,
        marginBottom: 100,
        paddingBottom: 300
    },
    refreshButton: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
        position: 'absolute',
        top: 0,
        right: 0
    },

    modalStyle: {
        position: 'absolute',
        bottom: 350,
        alignSelf: 'center'
    },

    addToTreasuryButton: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
        position: 'absolute',
        bottom: 30,
        right: 10,
        width: 175
    },

    newDayButton: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed',
        position: 'absolute',
        bottom: 30,
        left: 10,
        width: 175
    },

    textInput: {
        marginTop: 20,
        marginBottom: 20,
        height: 50, 
        width: 300,
        borderColor: 'gray', 
        borderWidth: 1,
        alignSelf: "center",
        textAlign: "center"
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    imageContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    modalClose: {
        alignItems: 'center',
        backgroundColor: "#000",
    },

    text: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },

    image: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },

    textContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },

    
})