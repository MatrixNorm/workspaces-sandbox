import { fromDomEvent, map, filter } from "./myobservable";

const clicks = fromDomEvent(document.getElementById("btn"), "click");
const timestamps = map(clicks, evt => evt.timeStamp);
const xStream = map(timestamps, val => Math.floor(val));
const yStream = map(xStream, val => [val, val % 2]);
const zStream = map(timestamps, val => [val, Math.random()]);

const cleanUp = {};

cleanUp["clicks"] = clicks.subscribe({
  next: evt => console.log("clicks: ", evt)
});

cleanUp["timestamps"] = timestamps.subscribe({
  next: val => console.log("clickTimestamps: ", val)
});

cleanUp["x"] = xStream.subscribe({
  next: val => console.log("xStream: ", val)
});

cleanUp["y"] = yStream.subscribe({
  next: val => console.log("yStream: ", val)
});

cleanUp["z"] = zStream.subscribe({
  next: val => console.log("zStream: ", val)
});

window.cleanUp = cleanUp;