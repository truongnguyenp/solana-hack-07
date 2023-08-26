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
import { View } from 'react-native';
import { Button, Text } from '@rneui/base';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { notify, showSuccessMessage } from '../../utils/notifications';
const privateKey = new Uint8Array([
	70, 224, 61, 154, 54, 252, 229, 243, 14, 140, 229, 12, 152, 220, 123, 254,
	160, 164, 44, 131, 155, 20, 10, 108, 71, 159, 52, 200, 0, 195, 70, 196, 55,
	241, 189, 60, 16, 218, 175, 228, 209, 161, 98, 24, 156, 247, 94, 213, 185,
	178, 35, 219, 110, 4, 218, 61, 156, 48, 136, 242, 160, 191, 140, 211,
]);
const keypair = Keypair.fromSecretKey(privateKey);

const config = DEV_CONFIG;
const rpc =
	'https://devnet.helius-rpc.com/?api-key=6c8d6b2d-d450-40ae-8f14-06e093253afc';
const connection = new Connection(rpc, 'confirmed');

const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

const market = MarketPairEnum.BTCUSD;
const marketPubkeys = getMarketPubkeys(config, market);
const marketTerm = 60;
const selectedMarket = marketPubkeys.filter(
	(market) => market.duration === marketTerm
);

const usdcDec = 100_000_00;

const PlacePosition: FC<{pariPubkey: string, side: PositionSideEnum, amount: string}> = (props) => {
    const { side, amount} = props

    const placePosition = async () => {
			const parimutuels = await parimutuelWeb3.getParimutuels(selectedMarket);

			const pariContest = parimutuels.filter(
				(pari) =>
					pari.info.parimutuel.timeWindowStart.toNumber() > Date.now() &&
					pari.info.parimutuel.timeWindowStart.toNumber() <
						Date.now() + marketTerm * 1000
			);

			const contestPubkey = pariContest[0].pubkey;
			

			const txHash = await parimutuelWeb3.placePosition(
				keypair as Keypair,
				contestPubkey,
				Number(amount) * usdcDec,
				side,
				Date.now()
			).then(
				(res) => {
					showSuccessMessage()
					console.log("ok")
				}
			)
		};
      
    const bgGradientClass =
    side === PositionSideEnum.LONG
      ? 'bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-teal-500 hover:to-indigo-500'
      : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-500';


    return (
			<View style={{ borderRadius: 80 }}>
				<Button
					title={side === PositionSideEnum.LONG ? 'Win' : 'Lose'}
					color={side === PositionSideEnum.LONG ? 'blue' : 'red'}
					onPress={() => placePosition()}
				>
					<View
						style={tw`group w-60 m-2 btn disabled:animate-none bg-gradient-to-r ${bgGradientClass} ...`}
					>
					
						<Text style={tw`block text-white`}>	team A win</Text>
						<Text style={tw`block group-disabled:hidden text-white`}>{amount} USDC</Text>
					</View>
				</Button>
			</View>
		);
};

export default PlacePosition;
