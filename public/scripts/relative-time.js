const timeUnits = [
  {
    name: 'second',
    multipleOfPrevious: 1000,
  },
  {
    name: 'minute',
    multipleOfPrevious: 60,
  },
  {
    name: 'hour',
    multipleOfPrevious: 60,
  },
  {
    name: 'day',
    multipleOfPrevious: 24,
  },
  {
    name: 'week',
    multipleOfPrevious: 7,
  },
  {
    name: 'month',
    multipleOfPrevious: 4.3,
  },
  {
    name: 'year',
    multipleOfPrevious: 52,
  }
]

const getRelativeTime = function(timestamp) {
  let difference = Date.now() - timestamp;
  let roundedDifference;

  if (difference < 0) {
    return;
  }

  for (let i = 0; i < timeUnits.length; i++) {
    difference = difference / timeUnits[i].multipleOfPrevious;
    roundedDifference = Math.floor(difference);
    if (!timeUnits[i + 1] || difference < timeUnits[i + 1].multipleOfPrevious) {
      return `${roundedDifference} ${timeUnits[i].name}${roundedDifference === 1 ? '' : 's'} ago`
    }
  }
}