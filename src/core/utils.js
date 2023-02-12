export function formatedDate(timeStamp) {
  const date = new Date(timeStamp);
  const month = date.getMonth() + 1;
  return `${date.getFullYear()}-${month > 9 ? month : '0' + month}-${date.getDate()}`;
}

export function createInputId(label) {
  return `todo_${label.toLowerCase().split(' ').join('_')}`;
}
