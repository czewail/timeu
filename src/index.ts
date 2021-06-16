

const units = {
  millisecond: {
    key: 'millisecond',
    value: 1,
    unit: 'ms'
  },
  second: {
    key: 'second',
    value: 1e3,
    unit: 'sec'
  },
  minute: {
    key: 'minute',
    value: 6e4,
    unit: 'minute'
  },
  hour: {
    key: 'hour',
    value: 3.6e6,
    unit: 'hour'
  },
  day: {
    key: 'day',
    value: 8.64e7,
    unit: 'day'
  },
  month: {
    key: 'month',
    value: 2.592e9,
    unit: 'month'
  },
  year: {
    key: 'year',
    value: 3.15576e10,
    unit: 'year'
  },
}

const orderUnits = [units.year, units.month, units.day, units.hour, units.minute, units.second, units.millisecond]

export interface TimeUOption {
  local?: {
    year?: string,
    month?: string,
    day?: string,
    hour?: string,
    minute?: string,
    second?: string,
    millisecond?: string,
  },
  prefix?: string,
  suffix?: string,
  midffix?: string,
}

export default function timeu(input: number, option: TimeUOption = {}) {
  let res = ''
  orderUnits.reduce((previousValue, currentValue) => {
    const less = previousValue
    if (less >= currentValue.value) {
      const integer = (less / currentValue.value) | 0
      const residue = less % currentValue.value
      res += `${option.prefix??''}${integer}${option.midffix??''}${(option.local as any)?.[currentValue.key] ?? currentValue.unit}${option.suffix??''}`
      return residue
    }
    return less
  }, input)

  return res
}