'use strict';

const MAX_NUMBER = 100;
const ARR_SIZE = 12;

let arr = [];
let $element = [];
let top_dist = [];

const $selectionSortBtn = $('#selectionSortBtn');
const $speedLabel = $('#speedLabel');

let SPEED = 2500;
let isActive = false;
let stop = false;

function main() {
    start();
    getPosY();
}

//get Y
function getPosY() {
    for (let i = 0; i < ARR_SIZE; i++) {
        $($element[i]).css({

            position: 'absolute',
            top: top_dist[i] + 'px'
        });
    }
}
//rearange
function rearange() {
    for (let i = 0; i < ARR_SIZE; i++) {
        $($element[i]).css({
            top: top_dist[i] + 'px'
        });
    }
}

//creating arrays
function start() {
    isActive = false;
    for (let i = 0; i < ARR_SIZE; i++) {

        let r = Math.floor(Math.random() * MAX_NUMBER) + 1;
        $($element[i]).css('display', '');
        let e = "#element" + (i + 1);

        $element.push($(e));
        $(e).html("&nbsp" + r + " ");
        $(e).removeClass('sorted');
        $(e).removeClass('active');

        $(e).css('width', "0px");
        $(e).animate({
            width: r + "%"
        }, 400);
        arr.push(r);
        // ($(window).height() / 4.5)
        top_dist.push($(e).offset().top - 100);

    }
    $('.graph').css('padding-bottom', (top_dist[ARR_SIZE - 1] + 15) + 'px');


}

$('#bubleSortBtn').on('click', function() {
        if (!isActive) {
            isActive = true;
            bubleSort(0);
        }
    })
    //selection button
$($selectionSortBtn).on('click', function() {
    if (!isActive) {
        isActive = true;
        selectionSort(0);
    }
})
$('#insertionSortBtn').on('click', function() {
    if (!isActive) {
        isActive = true;

        insertionSort(0);
        console.log(arr);
    }
})

//merge button
$('#mergeSort').on('click', function() {
    if (!isActive) {
        isActive = true;
        arr = mergeSort(arr);
        console.log(arr);
    }
})

//shuffle button
$('#shuffleBtn').on('click', () => {

    setTimeout(() => {
        if (!isActive) {
            isActive = true;
            arr = [];
            $element = [];
            start();
            rearange();
        }
    }, 200);
})
let STOPTIMER = 1;
//stop button
function stopBtnClick() {
    stop = true;
    STOPTIMER = Infinity;
}
$('#stopBtn').on('click', () => {
        stopBtnClick();
    })
    //continue continueBtn
$('#continueBtn').on('click', () => {
    stop = false;
    STOPTIMER = 1;
})

//set speed
$('#speedBtn025x').on('click', () => {
    $speedLabel.html('Speed: 0.25x');
    SPEED = 5000;
})
$('#speedBtn050x').on('click', () => {
    $speedLabel.html('Speed: 0.5x');
    SPEED = 2500;
})
$('#speedBtn1x').on('click', () => {
    $speedLabel.html('Speed: 1x');
    SPEED = 1250;
})
$('#speedBtn2x').on('click', () => {
    $speedLabel.html('Speed: 2x');
    SPEED = 700;
})

//size
$('#sizeChanger').on('mouseup', () => {
    alert($('#sizeChanger').innerHTMl);
})

//innerInsertionSort
function innerInsertionSort(i, j) {
    if (!stop) {

        setTimeout(() => {
            if (j >= 0 && arr[i] > arr[j]) {


                swap(arr, i, j, true);
                innerInsertionSort(i - 1, i);

            } else {
                $element[j].addClass('sorted');
                return;
            }
        }, STOPTIMER);
    } else {
        setTimeout(() => {
            innerSelectionSort(i, j);
        }, 1000);
    }

}

//insertion sort    
function insertionSort(i) {
    if (!stop) {
        setTimeout(() => {
            if (i >= ARR_SIZE) {
                isActive = false;
                return;
            }
            innerInsertionSort(i - 1, i);
            console.log(arr + "   " + i);
            setTimeout(() => {
                $element[i].addClass('sorted');
                insertionSort(i + 1);
            }, SPEED - ((ARR_SIZE - i) * (SPEED / 20)));
        }, STOPTIMER);
    } else {
        setTimeout(() => {
            insertionSort(i);
        }, 1000);
    }
}
let bubleSortStopTimer = 1;
///buble sort 
function bubleSort(i) {

    if (!stop) {
        if (i >= ARR_SIZE) {
            $($element[ARR_SIZE - 1].addClass('sorted'));
            setTimeout(() => {
                isActive = false;

                return;
            }, 200);

        } else {
            $($element[i].addClass('sorted'));

            innerBubleSort(i, i + 1);

            setTimeout(() => {

                $($element[i].removeClass('active'));
                bubleSort(i + 1);
            }, SPEED * 2.7);
        }
    } else {
        setTimeout(() => {
            bubleSort(i);
        }, 1000);
    }

}


//innerBubleSort
function innerBubleSort(i, j) {

    if (j >= ARR_SIZE) {
        return;
    }
    $($element[j].addClass('active'));

    setTimeout(() => {
        if (arr[j] < arr[i]) {
            $($element[i].removeClass('sorted'));
            swap(arr, i, j, false);
        }

        $($element[j].removeClass('active'));

        innerBubleSort(i, j + 1);
    }, SPEED / 4);

}

function getJ(j) {
    return j;
}
//mergeSort
function mergeSort(a) {
    if (a.length == 1) {
        return a;
    }
    let m = Math.floor(a.length / 2);
    let l = a.slice(0, m);
    let r = a.slice(m);
    let ans = merge(mergeSort(l), mergeSort(r));
    return ans;

}
//merge
function merge(l, r) {
    let a = 0,
        b = 0;
    let temp = [];
    while (a < l.length && b < r.length) {
        if (l[a] < r[b]) {
            temp.push(l[a]);
            a++;
        } else {
            temp.push(r[b]);
            b++;
        }

    }
    if (a < l.length) {
        for (let q = a; q < l.length; q++) {
            temp.push(l[q]);
        }
    } else {
        for (let q = b; q < r.length; q++) {
            temp.push(r[q]);
        }
    }

    return temp;
}

//merge swapAnimation
function mergeSwap(min, i) {

    slide($element[min], top_dist[i]);
    slide($element[i], top_dist[min]);

    $element[min].addClass('sorted');
    if ($element[ARR_SIZE - 2].hasClass('sorted') && $element[ARR_SIZE - 3].hasClass('sorted') && $element[0].hasClass('sorted') && $element[ARR_SIZE - 4].hasClass('sorted')) {
        $element[ARR_SIZE - 1].addClass('sorted');
        setTimeout(() => {
            isActive = false;
        }, 400);
    }

    let tempE = $element[i];
    $element[i] = $element[min];
    $element[min] = tempE;


    console.log(arr);
}

//innerSelection Sort
let selectionSortMin;

function innerSelectionSort(j) {

    if (j >= ARR_SIZE) {

        return;
    }
    if (!$element[j].hasClass('sorted')) {
        $element[j].addClass('active');
    }
    if (arr[j] < arr[selectionSortMin]) {
        $element[j].addClass('sorted');
        $element[selectionSortMin].removeClass('sorted');
        selectionSortMin = j;
    }
    setTimeout(() => {

        $element[j].removeClass('active');
        innerSelectionSort(j + 1);

    }, SPEED / (ARR_SIZE - 1));



}

//selectionSort
function selectionSort(i) {
    if (!stop) {
        if (i >= ARR_SIZE) {
            $element[ARR_SIZE - 1].addClass('sorted');
            setTimeout(() => {
                isActive = false;

                return;
            }, 200);
        } else {
            selectionSortMin = i;
            $element[selectionSortMin].addClass('sorted');

            innerSelectionSort(i);
            setTimeout(() => {
                console.log(i + "   " + selectionSortMin);
                swap(arr, i, selectionSortMin, false);
                setTimeout(() => {
                    selectionSort(i + 1);
                }, 400);

            }, SPEED + 300);
        }

    } else {
        setTimeout(() => {
            selectionSort(i);
        }, 1000);
    }
}


//slide d to pos y
function slide(d, pos) {
    $(d).animate({ top: pos + 'px' }, SPEED / 5);
}
//faster slide
function fasterSlide(d, pos) {
    $(d).animate({ top: pos + 'px' }, SPEED / 9);
}
//SelectionSwap
function swap(a, i, min, fast) {
    let temp = a[i];
    a[i] = a[min];
    a[min] = temp;

    if (fast) {
        fasterSlide($element[min], top_dist[i]);
        fasterSlide($element[i], top_dist[min]);
    } else {
        slide($element[min], top_dist[i]);
        slide($element[i], top_dist[min]);
    }

    $element[min].addClass('sorted');

    let tempE = $element[i];
    $element[i] = $element[min];
    $element[min] = tempE;

}

$(document).ready(main);