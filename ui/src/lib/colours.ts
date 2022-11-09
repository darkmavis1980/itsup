// Converts any given HEX color to the relative RGB value
export const HexToRGB = (hex: string) => {
  if (!hex || hex === null) {
    throw new Error('This is not a valid hex');
  }

  if (hex.startsWith('#')) {
    hex = hex.substring(1);
  }

  if (hex.length !== 3 && hex.length !== 6) {
    throw new Error('This is not a valid hex');
  }

  return hex.match(hex.length === 6 ? /.{2}/g : /.{1}/g).map(color => {
    color = hex.length === 3 ? color + color : color;
    return parseInt(color, 16);
  });
};

export const RGBArrayToString = (rgb: Array<string>) => `rgb(${rgb.join(', ')})`;