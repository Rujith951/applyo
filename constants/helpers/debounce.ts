type DebounceType<T extends (...args: any[]) => void> = {
	callback: T;
	delay?: number;
};

export function debounce<T extends (...args: any[]) => void>(
	callback: T,
	delay: number = 300
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			callback(...args);
		}, delay);
	};
}
