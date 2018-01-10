const keyCodes = {
  Up: 19,
  Down: 20,
  Left: 21,
  Right: 22,
  Back: 4,
  Ok: 23,
  VolUp: 24,
  VolDown: 25,
  Home: 135,
  Menu: 82,
  Mute: 164,
  TV: 170,
  Power: 26
}

const configs = {
  wxDebug : false,
  appid: 'wx811bcf31fe706795',
  needLogin : true,
  hasMovie : true,
  hasLive : true,
  canPay: false,
  controlType: 'ButtonControl',
  // remoteType: 'WildDog',
  remoteType: 'WeiXin_proxy',
  controlSender: 'new',
  movieDiscount:50
}
export {keyCodes,configs}
