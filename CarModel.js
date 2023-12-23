import { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Image, Modal, ScrollView, TextInput,getSearchText } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, moderateScale } from 'react-native-size-matters';
import { Text } from './TextStyles';

const CarModel = () => {
    const [isMakeOpen, setIsMakeOpen] = useState(false);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isYearOpen, setIsYearOpen] = useState(false);
    const [isVarientOpen, setIsVarientOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [makeSearchText, setMakeSearchText] = useState('');
    const [modelSearchText, setModelSearchText] = useState('');
    const [yearSearchText, setYearSearchText] = useState('');
    const [varientSearchText, setVarientSearchText] = useState('');

    //const [selectedItem, setSelectedItem] = useState(null);
    const [selectedMake, setSelectedMake] = useState(null);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedVarient, setSelectedVarient] = useState(null);
    const items = ['IteM 1', 'Item 2', 'Item 3', 'Item 4','IteM 1', 'Item 2', 'Item 3', 'Item 4'];
    const makes = ['Make 1', 'Make 2', 'Make 3', 'Make 4']; // Replace with your own items

    const toggleDropdown = (dropdownName) => {
        setIsMakeOpen(dropdownName === 'make' ? !isMakeOpen : false);
        setIsModelOpen(dropdownName === 'model' ? !isModelOpen : false);
        setIsYearOpen(dropdownName === 'year' ? !isYearOpen : false);
        setIsVarientOpen(dropdownName === 'varient' ? !isVarientOpen : false);
        setSearchText('');
    };

    const handleSearch = (text, dropdownName) => {
        if (dropdownName === 'make') {
            setMakeSearchText(text);
        } else if (dropdownName === 'model') {
            setModelSearchText(text);
        } else if (dropdownName === 'year') {
            setYearSearchText(text);
        } else if (dropdownName === 'varient') {
            setVarientSearchText(text);
        }
    };

    const handleSelectItem = (item, dropdownName) => {
        if (dropdownName === 'make') {
            setSelectedMake(item);
        } else if (dropdownName === 'model') {
            setSelectedModel(item);
        } else if (dropdownName === 'year') {
            setSelectedYear(item);
        } else if (dropdownName === 'varient') {
            setSelectedVarient(item);
        }
        toggleDropdown(dropdownName);
    };


    return (
        <View style={styles.container}>

            <Text style={styles.text1}>Select Car Model</Text>

            <TouchableOpacity style={styles.make} onPress={() => toggleDropdown('make')}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.icon}
                            source={require('./assets/images/car.png')} />

                        {isMakeOpen ? (
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={'#9CA3AF'}
                                value={makeSearchText}
                                onChangeText={(text) => handleSearch(text, 'make')}
                                style={[styles.placehold]}
                            />
                        ) : (
                            <Text style={styles.text2}>{selectedMake || 'Select Make'}</Text>
                        )}
                    </View>
                    <Image style={styles.iconArrow}
                        source={require('./assets/images/arrow-down.png')} />
                </View>
            </TouchableOpacity>
            {isMakeOpen && (
                <View>
                    {makes
                        .filter((item) =>
                            item.toLowerCase().includes(makeSearchText.toLowerCase())
                        )
                        .map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleSelectItem(item,'make')}
                            >
                                <Text style={styles.text2}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}

            <TouchableOpacity style={styles.make} onPress={() => toggleDropdown('model')}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.icon}
                            source={require('./assets/images/car.png')} />

                        {isModelOpen ? (
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={'#9CA3AF'}
                                value={makeSearchText}
                                onChangeText={(text) => handleSearch(text, 'model')}
                                style={[styles.placehold]}
                            />
                        ) : (
                            <Text style={styles.text2}>{selectedModel || 'Select Model'}</Text>
                        )}
                    </View>
                    <Image style={styles.iconArrow}
                        source={require('./assets/images/arrow-down.png')} />
                </View>
            </TouchableOpacity>
            {isModelOpen && (
                <View>
                    {items
                        .filter((item) =>
                            item.toLowerCase().includes(searchText.toLowerCase())
                        )
                        .map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleSelectItem(item,'model')}
                            >
                                <Text style={styles.text2}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}

            <TouchableOpacity style={styles.make} onPress={() => toggleDropdown('year')}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.icon}
                            source={require('./assets/images/calendar.png')} />

                        {isYearOpen ? (
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={'#9CA3AF'}
                                value={makeSearchText}
                                onChangeText={(text) => handleSearch(text, 'year')}
                                style={[styles.placehold]}
                            />
                        ) : (
                            <Text style={styles.text2}>{selectedYear || 'Select Year'}</Text>
                        )}
                    </View>
                    <Image style={styles.iconArrow}
                        source={require('./assets/images/arrow-down.png')} />
                </View>
            </TouchableOpacity>
            {isYearOpen && (
                <View>
                    {items
                        .filter((item) =>
                            item.toLowerCase().includes(searchText.toLowerCase())
                        )
                        .map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleSelectItem(item,'year')}
                            >
                                <Text style={styles.text2}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}

            <TouchableOpacity style={styles.make} onPress={() => toggleDropdown('varient')}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.icon}
                            source={require('./assets/images/car.png')} />

                        {isVarientOpen ? (
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={'#9CA3AF'}
                                value={makeSearchText}
                                onChangeText={(text) => handleSearch(text, 'varient')}
                                style={[styles.placehold]}
                            />
                        ) : (
                            <Text style={styles.text2}>{selectedVarient || 'Select Varient'}</Text>
                        )}
                    </View>
                    <Image style={styles.iconArrow}
                        source={require('./assets/images/arrow-down.png')} />
                </View>
            </TouchableOpacity>
            {isVarientOpen && (
                <View>
                    {items
                        .filter((item) =>
                            item.toLowerCase().includes(searchText.toLowerCase())
                        )
                        .map((item) => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => handleSelectItem(item,'varient')}
                            >
                                <Text style={styles.text2}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                </View>
            )}

            <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp('1.1%') }}>
                <TouchableOpacity style={{ ...styles.back, marginRight: 13, backgroundColor: '#ECEDF0', }}>
                    <Text style={{ ...styles.text3, color: '#6B7280' }}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.back, backgroundColor: '#6FBFC2' }}>
                    <Text style={{ ...styles.text3, color: 'white' }}>Add</Text>
                </TouchableOpacity>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: wp('4.26%'),
    },
    text1: {
        fontSize: moderateScale(26),
        lineHeight: moderateScale(36),
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'black',
        marginTop: hp('10.9%'),
        marginBottom: hp('2.95%'),
    },
    make: {
        width: wp("91.4%"),
        height: hp("6.4%"),
        borderWidth: scale(0.5),
        borderRadius: scale(10),
        borderColor: '#CBD0D6',
        alignSelf: 'center',
        marginBottom: hp('1.84%'),
    },
    icon: {
        width: wp("5%"),
        height: hp("2.46%"),
        marginLeft: wp('3.26%'),
        marginTop: hp('1.89%'),
    },
    iconCal: {
        width: wp("5.33%"),
        height: hp("2.46%"),
        marginLeft: wp('3.2%'),
        marginTop: hp('1.84%'),
    },
    iconArrow: {
        width: wp("4.26%"),
        height: hp("1.97%"),
        marginVertical: hp('2.09%'),
        marginRight: wp('2.93%'),
    },
    text2: {
        fontSize: moderateScale(12),
        lineHeight: moderateScale(19.03),
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#9CA3AF',
        paddingLeft: wp('3.2%'),
        paddingTop: hp('1.84%'),
    },
    placehold: {
        fontSize: moderateScale(10.5),
        lineHeight: moderateScale(19.03),
        fontFamily: 'Roboto',
        fontWeight: '400',
        paddingLeft: wp('3.2%'),
    },
    back: {
        width: wp("44%"),
        height: hp("6.7%"),
        borderRadius: scale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
    text3: {
        fontSize: moderateScale(14),
        fontFamily: 'SF Pro Text',
        fontWeight: '600',
    },
});

export default CarModel;
