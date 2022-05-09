function takeStringAndReturnAdjustedString(srtString, speedRatioNumber) //speedRatioNumber >1 slows down subtitles. <1 speeds them up.
{
    const timecodeRegex = /\d\d:\d\d:\d\d,\d\d\d/mg;

    let timecodeMatches;
    let adjustedSrtString = srtString; //Make a copy of the original srt file. Adjustments will be made on the copy

    while( (timecodeMatches = timecodeRegex.exec(srtString)) !== null ) //Goes through all timecodes in the original srt
    {
        adjustedSrtString = replaceAt( adjustedSrtString, timecodeMatches[0], timecodeAdjust(timecodeMatches[0], speedRatioNumber), timecodeMatches.index, (timecodeMatches.index + 12) )
        //^^Where there is a timecode in the original srt, adjust the timecode in the copy.
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

//DOM STUFF

let subtitles = "";
const fileReader = new FileReader();

fileReader.addEventListener("load", () => 
{
    subtitles = fileReader.result;
});

function updateSubtitles()
{
    let [subtitleFile] = document.querySelector('input[type=file]').files;
    if(subtitleFile)
    {
        fileReader.readAsText(subtitleFile);
    }
}
