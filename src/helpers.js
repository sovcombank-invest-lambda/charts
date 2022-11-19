export function dataMap(data) {
  let mapped = []

  {
    let currentDate
    let dayData

    for (let i = data.length - 1; i >= 0; i--) {
      let item = data[i]

      if (currentDate !== item.created_at) {
        if (dayData) {
          mapped.push(dayData)
        }
        currentDate = item.created_at
        dayData = {
          name: new Date(currentDate).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }),
        }
      }

      dayData[item.symbol] = item.rate
    }
  }

  return mapped
}