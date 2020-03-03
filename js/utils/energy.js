/**
 * Utility class for energy calculations in power trading
 */
class Energy {
	/**
	 * peak or off-peak flag for a single time stamp
	 * @param {Date} timeStamp The time stamp to check if it is peak or off peak hour
	 * @param {Number} fromOrToTime 0=Von-Zeit, 1=Bis-Zeit
	 * @param {Number} timeGranularity 0=1h, 1=1/4h
	 * @return {Number} 0=isOffPeak 1=isPeak
	 */
	static isPeak(timeStamp, fromOrToTime, timeGranularity) {
		// input validation
		if (fromOrToTime !== 1 && fromOrToTime !== 0) {
			throw new Error(
				`fromOrToTime not set to 0 or 1 - Value is ${fromOrToTime}`
			);
		}

		// input validation
		if (timeGranularity !== 1 && timeGranularity !== 0) {
			throw new Error(
				`timeGranularity not set to 0 or 1 - Value is ${timeGranularity}`
			);
		}

		// set time stamp to Von-Zeit for all further calculations
		let tsFromTime = new Date();
		if (fromOrToTime === 0) {
			// Von-Zeit
			tsFromTime.setTime(timeStamp);
		} else if (fromOrToTime === 1) {
			// Bis-Zeit Korrektur
			const add = Energy.timeInMilliseconds(timeGranularity);
			tsFromTime.setTime(timeStamp.getTime() - add);
		}

		// check the weekdays Sunday - Saturday : 0 - 6
		const weekday = tsFromTime.getDay();
		if (weekday === 0 || weekday === 6) {
			return 0;
		}

		// check the hours
		const hour = tsFromTime.getHours();
		if (hour >= 8 && hour < 20) {
			return 1;
		} else {
			return 0;
		}
	}

	/**
	 * Generates time stamps between start and end time accoding to granualrity.
	 * @param {Date} start The time stamp to start the generation of time stamps
	 * @param {Date} end The time stamp to end the generation of time stamps
	 * @param {Number} timeGranularity 0=1h, 1=1/4h
	 * @return {Date[]} array with date strings of type dd.mm.yyyy HH:MM
	 */
	static generateTimeStamps(start, end, timeGranularity = 0) {
		if (!(start < end)) {
			throw new Error(
				`start has to be smaller than end - start: ${start} - end: ${end}`
			);
		}

		const timeStamps = [];
		const add = Energy.timeInMilliseconds(timeGranularity);
		while (start < end) {
			timeStamps.push(start);
			start = new Date(start);
			start.setTime(start.getTime() + add);
		}
		return timeStamps;
	}

	/**
	 * Dates of day light saving time for a given year
	 * @param {Number} year the year as yyyy to get the dst dates for
	 * @return {Date[]} array with two day light saving time dates of the year
	 */
	static dstDates(year) {
		function lastSundayOfMonth(date) {
			date.setDate(date.getDate() - date.getDay());
			return date;
		}

		const dstDates = [];
		// Spring - March
		const eOfMarch = new Date(year, 2, 31);
		dstDates.push(lastSundayOfMonth(eOfMarch));
		// Autumn - Oct
		const eOfOct = new Date(year, 9, 31);
		dstDates.push(lastSundayOfMonth(eOfOct));
		return dstDates;
	}

	/**
	 * Milliseconds for a hour or a quarter hour
	 * @param {Number} timeGranularity 0 for a 1h, 1 for a 1/4h
	 * @return {Number} milliseconds for a hour or a quarter hour
	 */
	static timeInMilliseconds(timeGranularity) {
		return timeGranularity === 0 ? 60 * 60 * 1000 : (60 * 60 * 1000) / 4;
	}
}
