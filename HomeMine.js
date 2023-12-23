import React, { Component } from 'react';
import { Image, Button, StyleSheet, TextInput, View, TouchableOpacity, Switch, SafeAreaView, Modal } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { scale, moderateScale } from 'react-native-size-matters';
import { RFValue as rf } from 'react-native-responsive-fontsize';
import { Text } from './TextStyles';
import { useState } from 'react';


//Width Percentage = (Design Width / Screen Width) * 100
//Width Percentage = (150 / 375) * 100 = 40%

const HomeMine = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const [isChangeAvgVisible, setChangeAvgVisible] = useState(false);

    const toggleChangeAvg = () => {
        setChangeAvgVisible(!isChangeAvgVisible);
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity>
                <Image style={styles.pic}
                    source={require('./assets/images/arrow-left.png')} />
            </TouchableOpacity>

            <Text style={styles.Text1}>Fuel Cost Estimation</Text>

            <View style={styles.data}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            style={styles.logo1}
                            source={require('./assets/images/Logo1.png')} />

                        <Text style={styles.logo2}>PKR 25000</Text>
                    </View>

                    <Text style={styles.logo3}>One way</Text>

                </View>

                <View style={{ flexDirection: 'row', paddingTop: hp('3.32%'), }}>
                    <Image
                        style={{ width: wp('5.33%'), height: hp('2.46%'), marginLeft: wp('4.26%'), marginRight: wp('3.46%'), borderRadius: scale(100) }}
                        source={require('./assets/images/fromHome.png')}
                    />
                    <Text style={styles.Text2}>Lahore, Pakistan </Text>
                </View>

                <Image
                    style={{ width: wp("0.26"), height: hp("2.46%"), marginLeft: wp('6.93%'), marginTop: hp('0.61%'), marginBottom: hp('0.61%') }}
                    source={require('./assets/images/line.png')}
                />

                <View style={{ flexDirection: 'row' }}>
                    <Image
                        style={{ width: wp("5.33%"), height: hp("2.46%"), marginLeft: wp('4.26%'), marginRight: wp('3.2%'), borderRadius: scale(100) }}
                        source={require('./assets/images/destination1.png')}
                    />
                    <Text style={styles.Text2}>Islamabad, Pakistan </Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: hp('3.94%'), justifyContent: 'center' }}>
                    <View style={{ ...styles.data1, backgroundColor: '#6FCF97', marginRight: wp('4.26%') }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.image}
                                source={require('./assets/images/routing.png')} />

                            <Text style={styles.data2}>Total Kms</Text>
                        </View>

                        <View>
                            <Text style={styles.result}>400 KM</Text>
                        </View>


                    </View>


                    <View style={{ ...styles.data1, backgroundColor: '#F2994A' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.image}
                                source={require('./assets/images/routing.png')} />

                            <Text style={styles.data2}>Consumption</Text>


                        </View>

                        <Text style={styles.result}>50 litres</Text>

                    </View>
                </View>




                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: hp('1.97%') }}>
                    <View style={{ ...styles.data1, backgroundColor: '#FBBF24', marginRight: wp('4.26%') }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.image}
                                source={require('./assets/images/routing.png')} />

                            <Text style={styles.data2}>Petrol Rate</Text>


                        </View>

                        <Text style={styles.result}>PKR 280</Text>

                    </View>


                    <View style={{ ...styles.data1, backgroundColor: '#7375FD' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                style={styles.image}
                                source={require('./assets/images/routing.png')} />

                            <Text style={styles.data2}>Petrol Avg</Text>


                        </View>
                        <Text style={styles.result}>13km/L</Text>

                    </View>
                </View>
            </View>







            <View style={{ ...styles.block1, marginTop: hp('4.55%'), flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: wp("5.33%"), height: hp("2.46%"), marginLeft: wp('3.2%'), marginTop: hp('1.84%') }}
                        source={require('./assets/images/profile-user.png')} />

                    <Text style={styles.Text5}>Split Cost</Text>
                </View>


                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity>
                        <Image style={{ width: wp("6.4%"), height: hp("2.95%"), marginTop: hp('1.72%') }}
                            source={require('./assets/images/minus-cirlce.png')} />
                    </TouchableOpacity>

                    <Text style={styles.Text6}>1</Text>

                    <TouchableOpacity>
                        <Image style={{ width: wp("6.4%"), height: hp("2.95%"), marginRight: wp('2.93%'), marginTop: hp('1.72%') }}
                            source={require('./assets/images/add-circle.png')} />
                    </TouchableOpacity>
                </View>



            </View>


            <View style={{ ...styles.block1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: wp("5.33%"), height: hp("2.46%"), marginLeft: wp('2.67%'), marginTop: hp('1.84%') }}
                        source={require('./assets/images/repeat-circle.png')} />

                    <Text style={styles.Text7}>Return Trip</Text>
                </View>

                <Switch
                    trackColor={{ false: "white", true: "#6FBFC2" }}
                    thumbColor={isEnabled ? "white" : "white"}
                    onValueChange={toggleSwitch}
                    ios_backgroundColor={"#D1D5DB"}
                    and
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.7 }], marginRight: wp('2%'), alignSelf: 'center' }}
                />
            </View>

            <View style={styles.block2}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <Image style={{ width: wp('10.67%'), height: hp('4.92%'), marginLeft: wp('2.6%'), borderRadius: scale(200) }}
                        source={require('./assets/images/car-icon.png')} />

                    <View style={{ flexDirection: 'column', paddingLeft: wp('3.2%') }}>
                        <Text style={styles.Text8}>Toyota Corolla</Text>
                        <Text style={styles.Text9}>1.3 Gli manual -2012</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.block3} onPress={toggleChangeAvg}>
                    <Text style={styles.Text10}>Change Avg</Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={isChangeAvgVisible}>
                <View style={styles.changeAvgContainer}>
                    <View style={styles.changeAvg}>
                        <Text style={styles.Text11}>Fuel Average</Text>
                        <Text style={styles.Text12}>Set your own fuel Average</Text>
                        <View style={styles.block4}>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput placeholder='0' placeholderTextColor="#6FBFC2" keyboardType="numeric" style={styles.Text13}></TextInput>
                                <Text style={styles.Text14}>KM/L</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={toggleChangeAvg} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Update</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Modal>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: wp('4.26%'),

    },
    pic: {
        width: wp('6.4%'),
        height: hp('2.95%'),
        marginTop: hp('7.86%'),
    },
    Text1: {
        fontSize: moderateScale(26),
        lineHeight: moderateScale(26),
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'black',
        paddingVertical: hp('2.95%'),
    },
    data: {
        width: wp('91.4%'),
        height: hp('44.33%'),
        borderRadius: scale(12),
        backgroundColor: '#6FBFC2',
        alignSelf: 'center',
    },
    logo1: {
        width: wp('5.417%'),
        height: hp('3.441%'),
        marginLeft: wp('5.28%'),
        marginTop: hp('2.96%'),

    },
    logo2: {
        fontSize: moderateScale(26),
        lineHeight: moderateScale(26),
        fontFamily: 'Roboto',
        fontWeight: '600',
        color: 'white',
        paddingLeft: wp('3.51%'),
        paddingTop: hp('3.53%'),
    },
    logo3: {
        fontSize: moderateScale(15),
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: '#E1FAFB',
        paddingTop: hp('2.83%'),
        paddingRight: wp('4.2%'),
    },
    Text2: {
        fontSize: moderateScale(14),
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: 'white',
    },
    data1: {
        height: hp("8.62"),
        width: wp("39.46"),
        borderRadius: scale(12),
    },
    data2: {
        fontSize: moderateScale(14),
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.80)',
        paddingTop: hp('1.35%'),
        paddingLeft: wp('2.4%'),
    },
    image: {
        width: wp("5.33%"),
        height: hp("2.46%"),
        marginLeft: wp('2.6%'),
        marginTop: hp('1.34%'),
    },
    result: {
        fontSize: moderateScale(20),
        lineHeight: moderateScale(20),
        fontFamily: 'Roboto',
        fontWeight: '600',
        color: 'white',
        paddingTop: hp('1.23%'),
        alignSelf: 'center',

    },
    block: {
        width: wp("91.4%"),
        height: hp("44.33%"),
        borderWidth: scale(0.5),
        borderRadius: scale(10),
        borderColor: '#E5E7EB',
        alignSelf: 'center',
        backgroundColor: 'black',
        marginTop: hp('21.1%'),
    },
    block1: {
        width: wp("91.4%"),
        height: hp("6.1%"),
        borderWidth: scale(0.5),
        borderRadius: scale(10),
        borderColor: '#E5E7EB',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: hp('1.35%'),
    },
    block2: {
        width: wp("91.4%"),
        height: hp("8.62%"),
        borderWidth: scale(0.5),
        borderRadius: scale(10),
        borderColor: '#E5E7EB',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: hp('1.35%'),
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    block3: {
        width: wp('26.7%'),
        height: hp('3.94%'),
        borderRadius: scale(20),
        alignSelf: 'center',
        backgroundColor: '#6FBFC2',
        marginRight: wp('3.2%'),
        alignItems: 'center',
    },
    block4: {
        width: wp('80%'),
        height: hp('7.38%'),
        borderRadius: scale(12),
        borderWidth: scale(0.5),
        borderColor: '#CBD0D6',
        backgroundColor: 'white',
        marginBottom: hp('1.97%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    Text5: {
        fontSize: moderateScale(14), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#111827',
        alignSelf: 'center',
        paddingLeft: wp('2.67%'),
    },
    Text6: {
        fontSize: moderateScale(16), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'black',
        alignSelf: 'center',
        paddingHorizontal: wp('2.67%'),
        paddingTop: hp('0.18%'),
    },
    Text7: {
        fontSize: moderateScale(14), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#111827',
        alignSelf: 'center',
        paddingLeft: wp('2.67%'),

    },
    Text8: {
        fontSize: moderateScale(14), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: '#111827',

    },
    Text9: {
        fontSize: moderateScale(13), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#6B7280',

    },
    Text10: {
        fontSize: moderateScale(13), // Calculate responsive font size
        lineHeight: moderateScale(19.03),
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'white',
        paddingTop: hp('0.61%')
    },
    Text11: {
        fontSize: moderateScale(16), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: 'black',
        paddingBottom: hp('1.23%')
    },
    Text12: {
        fontSize: moderateScale(13), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#6B7280',
        paddingBottom: hp('2.95%')
    },
    closeButtonText: {
        fontSize: moderateScale(14), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '600',
        color: 'white',
    },
    Text13: {
        fontSize: moderateScale(20), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: '#6FBFC2',
        paddingRight: wp('2.13%'),
    },
    Text14: {
        fontSize: moderateScale(27.5), // Calculate responsive font size
        fontFamily: 'Roboto',
        fontWeight: '500',
        color: '#6FBFC2',
    },
    changeAvgContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.70)',
    },
    changeAvg: {
        width: wp('91.46%'),
        height: hp('28.94%'),
        backgroundColor: 'white',
        borderRadius: scale(12),
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        width: wp('52.53%'),
        height: hp('6.77%'),
        backgroundColor: '#6FBFC2',
        borderRadius: scale(12),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeMine;

//375 width
//812 height