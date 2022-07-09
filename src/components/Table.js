import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';

export class Table extends Component {
    static propTypes = {
        style: PropTypes.object,
        borderStyle: PropTypes.object
    };

    _renderChildren(props) {
        return React.Children.map(props.children, child =>
            React.cloneElement(
                child,
                props.borderStyle && child.type.displayName !== 'ScrollView' ? { borderStyle: props.borderStyle } : {}
            )
        );
    }

    render() {
        const { borderStyle } = this.props;
        const borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
        const borderBottomWidth = borderLeftWidth;
        const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

        return (
            <View
                style={[
                    this.props.style,
                    styles.table,
                    {
                        borderLeftWidth,
                        borderBottomWidth,
                        borderColor
                    }
                ]}
            >
                {this._renderChildren(this.props)}
            </View>
        );
    }
}

export class TableWrapper extends Component {
    static propTypes = {
        style: PropTypes.object
    };

    _renderChildren(props) {
        return React.Children.map(props.children, child =>
            React.cloneElement(child, props.borderStyle ? { borderStyle: props.borderStyle } : {})
        );
    }

    render() {
        const { style } = this.props;
        return <View style={style}>{this._renderChildren(this.props)}</View>;
    }
}

const styles = StyleSheet.create({
    table: {
        backgroundColor: '#FCF9F9',
        maxWidth:Dimensions.get('window').width,
        width: 375,
        height: 360,
        maxHeight: 360,
        fontSize: 14,
        marginTop: 10,
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
    },
});
