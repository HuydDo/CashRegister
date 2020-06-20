function checkCashRegister(price, cash, cid) {
  var output = { status: null, change: [] };
  var change = cash - price;
  var register = cid.reduce(
    function(acc, curr) {
      acc.total += curr[1];
      acc[curr[0]] = curr[1];
      return acc;
    }, { total: 0 });
    
  if (register.total === change) {
    output.status = 'CLOSED';
    output.change = cid;
    return output;
  }
  if (register.total < change) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }
  var change_arr = value.reduce(function(acc, curr) {
    var value = 0;
    while (register[curr.bill] > 0 && change >= curr.val) {
      change -= curr.val;
      register[curr.bill] -= curr.val;
      value += curr.val;
      change = Math.round(change * 100) / 100;
    }
    if (value > 0) {
      acc.push([curr.bill, value]);
    }
    return acc;
  }, []);
  if (change_arr.length < 1 || change > 0) {
    output.status = 'INSUFFICIENT_FUNDS';
    return output;
  }
  output.status = 'OPEN';
  output.change = change_arr;
  return output;
}
var value = [
  { bill: 'ONE HUNDRED', val: 100 },
  { bill: 'TWENTY', val: 20 },
  { bill: 'TEN', val: 10 },
  { bill: 'FIVE', val: 5 },
  { bill: 'ONE', val: 1 },
  { bill: 'QUARTER', val: 0.25 },
  { bill: 'DIME', val: 0.1 },
  { bill: 'NICKEL', val: 0.05 },
  { bill: 'PENNY', val: 0.01 },
];

checkCashRegister(19.5, 20, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100],
]);