import React, { useState } from 'react';
import { Card, User, Text, Image, Button, Loading } from 'twrnc';
import { formatTime } from '@/utils/formatTime';
import { TextInput, View } from 'react-native';

export interface PostMetadata {
  type: string;
  content: {
    content: string;
    format: string;
    image: string;
    publicKey: string;
    time: number;
    title: string;
    duration: number;
    target: number;
  };
  address: string;
  reply?: () => any;
}

function Post({
  data,
  profileData,
  address,
}: {
  data: PostMetadata;
  profileData: ProfileMetadata;
  address: string;
}) {
  const [money, setMoney] = useState('');

  const renderTagPost = (time: number, duration: number) => {
    const isOpening: number =
      time + duration * 24 * 60 * 60 * 1000 - new Date().getTime();

    return (
      <Text
        style={{
          padding: 4,
          paddingHorizontal: 12,
          fontSize: 12,
          borderRadius: 9999,
          backgroundColor: isOpening > 0 ? '#ED1651' : '#6B7280',
          color: 'white',
        }}
      >
        {isOpening > 0 ? 'Opening' : 'Closed'}
      </Text>
    );
  };

  return (
    <>
      {data ? (
        <Card style={{ width: '100%', position: 'relative', padding: 10 }}>
          <Card.Body>
            {profileData ? (
              <User
                src={profileData.avatar}
                name={profileData.name}
                size="md"
                bordered
                color="secondary"
              >
                <Text
                  style={{
                    color: '#666666',
                    fontSize: 12,
                    marginTop: 4,
                  }}
                >
                  @{profileData.username}
                </Text>
              </User>
            ) : null}
            <Text
              style={{
                padding: 2,
                paddingHorizontal: 6,
                fontSize: 12,
              }}
            >
              {formatTime(data.content.time)}
            </Text>
            <View
              style={{
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  color: 'black',
                }}
                numberOfLines={1}
              >
                {data.content.title}
              </Text>
            </View>

            <Image
              source={{ uri: data.content.image }}
              alt="Default Image"
              resizeMode="cover"
              style={{ width: '100%', height: 200 }}
            />
            <View
              style={{
                padding: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: '#F9153E',
                  fontWeight: 'bold',
                  marginRight: 4,
                }}
              >
                {`Target: ${data.content.target} $`}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: '#F9153E',
                  fontWeight: 'bold',
                }}
              >
                {`Duration: ${data.content.duration} day`}
              </Text>
            </View>

            <TextInput
              keyboardType="numeric"
              value={money}
              onChangeText={(value) => setMoney(value)}
              placeholder="Money"
              style={{
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 8,
                marginBottom: 8,
              }}
            />
            <Button
              auto
              rounded
              bordered={true}
              onPress={() => {
                // CandyPayHelper.tran(data.address).then((data) => {
                //   console.log(data.payment_url);
                //   window.location.href = data.payment_url;
                // });
              }}
            >
              Donate
            </Button>
          </Card.Body>
          <View
            style={{
              position: 'absolute',
              top: 16,
              right: 8,
            }}
          >
            {renderTagPost(data.content.time, data.content.duration)}
          </View>
        </Card>
      ) : (
        <Loading size="md" />
      )}
    </>
  );
}

export default Post;
