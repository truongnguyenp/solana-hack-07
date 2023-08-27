<<<<<<< Updated upstream
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { FC, useCallback, useEffect } from 'react';
import { ParimutuelWeb3, PositionSideEnum, WalletSigner } from '@hxronetwork/parimutuelsdk';
import { PariConfig } from './Config';
import { notify } from '../../utils/notifications';
=======
import {
	Keypair,
	Connection,
} from '@solana/web3.js';
import { FC } from 'react';
import {
	ParimutuelWeb3,
	PositionSideEnum,
	DEV_CONFIG,
  MarketPairEnum,
  getMarketPubkeys,
} from '@hxronetwork/parimutuelsdk';

// import { View } from 'react-native';

>>>>>>> Stashed changes
import { View } from 'react-native';

import { Button, Text } from '@rneui/base';
import tw from 'twrnc';

const PlacePosition: FC<{pariPubkey: string, side: PositionSideEnum, amount: string}> = (props) => {
    const { connection } = useConnection();
    const { publicKey, signTransaction } = useWallet();
    const wallet = useWallet()

    const { config } = PariConfig;
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    const {pariPubkey, side, amount} = props

    useEffect(() => {
    }, [pariPubkey]);

    const onPress = useCallback(async (amount: string, pariPubkey: string) => {
        if (!publicKey) {
          notify({ type: 'error', message: 'Wallet not connected!' });
          console.error('Send Transaction: Wallet not connected!');
          return;
        }
        let transactionId = '';
        try {
      
          transactionId = await parimutuelWeb3.placePosition(
            wallet as WalletSigner,
            new PublicKey(pariPubkey),
            parseFloat(amount) * (10 ** 9 / 1),
            side,
            Date.now()
          );
      
          if (transactionId) {
            notify({ type: 'success', message: `Placed ${side === PositionSideEnum.LONG ? 'LONG' : 'SHORT'} Position`, txid: transactionId });
          }
        } catch (error: any) {
          notify({ type: 'error', message: 'Transaction failed!', description: error?.message, txid: transactionId });
          console.error(`Transaction failed! ${error?.message}`, transactionId);
          return;
        }
      }, [publicKey, notify, connection, signTransaction]);
      
    const bgGradientClass =
    side === PositionSideEnum.LONG
      ? 'bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-teal-500 hover:to-indigo-500'
      : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500';


	const buttonTitle =
		side === PositionSideEnum.LONG ? 'Team A Win' : 'Team B Win';

    return (
<<<<<<< Updated upstream
        <View>
            <View
                style={tw`group w-60 m-2 btn disabled:animate-none bg-gradient-to-r ${bgGradientClass} ...`}
                onPress={() => onPress(amount, pariPubkey)} disabled={amount === '0'}
            >
                <Text >
                    Enter Amount...
                </Text>
                <span className="block group-disabled:hidden" > 
                   {amount} USDC 
            
                </span>

                <Button style={tw`hidden group-disabled:block`}>
                    {side === PositionSideEnum.LONG ? 'LONG' : 'SHORT'}
                </Button>
            </View>
        </View>
    );
=======
			// <View style={{ borderRadius: 80 }}>
			// 	<Button
			// 		title={side === PositionSideEnum.LONG ? 'Team A Win' : 'Team B Win'}
					
			// 		color={side === PositionSideEnum.LONG ? 'green' : 'orange'}
					
			// 		onPress={() => placePosition()}
			// 	>
			// 		<View
			// 			style={tw`group w-60 m-2 btn disabled:animate-none bg-gradient-to-r ${bgGradientClass} ...`}
			// 		>
					
			// 			{/* <Text style={tw`block text-white`}>Predict team A win with</Text>
			// 			<Text style={tw`block group-disabled:hidden text-white`}>{amount} USDC</Text> */}

			// 			<Text style={tw`block text-white`}>Predict team A win with</Text>
			// 			<Text style={tw`block group-disabled:hidden text-white`}>{amount} USDC</Text>
			// 		</View>
			// 	</Button>
			// </View>

			<View style={{ borderRadius: "20px", width: "140px", }}>
				<Button
					title={side === PositionSideEnum.LONG ? 'Team A Win' : 'Team B Win'}
					color={side === PositionSideEnum.LONG ? '#28cd93' : '#f56a6c'}
					onPress={() => placePosition()}
					style={tw`bg-gray-800 rounded-lg`}
				>
					<View style={tw`group w-60 m-2 btn disabled:animate-none bg-gradient-to-r ${bgGradientClass}`}>
					
					<Text style={tw`block text-white`}>
					Predict {side === PositionSideEnum.LONG ? 'team A win' : 'team B win'} 
					</Text>

					<Text style={tw`block group-disabled:hidden text-white`}>with {amount} USDC</Text>
					</View>
				</Button>
			</View>
		);
>>>>>>> Stashed changes
};

export default PlacePosition;
