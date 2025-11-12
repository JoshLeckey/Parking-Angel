import React, { useRef } from 'react';
import { View, PanResponder, Animated, StyleSheet } from 'react-native';

const DraggableBar = ({ onDrag }) => {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                // Call onDrag with the current delta y (dy)
                onDrag(gestureState.dy);
            },
            onPanResponderRelease: () => {
                // Reset pan to zero without affecting the parent's height
                pan.setValue({ x: 0, y: 0 });

                // This ensures the bar returns to its original position after drag ends
                Animated.spring(pan, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: false,
                }).start();
            },
        })
    ).current;

    return (
        <Animated.View
            style={[styles.draggableBar, {
                // If applying translation for visual feedback, enable this:
                 transform: [{ translateY: pan.y }]
            }]}
            {...panResponder.panHandlers}
        >
            {/* Render draggable icon or content here */}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    draggableBar: {
        height: 30,
        backgroundColor: 'gray',
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DraggableBar;
