import { Text, Image, Button, View, StyleSheet, FlatList } from "react-native";
import tw from "twrnc";

import { Screen } from "../components/Screen";
import { useEffect, useState } from "react";
import { usePublicKeys, useSolanaConnection } from "../hooks/xnft-hooks";
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Buffer } from "buffer";
import { async } from "fast-glob";
import { PortfolioUser } from "../types";
import { TokenCardInfo } from "../components/TokeInfoCard";
import { ItemSeparatorComponent } from "./TokenNavigator";

const OWNER = "2RLHEQX4ybSrfeuENei9g9rcB7rwurWHP1mhwGQ6nkkq" // please user dynamic publickey for each user
const ADDRESS_SYSTEM = "solana" // you can change the address system to ETH or any blockchain network

export function PersonalScreen() {
    window.Buffer = Buffer;

    let connection = useSolanaConnection()

    async function getNftInfo() {
        const url = "https://api.shyft.to/sol/v1/nft/read?network=devnet&token_address=Ddq6ecXkGux7UrntjFtQVE6AS4Tki22a4z4C4nFZJYqp"
        let resp = await fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": "YOUR_SHYFT_API_KEY_HERE"
            }
        })
        return await resp.json()
    }

    async function transferSol(from: any) {
        if (!connection) {
            console.log("no solana connection!")
            return
        }

        let tx = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: new PublicKey(from),
                toPubkey: new PublicKey("7ZsXMgLFxb2diaU92zsrfvpoCeUBhiSZPG6tZ73LV7Zn"),
                lamports: LAMPORTS_PER_SOL
            })
        )

        let signature = await window.xnft.solana.send(tx)
        console.log("signature:", signature)
    }

    async function getPortfolioUser() {
        const url = `https://portfolio-api.sonar.watch/v1/portfolio/fetch?owner=${OWNER}&addressSystem=${ADDRESS_SYSTEM}&useCache=false`
        let res = await fetch(url, {
            method: "GET"
        })

        return await res.json() as PortfolioUser
    }

    function usePortfolioData() {
        const [loading, setLoading] = useState(true)
        const [data, setData] = useState<PortfolioUser>()

        useEffect(() => {
            async function fetch() {
                setLoading(true)
                const data = await getPortfolioUser()
                console.log(data)
                setData(data)
                setLoading(false)
            }

            fetch()
        }, [])

        return { loading, data }
    }


    const { loading, data } = usePortfolioData()
    const pks: any = usePublicKeys()
    let pk = pks ? new PublicKey(pks?.solana) : undefined

    return (
        <Screen style={
            {
                backgroundColor: '#161723',
            }
        }>
            <View style={styles.container}>
                <Text style={tw`text-center text-white font-mono`}>
                    Username: Minhbear
                </Text>
                <Text style={tw`text-center text-white font-mono`}>
                    Address: {pk?.toBase58()}
                </Text>
            </View>

            <View style={styles.container}>
                <Text style={tw`text-center text-white`}>
                    Assert
                </Text>

                {/* 
                    // will be fix this to display the dynamic data return from sonarwatch
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        style={{ flex: 1 }}
                        data={data?.elements}
                        keyExtractor={(item) => item.date}
                        ItemSeparatorComponent={ItemSeparatorComponent}

                        renderItem={({ item }) => {
                            return (
                                <AssertCard 
                                    type="token"
                                    networkId="solana"
                                    value='0.0260337136'
                                />
                            );
                        }}
                    /> */}
                <AssertCard
                    type="token"
                    networkId="solana"
                    value='0.0260337136'
                />
            </View>
        </Screen>
    );
}

interface AssertCardProps {
    type: string,
    networkId: string,
    value: string,
}

function AssertCard({ networkId, type, value }: AssertCardProps) {
    const SYMBOLDATA: {
        [networkId: string]: {
            symbol: string
        }
    } = {
        "solana": {
            symbol: "SOL"
        }
    }

    return (
        <View >
            <Text style={tw`text-white font-mono`}>Network: {networkId}</Text>
            <Text style={tw`text-white`}>Type: {type}</Text>
            <Text style={tw`text-white`}>Balance: ${value} {SYMBOLDATA[networkId].symbol}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "space-between",
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#272639',
        borderRadius: 8,
        paddingTop: 20,
        elevation: 3,

        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 1,
        shadowRadius: 8,
        // borderColor: "#E0E0E0",
        height: 100,
        color: 'white'
    },
    image: {
        width: 50,
        height: 50,
        // borderRadius: 22,
        // marginRight: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        display: "flex",
        justifyContent: "center",
    },
    score: {
        fontSize: 20,
        color: "white",
        fontWeight: "800",
    },
    divider: {
        fontSize: 20,
        color: "white",
        fontWeight: "800",
    },
});