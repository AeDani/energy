document.querySelector('#generate').addEventListener('click', e => {
	const elOutput = document.querySelector('#time-stamps');
	const elError = document.querySelector('#input-error');

	// clear text
	elOutput.innerHTML = '';
	elError.innerHTML = '';

	// Generate timestamps array
	const start = new Date(document.querySelector('#date-time-start').value);
	const end = new Date(document.querySelector('#date-time-end').value);
	const granularity = parseInt(document.querySelector('#granularity').value);

	try {
		const ts = Energy.generateTimeStamps(start, end, granularity);
		ts.forEach(date => {
			const li = document.createElement('li');

			// add each date to a li
			const outDate = moment(date).format('DD MM YYYY HH:mm');
			const outDayOfWeek = moment(date).day();
			const outIsPeak = Energy.isPeak(date, 0, granularity);
			li.innerText = `${outDate}; ${outDayOfWeek}; ${outIsPeak}`;
			elOutput.appendChild(li);
		});
	} catch (error) {
		return (elError.innerText = error);
	}
});
