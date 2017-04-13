export function truncateString(str, numofchars, useWordBoundary) {
	if (str.length <= numofchars) {
		return str;
	}
	const subString = str.substr(0, numofchars-1);
	return (useWordBoundary
		? subString.substr(0, subString.lastIndexOf(' '))
		: subString) + "...";
}