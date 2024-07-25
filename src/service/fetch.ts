export default async function fetchRequest(url: string) {
  try {
    const response = await fetch(url)
    const answer = await response.json()
    return answer
  } catch (err) {
    console.log(err)
    return false
  }
}
