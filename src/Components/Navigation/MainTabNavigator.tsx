import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useTheme, Surface} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome6';
import HexagonFAB from '../Common/HexagonFab';

const tabs = [
  {key: 'overview', icon: 'house'},
  {key: 'analytics', icon: 'chart-bar'},
  {key: 'center', icon: 'plus'}, // Hex FAB
  {key: 'report', icon: 'chart-simple'},
  {key: 'profile', icon: 'user'},
];

const MainTabNavigator = () => {
  const {colors} = useTheme();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <View style={styles.container}>
      <View style={styles.screen}>
        <Text style={{color: colors.onBackground}}>Active: {activeTab}</Text>
      </View>

      {/* Bottom Nav */}
      <Surface style={[styles.bottomBar, {backgroundColor: colors.surface}]}>
        {tabs.map((tab, index) =>
          tab.key === 'center' ? (
            <HexagonFAB key="fab" onPress={() => setActiveTab('add')} />
          ) : (
            <TouchableOpacity
              key={tab.key}
              style={styles.tab}
              onPress={() => setActiveTab(tab.key)}>
              <Icon
                name={tab.icon}
                size={20}
                color={activeTab === tab.key ? colors.primary : '#A1A0B2'}
              />
            </TouchableOpacity>
          ),
        )}
      </Surface>
    </View>
  );
};

export default MainTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 65, // ⬅️ Smaller height
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    paddingBottom: 10,
    elevation: 12,
    backgroundColor: '#0B0F2B',
    position: 'relative',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 5,
  },
});
