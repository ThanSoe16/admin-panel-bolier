export function CurrencyFormat(num: number): string {
  const str = num.toString();

  const [integer, decimalRaw] = str.split('.');
  let decimal = decimalRaw;

  const formattedInt = integer.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (decimal) {
    decimal = decimal.slice(0, 2); // limit to 4 decimals
    return `${formattedInt}.${decimal}`;
  }

  return formattedInt;
}
export function MMKCurrencyFormat(num: number): string {
  const integer = Math.round(num).toString();

  return integer.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function BalanceCurrencyFormat(num: number): string {
  const formattedNumber = num?.toFixed(2);
  return formattedNumber?.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
