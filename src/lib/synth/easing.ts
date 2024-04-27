export function cubicEaseIn(input: number, steepness = 10) {
	return input == 0 ? 0 : Math.pow(2, steepness * input - steepness);
}

export function cubicEaseOut(input: number, steepness = 10) {
	return input == 1 ? 1 : 1 - Math.pow(2, -steepness * input);
}
