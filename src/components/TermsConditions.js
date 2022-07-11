import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Platform, ToastAndroid, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { openDatabase } from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import IconFeather from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons'
import IconEnt from 'react-native-vector-icons/Entypo'
import IconMI from 'react-native-vector-icons/MaterialIcons'
import IconAntDesign from 'react-native-vector-icons/AntDesign'
import Axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import ImgLogo from '../resources/imgs/book_img.png'

const TermsConditions = ({navigation: { goBack, navigate }}) => {
  return (
    <View style={styles.mainView}>
      <ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.containerScrollViewStyle}>
        <TouchableOpacity onPress={() => { goBack() }}>
            <View style={styles.viewIcon}>
            <View style={styles.viewIconFlexed}>
                <Image source={ImgLogo} style={styles.imageLogoSizing} />
                <Text style={styles.textIconSizing}>Coder's Library</Text>
            </View>
            </View>
        </TouchableOpacity>
        <Text style={{fontSize: 20, marginBottom: 5, fontWeight: "bold"}}>Terms &#38; Conditions</Text>
        <View style={styles.viewHelp}>
            <Text style={{textAlign: "justify", marginBottom: 10}}>
                By accessing and using the App "Coder's Library", managed by Coder's Library Team, You
                agree to use this Platform along with the limits stated below. If you have problems in
                understanding the statements below, please consider asking for assistance from your peers. 
                The Team will still open the accessibility for this platform unless user will decide to Sign Up 
                informations with us.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>1. Definitions</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10}}>Different Parties in this Agreement are defined as the following:</Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                a. Team, We, Us -  Refers to the Developer, Management and Creator of this App/Platform. Our, Ours and other 
                first person terms or pronouns will be further referring to us as the Team.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                b. You, User -  Refers to the Registered Users of the App. You, Yours and other second person pronouns 
                will be used referring to you as a User and indicates "as User" if Registered.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                c. You, Visitor -  Refers to the Unregistered Users of the App. You, Yours and other second person pronouns 
                will be used referring to you as a User and indicates "as Visitor" if not Registered.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10, marginTop: 10}}>2. Intellectual Property</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 0, textAlign: "justify"}}>
                The App, Designs, Architecture, Logos and Images and Services Provided by the Team are property of the Team. 
                However, the materials such as the PDF Books are owned by their respective authors and publishers.
            </Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
                By agreeing to the agreement you as a User or Visitor understands that the content that you see and use in this Platform are not 
                yours and means prohibits you to sell or reproduce these materials.
            </Text>
        </View>
        <View style={styles.viewHelp}>
            <Text style={{textAlign: "justify", marginBottom: 20, marginTop: 20}}>
                By Signing Up your Personal Informations, you agree to share with us - Coder's Library Team your 
                Information as a System User and you also agree with the statements below. If you do not agree with 
                the stated conditions below, you can still access the App free as an Unregistered User.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 15}}>3. User Accounts &#38; Obligations</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 15, textAlign: "justify"}}>
                Some features and contents in the App are only accessible through Signing Up as a Regular User. If you decide 
                to Sign Up, you agree that you are providing us you Personal Email Address, First Name and Surname, and New made 
                Password.
            </Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
                By providing us your Email Address, you agree and permit us to contact you through it for the reasons of 
                providing Platform Updates, Account Verifications, Content Alerts and Content Updates.
            </Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10, textAlign: "justify"}}>
                You are obligated and responsible to take care of the information you provide and as well 
                keeping us informed of any changes or concerns regarding to the informations you provided.
            </Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 15, textAlign: "justify"}}>
                By agreeing to the statements under "User Accounts &#38; Obligations" you also agree that 
                any content and actions made by the account named after you or that contains the information 
                that you own upholds you as responsible of it.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>4. Acceptable Use</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10}}>
                As agreed upon the use of the App, you as User or Visitor further agree not to use the App or 
                Platform for any unlawful purposes or any purposes defined below.
            </Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10}}>
                You agree not to do actions within this App such as:
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                a. Harass, abuse, or threaten others or perhaps violating person's rights.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                b. Violate any intellectial property rights of the Team and other mentioned Parties.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                c. Attempt to gain unauthorized access to App Services, other accounts, servers and networks.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                d. Post violent or inappropriate statements within the comment sections the Platform has.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                e. Sharing of inappropriate links and contents with others within the Platform.
            </Text>
            <Text style={{width: "90%", alignSelf: "center", textAlign: "justify", marginBottom: 15}}>
                f. Steal Team's and User's Informations seen inside the Platform.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 15}}>5. Privacy</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 15, textAlign: "justify"}}>
                You as User may provide us certain informations. Along your experience and use of this App 
                you authorize us - the Team, to use your information in the Philippines.
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 15}}>6. Contact Us</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 15, textAlign: "justify"}}>
                You can contact us about this Agreement or any concerns using the contacts below:
            </Text>
            <Text style={{width: 300, height: 30, alignSelf: "center", textAlign: "center", marginBottom: 15, borderWidth: 1, borderColor: "#acacac", borderRadius: 3, textAlignVertical: "center"}} onPress={() => { Linking.openURL('mailto:coderslibrary.netlify.app@gmail.com') }}>
                Email: coderslibrary.netlify.app@gmail.com
            </Text>
            <Text style={{width: 300, height: 30, alignSelf: "center", textAlign: "center", marginBottom: 15, borderWidth: 1, borderColor: "#acacac", borderRadius: 3, textAlignVertical: "center"}} onPress={() => { Linking.openURL('https://coderslibrary.netlify.app/') }}>
                Website: https://coderslibrary.netlify.app/
            </Text>
            <Text style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}>7. Effective Date</Text>
            <Text style={{width: "95%", alignSelf: "center", marginBottom: 10}}>
                This Agreement is effective on July 13, 2022.
            </Text>
        </View>
        <View style={styles.viewHelp}>
            <Text style={{fontWeight: "bold", fontSize: 17, marginBottom: 5, marginTop: 10}}>Disclaimer</Text>
            <Text style={{textAlign: "justify", marginBottom: 30}}>
                The resources found in this website is not owned by the team. Our main purpose is to share books and learning materials for our fellow learners and not to presume of owning these resources. We cannot promise full information about our resources but all we can give is a proper credential for the author / publisher of the books.
            </Text>
        </View>
        <Text style={{textAlign: 'center', marginBottom: 30}}>
            © Coder's Library 2022
        </Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    mainView:{
        backgroundColor: "white",
        flex: 1,
        alignItems: "center"
    },
    viewHelp:{
        backgroundColor: "white",
        marginTop: 10,
        width: "90%",
        maxWidth: 700
    },
    viewIcon:{
        backgroundColor: "black",
        height: 50,
        width: 170,
        marginTop: 25,
        borderRadius: 10,
        marginBottom: 20
      },
      imageLogoSizing:{
        width: 30,
        height: 30,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5
      },
      viewIconFlexed:{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
      },
      textIconSizing:{
        fontSize: 17,
        marginLeft: 5,
        color: "white"
      },
      scrollViewStyle:{
        backgroundColor: "transparent",
        width: "100%"
      },
      containerScrollViewStyle:{
        flexGrow: 1,
        alignItems: "center"
      }
})

export default TermsConditions