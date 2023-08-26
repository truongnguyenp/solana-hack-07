import * as Linking from "expo-linking";
import { useEffect } from "react";
import { Button, Image, Text } from "react-native";
import { atom, useRecoilState } from "recoil";

import { Screen } from "../components/Screen";
import { Section } from "../components/Section";
import { SignMessageButton } from "../components/SignMessageButton";
import useUserSOLBalanceStore from "../hooks/useUserSOLBalanceStore";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useDidLaunch } from "../hooks/xnft-hooks";
import { PariBox } from "../components/hxro/PariBox";
import tw from "twrnc";
const testAtom = atom<"native" | "bright">({
  key: "testAtom",
  default: "native",
});

function LearnMoreLink({ url }: { url: string }) {
  return <Text onPress={() => Linking.openURL(url)}>Learn more</Text>;
}

export function PredictingScreens() {
  const [future, setFuture] = useRecoilState(testAtom);

  const didLaunch = useDidLaunch();

	const balance = useUserSOLBalanceStore((s) => s.balance);
	const { getUserSOLBalance } = useUserSOLBalanceStore();

	useEffect(() => {
		if (didLaunch) {
			getUserSOLBalance(window.xnft.solana.publicKey, window.xnft.solana.connection);
		}
	}, [window.xnft.solana.publicKey, window.xnft.solana.connection, getUserSOLBalance, didLaunch]);

  return (
		<Screen
		style={
			{
				backgroundColor: '#161723',
			}
		}
		>

			{window.xnft.solana && (
				<Text style={tw`text-center text-white`}>
					SOL Balance: {(balance || 0).toLocaleString()}
				</Text>
			)}
			<view className="text-center" style={{ alignContent: 'center' }}>
				<view className="flex flex-col items-center justify-between md:flex-row">
					<view className="mx-5 my-5 mb-5 md:mb-0">
						<PariBox time={'1M'} />
					</view>
				</view>
			</view>
		</Screen>
	);
}
