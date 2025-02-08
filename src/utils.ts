export const getSlugFromTitle = (title: string): string => {
	return title.toLowerCase().replace(/[^0-9a-z ]/g, '').replace(/\s+/g, '-');
}

export const getDateStr = (date: any): string => {
	return new Date(date).toLocaleString('en-us', { year: 'numeric', month: 'numeric', day: 'numeric' });
}
