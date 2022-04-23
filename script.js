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