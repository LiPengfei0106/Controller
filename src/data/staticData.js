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
  TV: 170
}

const configs = {
  needLogin : true,
  hasMovie : true,
  hasLive : true,
  canPay: false,
  controlType: 'ButtonControl',
  // remoteType: 'WildDog',
  remoteType: 'WeiXin_proxy',
  movieDiscount:50
}
export {keyCodes,configs}
