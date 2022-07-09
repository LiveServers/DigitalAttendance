import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { Table } from './Table';
// eslint-disable-next-line import/named
import { Row } from './TableRow';

const styles = StyleSheet.create({
  topView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  txt: {
    fontSize: 18,
    color: '#005248',
    marginLeft: 12,
  },
  iconView: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  icon: {
    color: '#005248',
  },
});

/**
 * 0 - Sunday
 * --> the rest increment by one
 * 6 - Saturday
 *
 *
 * --> the longest month has a total of 6 weeks approximately
 */

const calculateNoOfDaysInAMonth = (year, monthIndex) => {
  return new Date(year, monthIndex, 0).getDate();
};
const calculateDayMonthStarts = (year, monthIndex) => {
  let month;
  if (monthIndex.toString().split('').length >= 2) {
    month = monthIndex;
  } else {
    month = `0${monthIndex}`;
  }
  const dateString = `${year}-${month}-01`;
  const dayMonthStarts = new Date(dateString).getDay();
  const dateMonthStarts = new Date(dateString).getDate();
  return [dayMonthStarts, dateMonthStarts];
};

const getCurrentDayOfWeek = (year, monthIndex) => {
  const daysInMonth = calculateNoOfDaysInAMonth(year, monthIndex);
  const weekMap = new Map();

  /**
   * we usually  have a maximum of 6 weeks every month,therefore
   * I've realized that instead of representing the calender using dates, we should use weeks instead
   *
   */
  const weekOne = [];
  const weekTwo = [];
  const weekThree = [];
  const weekFour = [];
  const weekFive = [];
  const weekSix = [];
  const [dayMonthStarts, dateMonthStarts] = calculateDayMonthStarts(
    year,
    monthIndex
  );
  const maxDaysInAWeek = 6;
  const remainingDaysOfTheWeek = maxDaysInAWeek - dayMonthStarts;
  const lastDayOfWeekOne = dateMonthStarts + remainingDaysOfTheWeek;
  const lastDayOfWeekTwo = lastDayOfWeekOne + 7;
  const lastDayOfWeekThree = lastDayOfWeekTwo + 7;
  const lastDayOfWeekFour = lastDayOfWeekThree + 7;
  const lastDayOfWeekFive = lastDayOfWeekFour + 7;
  const lastDayOfWeekSix = lastDayOfWeekFive + 7;

  let one = dateMonthStarts;
  let two = lastDayOfWeekOne + 1;
  let three = lastDayOfWeekTwo + 1;
  let four = lastDayOfWeekThree + 1;
  let five = lastDayOfWeekFour + 1;
  let six = lastDayOfWeekFive + 1;

  while (one <= lastDayOfWeekOne) {
    weekOne.push(one);
    weekMap.set(0, weekOne);
    one++;
  }
  while (two <= lastDayOfWeekTwo) {
    weekTwo.push(two);
    weekMap.set(1, weekTwo);
    two++;
  }
  while (three <= lastDayOfWeekThree) {
    weekThree.push(three);
    weekMap.set(2, weekThree);
    three++;
  }
  while (four <= lastDayOfWeekFour) {
    weekFour.push(four);
    weekMap.set(3, weekFour);
    four++;
  }
  if (lastDayOfWeekFive > daysInMonth) {
    while (five <= daysInMonth - five + five) {
      weekFive.push(five);
      weekMap.set(4, weekFive);
      five++;
    }
  } else {
    while (five <= lastDayOfWeekFive) {
      weekFive.push(five);
      weekMap.set(4, weekFive);
      five++;
    }
  }
  if (lastDayOfWeekSix > daysInMonth) {
    while (six <= daysInMonth - six + six) {
      weekSix.push(six);
      weekMap.set(5, weekSix);
      six++;
    }
  } else {
    while (six <= lastDayOfWeekSix) {
      weekSix.push(six);
      weekMap.set(5, weekSix);
      six++;
    }
  }

  return weekMap;
};

const MapDaysToWeeks = ({ checkDates, year, monthIndex }) => {
  const weekMap = getCurrentDayOfWeek(year, monthIndex);
  const dayMap = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return (
    <Table>
      <Row
        checkDates={checkDates}
        flexArr={[1, 1, 1, 1, 1, 1, 1]}
        data={dayMap}
      />
      <FirstTR
        checkDates={checkDates}
        weekMap={weekMap}
        year={year}
        monthIndex={monthIndex}
      />
      <Row
        checkDates={checkDates}
        flexArr={[1, 1, 1, 1, 1, 1, 1]}
        data={weekMap.get(1)}
      />
      <Row
        checkDates={checkDates}
        flexArr={[1, 1, 1, 1, 1, 1, 1]}
        data={weekMap.get(2)}
      />
      <Row
        checkDates={checkDates}
        flexArr={[1, 1, 1, 1, 1, 1, 1]}
        data={weekMap.get(3)}
      />
      <Row
        checkDates={checkDates}
        flexArr={[1, 1, 1, 1, 1, 1, 1]}
        data={weekMap.get(4)}
      />
      <Row
        checkDates={checkDates}
        flexArr={[1, 1, 1, 1, 1, 1, 1]}
        data={weekMap.get(5)}
      />
    </Table>
  );
};

MapDaysToWeeks.propTypes = {
  checkDates: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  monthIndex: PropTypes.number.isRequired,
};

// eslint-disable-next-line no-unused-vars
const FirstTR = ({ checkDates, weekMap, year, monthIndex }) => {
  const [day] = calculateDayMonthStarts(year, monthIndex);
  function size(range) {
    return {
      1: (
        <Row
          firstRow
          checkDates={checkDates}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
          data={weekMap.get(0)}
          size={[1]}
        />
      ),
      2: (
        <Row
          firstRow
          checkDates={checkDates}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
          data={weekMap.get(0)}
          size={[1, 2]}
        />
      ),
      3: (
        <Row
          firstRow
          checkDates={checkDates}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
          data={weekMap.get(0)}
          size={[1, 2, 3]}
        />
      ),
      4: (
        <Row
          firstRow
          checkDates={checkDates}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
          data={weekMap.get(0)}
          size={[1, 2, 3, 4]}
        />
      ),
      5: (
        <Row
          firstRow
          checkDates={checkDates}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
          data={weekMap.get(0)}
          size={[1, 2, 3, 4, 5]}
        />
      ),
      6: (
        <Row
          firstRow
          checkDates={checkDates}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
          data={weekMap.get(0)}
          size={[1, 2, 3, 4, 5, 6]}
        />
      ),
    }[range];
  }
  return (
    <>
      {Array.isArray(weekMap.get(0)) && weekMap.get(0).length === 7 ? (
        <Row
          checkDates={checkDates}
          data={weekMap.get(0)}
          flexArr={[1, 1, 1, 1, 1, 1, 1]}
        />
      ) : (
        size(day)
      )}
    </>
  );
};

FirstTR.propTypes = {
  checkDates: PropTypes.func.isRequired,
  weekMap: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
  monthIndex: PropTypes.number.isRequired,
};

const Calender = () => {
  // we need to start keeping track of the year,month and dates using useState
  /**
   * 1-January
   * 12-December
   */

  const [monthIndex, setMonthIndex] = React.useState(new Date().getMonth() + 1);
  const [year, setYear] = React.useState(new Date().getFullYear());
  /**
   *
   * @test
   * let us create a dummy array of dates that we will map to the ui
   */
  const dummyDates = new Map([
    [
      0,
      [
        '2021-01-04',
        '2022-01-13',
        '2021-11-15',
        '2021-09-01',
        '2021-02-02',
        '2021-06-10',
        '2022-02-20',
        '2022-05-30',
        '2021-07-21',
        '2022-08-08',
        '2021-12-29',
        '2022-09-14',
        '2022-03-12',
        '2021-03-26',
        '2021-12-28',
        '2021-10-18',
        '2021-08-16',
        '2021-05-30',
        '2021-04-20',
        '2021-03-05',
      ],
    ],
  ]);

  const checkDates = React.useCallback(
    (item) => {
      let active = false;
      dummyDates.get(0).forEach((date) => {
        if (
          new Date(date).getDate() === item &&
          new Date(date).getFullYear() === year &&
          new Date(date).getMonth() + 1 === monthIndex
        ) {
          active = true;
        }
      });
      return active;
    },
    [monthIndex, year]
  );

  const date = new Date(year, monthIndex, 0);

  const handleNextNavigation = React.useCallback(() => {
    if (monthIndex === 12) {
      date.setFullYear(date.getFullYear() + 1);
      setMonthIndex(1);
      setYear(date.getFullYear());
    } else {
      setMonthIndex(monthIndex + 1);
    }
  }, [monthIndex, year]);

  const handleBackNavigation = React.useCallback(() => {
    if (monthIndex === 1) {
      date.setFullYear(date.getFullYear() - 1);
      setMonthIndex(12);
      setYear(date.getFullYear());
    } else {
      setMonthIndex(monthIndex - 1);
    }
  }, [year, monthIndex]);

  const monthMap = () => {
    return new Map([
      [1, 'Jan'],
      [2, 'Feb'],
      [3, 'Mar'],
      [4, 'Apr'],
      [5, 'May'],
      [6, 'Jun'],
      [7, 'Jul'],
      [8, 'Aug'],
      [9, 'Sep'],
      [10, 'Oct'],
      [11, 'Nov'],
      [12, 'Dec'],
    ]);
  };

  return (
    <View style={styles.view}>
      <View style={styles.topView}>
        <Text style={styles.txt}>
          {monthMap().get(monthIndex)} {year}
        </Text>
        <View style={styles.iconView}>
          <Icon
            onPress={handleBackNavigation}
            name="arrowleft"
            size={30}
            color="#fff"
            style={[styles.icon, { marginRight: 20 }]}
          />
          <Icon
            onPress={handleNextNavigation}
            name="arrowright"
            size={30}
            color="#fff"
            style={[styles.icon, { marginRight: 12 }]}
          />
        </View>
      </View>
      <MapDaysToWeeks
        checkDates={checkDates}
        year={year}
        monthIndex={monthIndex}
      />
    </View>
  );
};

export default Calender;
