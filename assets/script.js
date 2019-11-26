const now = moment();
const currentHour = now.hour();
$("#currentDay").text(now.format("ddd, MMM Do YYYY, h:mm A"));


const fromTime = now.clone().hour(9);
const toTime = now.clone().hour(22);

console.log(fromTime.format());
console.log(toTime.format());

let planner;
const LOCAL_STORAGE_KEY = 'planner';

const localStoragePlanner = localStorage.getItem(LOCAL_STORAGE_KEY);
if (localStoragePlanner !== null) {
      planner = JSON.parse(localStoragePlanner);
} else {
      planner = {};
}

for (let currentTime = fromTime.clone(); currentTime.isSameOrBefore(toTime); currentTime.add(1, 'h')) {
  // cloning the clone item
  console.log(currentTime.format());

  const hour = currentTime.hour();

  // Cloning the clone item
  const hourSection = $("#cloneItem").clone();

  // Modify the cloned hour section
  if (hour < currentHour) {
    hourSection.addClass('past');
  }
  if (hour === currentHour) {
    hourSection.addClass('present');
  }
  if (hour > currentHour) {
    hourSection.addClass('future');
  }

  //   modify the cloned hour section
  hourSection.removeAttr('id');
  hourSection.data(".hour", hour);
  hourSection.find(".hour").text(currentTime.format('hA'));

  if (planner[hour] !== undefined) {
    hourSection.find(".hour")(".memoContent").val(planner[hour]);
  }

  $(".plannerContainer").append(hourSection);
};

$("#clearPlannerButton").click(function () {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  location.reload();
});

$(".plannerContainer").on("click", "#saveButton", ".saveBtn", function () {
  const $parent = $(this).parent();
  const hour = $parent.data('hour');
  const userInput = $parent.find(".memoContent").val();
  planner[hour] = userInput;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(planner));
});


// $(".dayButtons").on("click", "#prevDayButton","#nextDayButton", function () {
//   const $parent = $(this).parent();
//   const hour = $parent.data('hour');
//   const userInput = $parent.find(".memoContent").val();
//   planner[day] = userInput;
//   localStorage.getItem(LOCAL_STORAGE_KEY, JSON.stringify(planner));
// });

