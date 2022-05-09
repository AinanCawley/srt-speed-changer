function takeStringAndReturnAdjustedString(srtString, speedRatioNumber)
{
    const timecodeRegex = /\d\d:\d\d:\d\d,\d\d\d/mg;

    let timecodeMatches;
    let adjustedSrtString = srtString;

    while( (timecodeMatches = timecodeRegex.exec(srtString)) !== null )
    {
        adjustedSrtString = replaceAt( adjustedSrtString, timecodeMatches[0], timecodeAdjust(timecodeMatches[0], speedRatioNumber), timecodeMatches.index, (timecodeMatches.index + 12) )
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

    let timecodeNumber = hours*3600 + minutes*60 + seconds + milliseconds/1000;

    return timecodeNumber;
}

function convertSecondsToTimecode(timecodeNumber)
{
    let hours = Math.floor(timecodeNumber/3600);
    timecodeNumber = timecodeNumber - hours * 3600;

    let minutes = Math.floor(timecodeNumber/60);
    timecodeNumber = timecodeNumber - minutes * 60;

    let seconds = Math.floor(timecodeNumber);
    timecodeNumber = timecodeNumber - seconds;

    let milliseconds = Math.floor(timecodeNumber * 1000 );


    hours = hours.toString();
    minutes = minutes.toString();
    seconds = seconds.toString();
    milliseconds = milliseconds.toString();

    hours = hours.padStart(2, "0");
    minutes = minutes.padStart(2, "0");
    seconds = seconds.padStart(2, "0");
    milliseconds = milliseconds.padStart(3, "0");

    let timecodeString = hours + ":" + minutes + ":" + seconds + "," + milliseconds;
    return timecodeString;
}

function timecodeAdjust(timecodeString, speedRatioNumber)
{
    return convertSecondsToTimecode(speedRatioNumber*convertTimecodeToSeconds(timecodeString));
}