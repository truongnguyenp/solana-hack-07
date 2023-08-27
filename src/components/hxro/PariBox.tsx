import {Connection} from "@solana/web3.js"
import { FC, useState } from "react";
import {
    ParimutuelWeb3,
    MarketPairEnum,
    getMarketPubkeys,
    calculateNetOdd,
} from "@hxronetwork/parimutuelsdk";
import { useEffect } from "react";
// import PlacePositionBox from './PlacePositionBox'
import { PariConfig } from "./Config";
import PlacePositionBox from "./PlacePositionBox";
import { Buffer } from 'buffer';

interface PariObj {
    longPool: any;
    shortPool: any;
    longOdds: string;
    shortOdds: string;
    pubkey: string;
}

const TimeInterval = [
    {
        interval: '1M',
        seconds: 60,
        title: "1 MINUTE",
    },

    {
        interval: '5M',
        seconds: 300,
        title: "5 MINUTE",
    },

    {
        interval: '15M',
        seconds: 900,
        title: "15 MINUTE",
    },

    {
        interval: '1H',
        seconds: 3600,
        title: "1 HOUR",
    },
    {
        interval: '1D',
        seconds: 86400,
        title: "1 DAY",
    },
];

export const PariBox: FC<{ time: string }> = (props) => {

// @ts-ignore
window.Buffer = Buffer;
    const { time } = props;
    const selectedTime = TimeInterval.filter((data) => data.interval === time);
    const timeSeconds = selectedTime[0].seconds
    const timeTitle = selectedTime[0].title

    const rpc =
			'https://devnet.helius-rpc.com/?api-key=6c8d6b2d-d450-40ae-8f14-06e093253afc';
    const connection = new Connection(rpc, 'confirmed')

    const [pariObj, setPariObj] = useState<PariObj>();
    const [countDownTime, setCountDownTime] = useState<string>("");

    const { config } = PariConfig;
    const parimutuelWeb3 = new ParimutuelWeb3(config, connection);

    const market = MarketPairEnum.BTCUSD;
    const markets = getMarketPubkeys(config, market);
    const marketsByTime = markets.filter(
        (market) => market.duration === timeSeconds
    );

    useEffect(() => {
      const getPariData = async () => {
          try {
              localStorage.clear();
              const parimutuels = await parimutuelWeb3.getParimutuels(marketsByTime);
              console.log(parimutuels);
              const duration = marketsByTime[0].duration;
              
              const pari_markets = parimutuels.filter(
                  (account) =>
                      account.info.parimutuel.timeWindowStart.toNumber() > Date.now() &&
                      account.info.parimutuel.timeWindowStart.toNumber() <
                      Date.now() + duration * 1000
              );


              let longPool: any =
                  (pari_markets[0].info.parimutuel.activeLongPositions.toNumber() /
                  1_000_000_000);
              let shortPool: any =
                  (pari_markets[0].info.parimutuel.activeShortPositions.toNumber() /
                  1_000_000_000);
              const longOdds = calculateNetOdd(longPool, longPool + shortPool, 0.03);
              const shortOdds = calculateNetOdd(
                  shortPool,
                  longPool + shortPool,
                  0.03
              );
              const pubkey = pari_markets[0].pubkey.toString();
              const locksTime =
                  pari_markets[0].info.parimutuel.timeWindowStart.toNumber();

              var formattedTime = "00:00:00";
              if (locksTime) {
                  const currentTime = new Date().getTime();
                  const timeDiff = locksTime - currentTime;
                  const hours = Math.floor(timeDiff / (1000 * 60 * 60));
                  const minutes = Math.floor(
                      (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
                  );
                  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                  formattedTime = `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes
                      }:${seconds < 10 ? "0" + seconds : seconds}`;
              }
              setCountDownTime(formattedTime);

              longPool = longPool.toFixed(2)
              shortPool = shortPool.toFixed(2)

              setPariObj({ longPool, shortPool, longOdds, shortOdds, pubkey });
              
          } catch (error) {
              console.error(error);
          }
      };

      const intervalId = setInterval(() => getPariData(), 1000);

      return () => clearInterval(intervalId);
    }, []);

    return (
        <view>
            <view style={{
                // border: "1px solid white",
                boxSizing: "border-box",
                alignItems: "center",
            }}>
                <view
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
<<<<<<< Updated upstream
=======
                        gap: "10",
                        backgroundColor: "#23282d",
                        paddingRight: "16px",
                        paddingLeft: "16px",
                        paddingTop: "8px",
                        paddingBottom: "8px",
                        borderRadius: "8px",
>>>>>>> Stashed changes
                    }}
                >
                    <view
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginRight: "5px",
                        }}
                    >
<<<<<<< Updated upstream
                        <p>Long Pool:</p>
                        <p>Short Pool:</p>
                        <p>Long Odds:</p>
                        <p>Short Odds:</p>
                        <p>Starts In:</p>
=======
                        {/* A long, B short */}
                        <Text style={{ color: "#858f9c", marginTop: "4px", marginBottom: "4px" }}>Team A Pool:</Text>
                        <Text style={{ color: "#858f9c", marginTop: "4px", marginBottom: "4px" }}>Team B Pool:</Text>
                        <Text style={{ color: "#858f9c", marginTop: "4px", marginBottom: "4px" }}>Team A Odds:</Text>
                        <Text style={{ color: "#858f9c", marginTop: "4px", marginBottom: "4px" }}>Team B Odds:</Text>
                        <Text style={{ color: "#858f9c", marginTop: "4px", marginBottom: "4px" }}>Starts In:</Text>
>>>>>>> Stashed changes
                    </view>
                    <view
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
<<<<<<< Updated upstream
                            marginLeft: "5px",
                        }}
                    >
                        <p style={{ fontWeight: "bold" }}></p>
                        <p style={{ fontWeight: "bold" }}>
                            {pariObj ? pariObj.longPool : "0"}
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                            {pariObj ? pariObj.shortPool : "0"}
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                            {pariObj ? pariObj.longOdds : "0"}
                        </p>
                        <p style={{ fontWeight: "bold" }}>
                            {pariObj ? pariObj.shortOdds : "0"}
                        </p>
                        <p style={{ fontWeight: "bold" }}>{countDownTime}</p>
                    </view>
                </view>
                <view style={{marginTop:'20px'}}>
                   <PlacePositionBox pubkey={pariObj? pariObj.pubkey : 'Loading'}/>
=======
                            marginLeft: 5,
    
                        }}
                    >
                        <Text style={{ fontWeight: "600", color: "#e7e8ee", marginTop: "4px", marginBottom: "4px"}}>
                            {pariObj ? pariObj.longPool : "0"}
                        </Text>
                        <Text style={{ fontWeight: "600", color: "#e7e8ee", marginTop: "4px", marginBottom: "4px"}}>
                            {pariObj ? pariObj.shortPool : "0"}
                        </Text>
                        <Text style={{ fontWeight: "600", color: "#e7e8ee", marginTop: "4px", marginBottom: "4px"}}>
                            {pariObj ? pariObj.longOdds : "0"}
                        </Text>
                        <Text style={{ fontWeight: "600", color: "#e7e8ee", marginTop: "4px", marginBottom: "4px"}}>
                            {pariObj ? pariObj.shortOdds : "0"}
                        </Text>
                        <Text style={{ fontWeight: "600", color: "#e7e8ee", marginTop: "4px", marginBottom: "4px"}}>
                            {countDownTime}
                        </Text>
                    </view>
                </view>

                <view style={{marginTop:'40px'}}>
                    <Text style={{ color: "#848995", marginTop: "30px", marginBottom: "4px", marginRight: "16px", marginLeft: "16px"}}>Amount</Text>
                    <PlacePositionBox pubkey={pariObj? pariObj.pubkey : 'Loading'}/>
>>>>>>> Stashed changes
                </view>
            </view>
        </view>
    );
};
