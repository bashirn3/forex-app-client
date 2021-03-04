import React from 'react'
import { View, Text, StatusBar, StyleSheet, Image, ScrollView } from 'react-native'

const TopicScreen = ({route}) => {
    const { classId, topicId} = route?.params;
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar backgroundColor='#880000' barStyle="light-content" />
            {topicId}
            {classId}
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'grey' }}>What is Support and Resistance?</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    source={{
                        uri: 'https://a.c-dn.net/b/2zdUYu/support-and-resistance-trading_body_Supportandresistanceimage.png.full.png',
                    }}
                />
            </View>
           
            <View style={styles.contentContainer}>
                <Text style={{fontSize: 15}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit sem at turpis imperdiet viverra. Proin nunc risus, molestie ut pharetra in, hendrerit ut nisl. Aliquam laoreet euismod erat, id sodales velit dapibus quis. Curabitur iaculis posuere lobortis. In egestas molestie tempus. Morbi tempus, quam nec pellentesque pharetra, lacus ipsum porta neque, et sagittis ante urna eu mi. In in leo eget augue cursus ornare. Vestibulum vulputate finibus lorem, ac ornare nunc lacinia at.

                Pellentesque condimentum porta est quis venenatis.
                Morbi sed sem a mauris molestie efficitur. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi mauris leo, blandit a tortor imperdiet, luctus bibendum odio. Quisque sagittis leo at elementum eleifend. Quisque posuere eros sed erat bibendum, non tempus neque mattis. Sed eget sem vitae purus ullamcorper tristique a ac massa. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit, nisi vitae efficitur commodo, urna sapien dapibus velit, vitae tempor ante dolor sit amet nisl. Praesent vitae hendrerit libero. Integer euismod ultricies odio. Nulla venenatis quis magna ac maximus. Aenean ex tortor, scelerisque vel lacus vitae, feugiat pretium nulla.

                Sed ac luctus purus. Ut nunc dui, venenatis vel lobortis sed, sodales et urna. Donec ultrices massa vitae ligula gravida, sit amet lacinia metus scelerisque. Ut efficitur dolor eu massa convallis imperdiet. Curabitur justo odio, rhoncus id sollicitudin non, tristique nec diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris dapibus commodo placerat. Nulla posuere, augue vitae vehicula placerat, nibh enim luctus ligula, vel congue nibh diam a augue. Praesent enim lectus, congue et urna nec, maximus condimentum eros. Sed rutrum tellus sit amet ex convallis tincidunt in sit amet tellus. Maecenas ornare facilisis sapien, nec imperdiet leo elementum nec. Donec dignissim leo id consectetur venenatis.

                Fusce non risus quis quam pellentesque euismod ut non nibh. Aliquam euismod est elit, et tempus purus vulputate in. Fusce non urna in dolor rhoncus hendrerit. Vivamus molestie dolor a arcu dignissim vulputate. Pellentesque a odio nec arcu ultricies venenatis sed pretium nibh. Duis vel fermentum lectus. Etiam euismod dapibus ligula, non suscipit metus semper id. Nunc eu dui in nisi hendrerit ultrices. Sed diam arcu, blandit ac elit a, ullamcorper placerat quam. Nulla cursus vel elit ac consequat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut a molestie purus, at tincidunt enim. Sed maximus arcu ut convallis mattis. 
                
                Aliquam sit amet ullamcorper magna. Quisque non rhoncus risus.

Fusce scelerisque sapien ante. Donec non odio ac tortor pretium sollicitudin sodales nec ante. Cras commodo, ipsum ut varius viverra, justo tortor vulputate lectus, ut volutpat enim felis ut nulla. Fusce interdum vitae mauris finibus hendrerit. Sed lacinia finibus imperdiet. Praesent vestibulum volutpat sapien, in aliquet metus pharetra quis. Vestibulum vitae vehicula odio, vel feugiat est. Quisque at dictum ligula, vel ullamcorper purus. Nulla at scelerisque tortor, id bibendum felis. Etiam posuere tortor ultricies massa euismod, ac ultricies eros consequat. Quisque et libero quis eros placerat fringilla ac sed neque. Proin at turpis neque. Fusce a turpis molestie, imperdiet lectus ac, luctus diam.</Text>
            </View>
        </ScrollView>
    )
}

export default TopicScreen;

const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        textAlign: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
    },
    image: {
        overflow: 'hidden',
        borderWidth: 3,
        borderColor: 'grey',
        width: 300,
        height: 300,
        padding: 10
    },
    contentContainer: {
       marginHorizontal: 10
    }
})
