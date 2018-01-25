const map = require('lodash').map
// const assert = require('chai').assert

function sortRanges (ranges) {
  const sorted = []

  ranges.map((years, index) => {
    const [birth, death] = years
    sorted.push([])

    for (let i = birth; i <= death; i++) {
      sorted[index].push(i)
    }
  })

  sorted.sort((a, b) => {
    a.sort()

    return a[0] - b[0]
  })

  return sorted
}

function getHighestYear (years) {
  let highest = 0

  years.map((range) => {
    const high = Math.max(...range)

    if (high > highest) {
      highest = high    
    }
  })
  
  return highest
}

function getYearsWithHighestPopulation (input) {
  const ranges = sortRanges(input)
  const lowestYear = ranges[0][0]
  const highestYear = getHighestYear(ranges)
  const histogram = {}

  for (let i = lowestYear; i <= highestYear; i++) {
    histogram[i] = 0

    ranges.map(years => {
      if (years.includes(i)) {
        histogram[i] += 1
      }
    })
  }

  const highestPopulation = Math.max(...map(histogram, value => value))
  const yearsWithHighestPop = []

  map(histogram, (value, key) => {
    if (value === highestPopulation) {
      return yearsWithHighestPop.push(key)
    }
  })

  return yearsWithHighestPop
}

const results = getYearsWithHighestPopulation([[1920, 1939], [1911, 1944], [1920, 1955], [1938, 1939]])

// assert.equal(results[0], 1938)
// assert.equal(results[1], 1939)

console.log(results)
