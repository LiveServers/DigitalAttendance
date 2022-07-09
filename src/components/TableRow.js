import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Cell } from './TableCell';
import { sum } from '../utils';

export class Row extends Component {
  static propTypes = {
      style: PropTypes.object,
      textStyle: PropTypes.object
  };

  render() {
    const { data, style, widthArr, height, flexArr, textStyle,size,firstRow,checkDates ,...props } =
      this.props;

    const width = widthArr ? sum(widthArr) : 0;
    const remainingLen = data && !firstRow ? 7-(data.length) : 0;

    return data ? (
      <View
        style={[height && { height }, width && { width }, styles.row, style]}
      >
        {
          size && size.map((item,index)=> {
            const flex = flexArr && flexArr[index];
            const wth = widthArr && widthArr[index];
            return(
            <Cell
                key={index}
                index={index}
                data={<></>}
                width={50}
                height={50}
                flex={flex}
                checkDates={checkDates}
                textStyle={textStyle}
                {...props}
            />
            )
          })
        }
        {
          !firstRow && data.length === 7 ? data.map((item, i) => {
            const flex = flexArr && flexArr[i];
            const wth = widthArr && widthArr[i];
            return (
                <Cell
                    key={i}
                    index={i}
                    data={item}
                    checkDates={checkDates}
                    width={50}
                    height={50}
                    flex={flex}
                    textStyle={textStyle}
                    {...props}
                />
            );
          }):(
              <>
                {
                  data.map((item, i) => {
                    const flex = flexArr && flexArr[i];
                    const wth = widthArr && widthArr[i];
                    return (
                        <Cell
                            key={i}
                            index={i}
                            data={item}
                            width={50}
                            checkDates={checkDates}
                            height={50}
                            flex={flex}
                            textStyle={textStyle}
                            {...props}
                        />
                    );
                  })
                }
                {
                  Array.from(Array(remainingLen).keys()).map((item,index)=>{
                    const flex = flexArr && flexArr[index];
                    const wth = widthArr && widthArr[index];
                    return(
                        <Cell
                            key={index}
                            index={index}
                            data={<></>}
                            width={50}
                            checkDates={checkDates}
                            height={50}
                            flex={flex}
                            textStyle={textStyle}
                            {...props}
                        />
                    )
                  })
                }
              </>
          )
        }
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
