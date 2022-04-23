function takeStringAndReturnAdjustedString(srtString, speedRatioNumber)
{
    const timecodeRegex = /(\d\d:\d\d:\d\d,\d\d\d)/mg;

    let timecodeArray = srtString.match(timecodeRegex);
    
    let adjustedTimecodeArray = timecodeArray;

    timecodeArray.forEach( (element, index) => adjustedTimecodeArray[index] = timecodeAdjust(element) );

    

    /* return adjustedSrtString; */
}

function convertTimecodeToSeconds(timecodeString)
{
    return timecodeNumber;
}

function convertSecondsToTimecode(timecodeNumber)
{
    return timecodeString;
}

function timecodeAdjust(timecodeString)
{
    return adjustedTimecodeString;
}