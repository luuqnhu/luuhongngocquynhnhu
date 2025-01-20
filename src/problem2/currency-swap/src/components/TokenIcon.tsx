import ampLUNA from "../assets/icons/ampLUNA.svg";
import ATOM from "../assets/icons/ATOM.svg";
import axlUSDC from "../assets/icons/axlUSDC.svg";
import BLUR from "../assets/icons/BLUR.svg";
import bNEO from "../assets/icons/bNEO.svg";
import BUSD from "../assets/icons/BUSD.svg";
import ETH from "../assets/icons/ETH.svg";
import EVMOS from "../assets/icons/EVMOS.svg";
import GMX from "../assets/icons/GMX.svg";
import IBCX from "../assets/icons/IBCX.svg";
import IRIS from "../assets/icons/IRIS.svg";
import KUJI from "../assets/icons/KUJI.svg";
import LSI from "../assets/icons/LSI.svg";
import LUNA from "../assets/icons/LUNA.svg";
import OKB from "../assets/icons/OKB.svg";
import OKT from "../assets/icons/OKT.svg";
import RATOM from "../assets/icons/RATOM.svg";
import rSWTH from "../assets/icons/rSWTH.svg";
import STATOM from "../assets/icons/STATOM.svg";
import STEVMOS from "../assets/icons/STEVMOS.svg";
import STLUNA from "../assets/icons/STLUNA.svg";
import STOSMO from "../assets/icons/STOSMO.svg";
import STRD from "../assets/icons/STRD.svg";
import SWTH from "../assets/icons/SWTH.svg";
import USC from "../assets/icons/USC.svg";
import USD from "../assets/icons/USD.svg";
import USDC from "../assets/icons/USDC.svg";
import WBTC from "../assets/icons/WBTC.svg";
import wstETH from "../assets/icons/wstETH.svg";
import YieldUSD from "../assets/icons/YieldUSD.svg";
import ZIL from "../assets/icons/ZIL.svg";

const icons: Record<string, string> = {
  ampLUNA: ampLUNA,
  ATOM: ATOM,
  axlUSDC: axlUSDC,
  BLUR: BLUR,
  bNEO: bNEO,
  BUSD: BUSD,
  ETH: ETH,
  EVMOS: EVMOS,
  GMX: GMX,
  IBCX: IBCX,
  IRIS: IRIS,
  KUJI: KUJI,
  LSI: LSI,
  LUNA: LUNA,
  OKB: OKB,
  OKT: OKT,
  RATOM: RATOM,
  rSWTH: rSWTH,
  STATOM: STATOM,
  STEVMOS: STEVMOS,
  STLUNA: STLUNA,
  STOSMO: STOSMO,
  STRD: STRD,
  SWTH: SWTH,
  USC: USC,
  USD: USD,
  USDC: USDC,
  WBTC: WBTC,
  wstETH: wstETH,
  YieldUSD: YieldUSD,
  ZIL: ZIL,
};

export const TokenIcon = ({ token }: { token: string }) => {
  const Icon = icons[token];

  if (!Icon) {
    return <div>Icon not found</div>;
  }

  return <img src={Icon} alt={`${token} icon`} className="h-6 w-6" />;
};
