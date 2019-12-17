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

        $(e).css('width', "0px");
        $(e).animate({
            width: r + "%"
        }, 400);
        arr.push(r);
        top_dist.push($(e).offset().top);

    }
    $('.graph').css('padding-bottom', (top_dist[ARR_SIZE - 1] + 15) + 'px');


}
//selection button
$($selectionSortBtn).on('click', function() {
        if (!isActive) {
            isActive = true;
            selectionSort(0);
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
    if (!isActive) {
        isActive = true;
        arr = [];
        $element = [];
        start();
        rearange();
    }
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

//innerSelection Sort
let selectionSortMin;

function innerSelectionSort(j) {
    if (!$element[j].hasClass('sorted')) {
        $element[j].addClass('active');
    }

    if (j >= ARR_SIZE) {

        return;
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

    if (i >= ARR_SIZE) {
        return;
    }

    selectionSortMin = i;
    $element[selectionSortMin].addClass('sorted');

    innerSelectionSort(i);
    setTimeout(() => {
        console.log(i + "   " + selectionSortMin);
        swap(arr, i, selectionSortMin);
        setTimeout(() => {
            selectionSort(i + 1);
        }, 400);

    }, SPEED + 450);

}


//slide d to pos y
function slide(d, pos) {
    $(d).animate({ top: pos + 'px' }, 400);
}
//SelectionSwap
function swap(a, i, min) {
    let temp = a[i];
    a[i] = a[min];
    a[min] = temp;



    slide($element[min], top_dist[i]);
    slide($element[i], top_dist[min]);

    $element[min].addClass('sorted');
    if ($element[ARR_SIZE - 2].hasClass('sorted') && $element[ARR_SIZE - 3].hasClass('sorted') && $element[0].hasClass('sorted') && $element[ARR_SIZE - 4].hasClass('sorted')) {
        $element[ARR_SIZE - 1].addClass('sorted');
        isActive = false;
    }

    let tempE = $element[i];
    $element[i] = $element[min];
    $element[min] = tempE;


    console.log(arr);
}
$(document).ready(main);