import { PositionSideEnum } from '@hxronetwork/parimutuelsdk';
import React, { FC, useState } from 'react';
import { useEffect } from 'react';
import PlacePosition from './PlacePosition'
import { Input } from '@rneui/themed';

const PlacePositionBox: FC<{ pubkey: string }> = (props) => {
    const [inputValue, setInputValue] = useState();
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
          setInputValue('');
        }
    };
    
    return (
        <view style={{ textAlign: 'center', gap: "4" }}>
            <Input
                type="number"
                value={inputValue}
                onChange={handleChange}
                placeholder={"Enter Amount..."}
                style={{ color: 'white'   ,Radius: '10px', display: 'inline-block', textAlign: 'center', border: "black"}}
            />
            <view style={{ marginLeft: '-15px', marginTop: '10px' }}>
                <PlacePosition amount={amount} pariPubkey={pubkey} side={PositionSideEnum.LONG}/>
                <PlacePosition amount={amount} pariPubkey={pubkey} side={PositionSideEnum.SHORT} />
            </view>
        </view>
    );
};

export default PlacePositionBox;
