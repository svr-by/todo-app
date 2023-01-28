export function formatedDate(timeStamp) {
  const date = new Date(timeStamp);
  return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

export function createInputId(label) {
  return `todo_${label.toLowerCase().split(' ').join('_')}`;
}
