import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export class Cell extends Component {
    static propTypes = {
        style: PropTypes.object,
        textStyle: PropTypes.object,
        borderStyle: PropTypes.object
    };

    render() {
        const { data, width, height, flex, style, textStyle, borderStyle,checkDates,index, ...props } = this.props;
        const textDom = React.isValidElement(data) ? (
            data
        ) : (
            <Text style={[textStyle, styles.text]} {...props}>
                {data}
            </Text>
        );
        const borderTopWidth = (borderStyle && borderStyle.borderWidth) || 0;
        const borderRightWidth = borderTopWidth;
        const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

        return (
            <View
                style={[
                    {
                        borderTopWidth,
                        borderRightWidth,
                        borderColor,
                    },
                    styles.cell,
                    data && checkDates(data) && styles.active,
                    width && { width },
                    height && { height },
                    flex && { flex },
                    !width && !flex && !height && !style && { flex: 1 },
                    style,
                    index === 0 && styles.margin,
                ]}
            >
                {textDom}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cell: { justifyContent: 'center',margin:1, },
    text: { backgroundColor: 'transparent',color:'black' },
    active:{
        backgroundColor: '#955A7A',
        color: '#fff'
    },
    margin: {
        marginLeft: 14,
    },
});
