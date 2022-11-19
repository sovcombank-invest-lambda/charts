export async function fetchChartData(startDate, endDate) {
  try {
    let response = await fetch('http://92.63.102.99:8000/exchange_rates?' + new URLSearchParams({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString()
    }))
    if (!response.ok) throw Error(response.statusText)
    response = await response.json()
    return response
  } catch (e) {
    console.error(e)
  }
}