import { PositionSideEnum } from '@hxronetwork/parimutuelsdk';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import PlacePosition from './PlacePosition'
<<<<<<< Updated upstream
=======
import { Input } from '@rneui/themed';
import { View } from 'react-native';
>>>>>>> Stashed changes

const PlacePositionBox: FC<{ pubkey: string }> = (props) => {
    const [inputValue, setInputValue] = useState('Enter Amount...');
    const [amount, setAmount] = useState('0')
    const { pubkey } = props

    useEffect(() => {
    }, [pubkey]);

    if (pubkey === 'Loading') {
        return (
            <view>
                Loading...
            </view>
        )
    }

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputValue(event.target.value);
        setAmount(event.target.value);
        if (!event.target.value) {
          setInputValue('Enter Amount...');
        }
    };
    
    return (
<<<<<<< Updated upstream
        <view style={{ textAlign: 'center' }}>
            <input
                type="number"
                value={inputValue}
                onChange={handleChange}
                placeholder={inputValue}
                style={{ color: 'black', Radius: '10px', display: 'inline-block', textAlign: 'center', }}
            />
            <view style={{ marginLeft: '-15px', marginTop: '10px' }}>
=======
        <View style={{ textAlign: 'center', gap: "4",  borderBottomWidth: "0px"}}>
                <Input
                    underlineColorAndroid ='transparent'
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={""}
                    style={{ 
                        marginTop: "8px", 
                        backgroundColor: "#28313d", 
                        borderRadius: '4px', 
                        display: 'inline-block', 
                        textAlign: 'center', 
                        color: "#e7e8ee", 
                        borderWidth: "1.5px",
                        borderColor: "#e7e8ee",
                    }}
                />

            <view style={{ marginLeft: '16px', marginRight: '16px',marginTop: '10px', borderBottomWidth: "0px",
                display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
            }}>
                {/* button for team A */}
>>>>>>> Stashed changes
                <PlacePosition amount={amount} pariPubkey={pubkey} side={PositionSideEnum.LONG}/>
                 {/* button for team B */}
                <PlacePosition amount={amount} pariPubkey={pubkey} side={PositionSideEnum.SHORT} />
            </view>
        </View>
    );
};

export default PlacePositionBox;
