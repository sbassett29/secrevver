var peopleDivs = ['#a','#b','#c','#d'];

$(document).ready( function() {
    initDivs(peopleDivs)
});

$('#secrevver').click( function() {
    $(this).prop('disabled', true);
    $(this).css('background-color', '#eee');
    animateDivs(peopleDivs);

    setTimeout(function() {
        stopAllAndChoose(peopleDivs);
    }, 5000);
});

function initDivs(divIds) {
    if(divIds.constructor === Array) {
        var newLeft = 0;
        var newTop = 0;
        var prevTop = 0;
        var addPad = 10;
        for(var i = 0; i < divIds.length; i++) {
           newLeft = (newLeft > $(divIds[i]).width()) ? newLeft 
               : $(divIds[i]).width();
           newTop += prevTop; 
           $(divIds[i]).css({ top: newTop + 'px', left: '-' + (newLeft + addPad) + 'px' });
           prevTop = $(divIds[i]).height() + addPad;
        }
    }
}

function makeNewPosition(divId) {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $('#container').height() - $(divId).height();
    var w = $('#container').width() - $(divId).width();;
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh,nw];
}

function animateDivs(divIds) {
    if(divIds.constructor === Array) {
        for(var i = 0; i < divIds.length; i++) {
            animateDiv(divIds[i]);
        }
    }
}

function animateDiv(divId) {
    var newq = makeNewPosition(divId);
    $(divId).animate({ top: newq[0], left: newq[1] }, 300, function() {
        animateDiv(divId);
    });
}

function resetBoard() {
    $('#secrevver').click( function() { window.location.reload(); } );
    $('#secrevver').html('Let us try again!');
    $('#secrevver').prop('disabled', false);
    $('#secrevver').css('background-color', 'mediumaquamarine');
}

function stopAllAndChoose(divIds) {
    if(divIds.constructor === Array) {
        var selectedId = Math.floor(Math.random() * divIds.length);
        for(var i = 0; i < divIds.length; i++) {
           $(divIds[i]).stop();
           $(divIds[i]).clearQueue();
           if(i != selectedId)
           {
               $(divIds[i]).fadeOut().delay(5000);
           } 
        }
        $(divIds[selectedId]).css('position', 'absolute');
        $(divIds[selectedId]).animate({ fontSize: '120px', left: '10px', top: '5px' }, 2000);
        resetBoard();
    }
}
