export interface Todo {
	id: number;
	title: string;
	completed: boolean;
}

export const formatDate = (date: Date): string => {
	return date.toISOString().split("T")[0];
};
