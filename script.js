function takeStringAndReturnAdjustedString(srtString, speedRatioNumber)
{
    const timecodeRegex = /\d\d:\d\d:\d\d,\d\d\d/mg;

    let timecodeMatches;
    let adjustedSrtString = srtString;

    while( (timecodeMatches = timecodeRegex.exec(srtString)) !== null )
    {
        adjustedSrtString = replaceAt( srtString, timecodeMatches[0], timecodeAdjust(timecodeMatches[0]), timecodeMatches.index, (timecodeMatches.index + 12) )
    
    }

    

    return adjustedSrtString;
}

function replaceAt( inputString, searchForThis, replaceWithThis, indexStart, indexEnd )
{
    return inputString.slice(0, indexStart) + inputString.slice(indexStart, indexEnd).replace(searchForThis, replaceWithThis) + inputString.slice(indexEnd);
}

function convertTimecodeToSeconds(timecodeString)
{
    let hours = parseInt( timecodeString.slice(0,2) );
    let minutes = parseInt( timecodeString.slice(3,5) );
    let seconds = parseInt( timecodeString.slice(6,8) );
    let milliseconds = parseInt( timecodeString.slice(9,12) );

    /* console.log(hours);
    console.log(minutes);
    console.log(seconds);
    console.log(milliseconds); DEBUGGING */

    let timecodeNumber = hours*3600 + minutes*60 + seconds + milliseconds/1000;

    return timecodeNumber;
}

function convertSecondsToTimecode(timecodeNumber)
{
    
    return timecodeString;
}

function timecodeAdjust(timecodeString, speedRatioNumber)
{
    return convertSecondsToTimecode(speedRatioNumber*convertTimecodeToSeconds(timecodeString));
}