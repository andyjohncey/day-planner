const now = moment().startOf('hour');
const currentHour = now.hour();
$("#currentDay").text(now.format("dddd, MMMM Do YYYY, h:mm:ss a"));


const fromTime = now.clone().hour(9);
const toTime = now.clone().hour(24);

console.log(fromTime.format());  
console.log(toTime.format());

for (let currentTime = fromTime.clone(); currentTime.isSameOrBefore(toTime); currentTime.add(1,'h'))    {
    // cloning the clone item
      console.log(currentTime.format());

    const hourSection = $("#cloneItem").clone();

    //   modify the cloned hour section
    hourSection .removeAttr('id');
    hourSection.data(".hour", currentTime.hour())
    hourSection.find(".hour").text(currentTime.format('hA'));

$(".plannerContainer").append(hourSection);
};
