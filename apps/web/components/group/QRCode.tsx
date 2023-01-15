import * as React from 'react';
import QRCode from 'qrcode'

export interface IQrCodeProps {
    value: string;
}

function getRoundness(x: number, y: number, size: number): string {
   if (x === 0 && y === 0) {
    return 'rounded-tl-full'
    } else if (x === size - 1 && y === 0) {
    return 'rounded-tr-full'
    }
    else if (x === 0 && y === size - 1) {
    return 'rounded-bl-full'
    }
    else if (x === size - 1 && y === size - 1) {
    return 'rounded-br-full'
    }
    return ''
}
        

export function QrCode (props: IQrCodeProps):JSX.Element {
  const qrcode = QRCode.create(props.value, {})
  let qrcodeHTML: JSX.Element[]  = [];

  for (let y = 0; y < qrcode.modules.size; y++) {
    let row = []
    
    for (let x = 0; x < qrcode.modules.size; x++) {
     row.push(qrcode.modules.data[y*qrcode.modules.size+x] === 1 ? <span className={`h-full aspect-square bg-black dark:bg-white ${getRoundness(x,y,qrcode.modules.size)} `}/> : <span className={`h-full  aspect-square rounded-full dark:bg-black bg-white `}/>)
    }
    qrcodeHTML.push(<div className={`flex flex-row `} style={{height: `calc(1/${qrcode.modules.size}*100%)`}}>{row}</div>)

  
}
  return <>{qrcodeHTML}</>;
  
}