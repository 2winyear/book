import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

function TodoItem({id, text, done, onToggle, onRemove}) {
    const save = async () => {
        try {
            await AsyncStorage.setItem('key', 'value');
        } catch (e) {
            // 오류 예외 처리
        }
    }
    const load = async () => {
        try{
            const value = await AsyncStorage.getItem('key');
        } catch(e) {
            
        }
    }
    const remove = () => {
        Alert.alert(
            '삭제',
            '정말로 삭제하시겠어요?',
            [
                {text: '취소', onPress: () => {}, style:'cancel'},
                {
                    text: '삭제',
                    onPress: () => {
                    onRemove(id);
                },
                style: 'destructive',
            },
            ],
            {
                cancelable: true,
                onDismiss: () => {},
            },
        );
    };
    return (
        <View style = {styles.item} >
            <TouchableOpacity onPress={() => onToggle(id)}>
                <View style={[styles.circle, done && styles.filled]}>
                    {done && (
                        <Image source={require('../images/check_white.png')} />
                    )}
                </View>
            </TouchableOpacity>
            <Text style={[styles.text, done && styles.lineThrough]}>{text}</Text>
            {done ? (<TouchableOpacity onPress={remove}><Icon name="delete" size={32} color="red"/></TouchableOpacity>) : (<View style={styles.removePlaceholder} /> )}
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        padding: 16,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderColor: '#26a69a',
        borderWidth: 1,
        marginRight: 16,
    },
    filled: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#26a69a',
    },
    lineThrough: {
        color: '#9e9e9e',
        textDecorationLine: 'line-through',
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: '#212121'
    },
    removePlaceholder: {
        width: 32,
        height: 32,
    },
});

export default TodoItem;