export function createChartData(values: number[]): any[] {
	const BINS = 15;
	const mx_val = Math.max(...values);
	const mn_val = Math.min(...values);

	const step = (mx_val - mn_val) / BINS;

	const result: any[] = [];

	for(let i = 0; i < BINS; i++) {
		const start_val = mn_val + i * step;
		const end_val = mn_val + (i + 1) * step;
		let cnt_values = 0;

		for(let v of values) {
			if(v >= start_val && v < end_val)
				cnt_values++;
		}

		result.push({
			name: ((start_val + end_val) / 2).toFixed(0),
			one: cnt_values,
		});
	}

	return result;
}
