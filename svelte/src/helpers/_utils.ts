function readableTime(ms: number) {
	const seconds = addLeadingZero(Math.floor((ms / 1000) % 60));
	const minutes = addLeadingZero(Math.floor((ms / (1000 * 60)) % 60));
	const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
	return `${hours}:${minutes}:${seconds}`;
}

function addLeadingZero(time: number) {
	return (time < 10 ? '0' : '') + time;
}

export { readableTime };
