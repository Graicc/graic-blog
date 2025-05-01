export type State = Array<Array<string>>;
export type TransactionData =
	| {
			type: 'set';
			row: number;
			column: number;
			color: string;
	  }
	| {
			type: 'fill';
			row: number;
			column: number;
			color: string;
	  };
export type Transaction = {
	data: TransactionData;
	timestamp: Date;
	parent: Transaction | undefined;
};
