export default function deleteAtIndex (array, index, amount = 1) {
  return [].concat(
    array.slice(0, index),
    array.slice(index + amount)
  )
}
