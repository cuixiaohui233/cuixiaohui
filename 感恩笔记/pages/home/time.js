function formatTime(){
  let date = new Date();
  const month = date.getMonth() + 1
  const day = date.getDate();
  return [month, day];
}
const time = formatTime();
module.exports = {
  formatTime: time
}