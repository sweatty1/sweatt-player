
export function RenderTime(duration) {
    let hours = Math.floor(duration / 3600);
    let timeAfterHour = duration - hours * 3600;
    let minutes = Math.floor(timeAfterHour/60);
    let seconds = Math.floor(timeAfterHour - minutes * 60);
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    let textFormat = minutes+':'+seconds;
    if (hours > 0) {
        if (hours   < 10) {hours = "0"+hours;}
        textFormat = hours+':'+textFormat
    }
    return textFormat;
}