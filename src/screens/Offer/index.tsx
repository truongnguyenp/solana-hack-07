import React, { useState, useEffect } from 'react';
import { useGumContext, useExploreFeed } from '@gumhq/react-sdk';
import { PublicKey } from '@solana/web3.js';
import { PostMetadata } from '@gumhq/ui-components';
import { View, Text } from 'react-native';

import Post from './gum/Post';
import { FullScreenLoadingIndicator } from '../../components/common/LoadingScreen';

function SocialFeed() {
  const { sdk } = useGumContext();
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(false);

  const { exploreFeedData, exploreFeedLoading } = useExploreFeed(
    sdk,
    'Personal'
  );

  useEffect(() => {
    const getData = async () => {
      if (exploreFeedData) {
        await testGetData(exploreFeedData);
      }
    };
    getData();
  }, [exploreFeedData]);

  const testGetData = async (data) => {
    setLoading(true);
    const filteredData = data.filter(
      (post) =>
        post.metadata.platform === 'AmbitionHub' &&
        post.metadata.content.publicKey
    );
    const promises = filteredData.map(async (post) => {
      const profileMeta = await sdk.profileMetadata.getProfileMetadataByUser(
        new PublicKey(post.metadata.content.publicKey)
      );
      const profileData = profileMeta[0].metadata;
      const { type, content } = post.metadata;
      return {
        post: {
          type,
          content,
        } as PostMetadata,
        profile: profileData,
        address: post.address,
      };
    });

    const feedsData = await Promise.all(promises);
    setFeeds(feedsData);
    setLoading(false);
  };

  return (
    <View style={tw`flex flex-wrap justify-center items-stretch`}>
      {exploreFeedLoading || loading ? (
        <FullScreenLoadingIndicator />
      ) : (
        feeds &&
        feeds.map((feed, index) => (
          <View key={index} style={tw`mb-8 w-[calc(33%-20px)] p-5`}>
            <Post
              data={feed.post}
              profileData={feed.profile}
              address={feed.address}
            />
          </View>
        ))
      )}
    </View>
  );
}

export default SocialFeed;
