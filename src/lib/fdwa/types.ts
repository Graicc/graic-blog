export type State = Array<Array<string>>;
export type TransactionData =
	| {
			type: 'set';
			row: number;
			column: number;
			color: string;
	  }
	| {
			type: 'clear';
	  };
export type Transaction = {
	data: TransactionData;
	timestamp: Date;
	parent: Transaction | undefined;
};
