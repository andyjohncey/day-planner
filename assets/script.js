const now = moment();
const currentHour = now.hour();
// $("#currentDay").text(now.format("dddd, MMMM Do YYYY, h:mm A"));

function updateTime() {
  $("#currentDay").text(moment().format("dddd, MMMM Do h:mm:ss a"));
};
updateTime();
setInterval(updateTime, 1000);


const fromTime = now.clone().hour(7);
const toTime = now.clone().hour(18);

console.log(fromTime.format());
console.log(toTime.format());

// const submit = document.querySelector('.hourSection-submit');
// const memoList = document.querySelector('.memos');
// const memoInput =('$.memo-input');
const submit = $('.hoursection-submit')
const memoInput = $('.memoContent').val();
const memo = $('.memoContent')
let planner = {};


$(".plannerContainer").on("click", ".saveBtn", function () {
  const text = $(this).parents('.hourSection').find('.memoContent').val();
  const hour = $(this).parents('.hourSection').data('hour');
  planner[hour] = text;

  localStorage.setItem('memo', JSON.stringify(planner));
});


const savedString = localStorage.getItem('memo');
const save = JSON.parse(savedString);

if (save !== null) {
  planner = save;
}

for (let currentTime = fromTime.clone(); currentTime.isSameOrBefore(toTime); currentTime.add(1, 'h')) {
  // cloning the clone item


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
  hourSection.data("hour", hour);

  hourSection.find(".hour").text(currentTime.format('hA'));
  if (planner[hour] !== undefined) {
    hourSection.find('.memoContent').val(planner[hour]);
  }

  $(".plannerContainer").append(hourSection);
};

$("#clearPlannerBtn").on("click", function () {
  localStorage.clear(memo);
  location.reload();
});

$("#cloneItem").click((function () {
  event.preventDefault();
  const target = $(event.target);
  if (target.hasClass('hour')) {
    target.removeClass('hour');
    target.addClass('hours')
    console.log('saving memo');

    const memo = $(this).find(".memoContent").text();
    const localStorage = localStorage.getItem('memo');
    const storage = localStorage('memo', JSON.parse(".memoContent").innerHTML);

    localStorage.setItem('memo', JSON.stringify('.memoContent').innerHTML);
  }
}));
