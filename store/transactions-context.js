import { createContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const DUMMY_TRANSACTIONS = [
	{
		id: "e1",
		description: "Toilet Paper",
		amount: -94.12,
		date: new Date("2025-03-09"),
		user: "Vik",
	},
	{
		id: "e2",
		description: "New TV",
		amount: -799.49,
		date: new Date("2025-03-08"),
		user: "Aiste",
	},
	{
		id: "e3",
		description: "Car Insurance",
		amount: -294.67,
		date: new Date("2025-02-11"),
		user: "Vik",
	},
	{
		id: "e4",
		description: "New Desk (Wooden)",
		amount: -450,
		date: new Date("2025-02-06"),
		user: "Vik",
	},
	{
		id: "e5",
		description: "Sold product",
		amount: 50,
		date: new Date("2025-03-09"),
		user: "Aiste",
	},
	{
		id: "e6",
		description: "Sold product",
		amount: 4500,
		date: new Date("2025-03-09"),
		user: "Vik",
	},
];

export const TransactionsContext = createContext({
	transactions: [],
	addTransaction: ({ description, amount, date }) => {},
	updateTransaction: (id, { description, amount, date }) => {},
	deleteTransaction: ({ id }) => {},
});

function transactionReducer(state, action) {
	switch (action.type) {
		case "ADD":
			const id = uuidv4();
			return [{ ...action.payload, id }, ...state];
		case "UPDATE":
			const updatableTransactionIndex = state.findIndex(
				(transaction) => transaction.id === action.payload.id
			);
			const updatableTransaction = state[updatableTransactionIndex];
			const updatedTransaction = {
				...updatableTransaction,
				...action.payload.data,
			};
			const updatedTransactions = [...state];
			updatedTransactions[updatableTransactionIndex] = updatedTransaction;
			return updatedTransactions;
		case "DELETE":
			return state.filter(
				(transaction) => transaction.id !== action.payload
			);

		default:
			return state;
	}
}

function TransactionsContextProvider({ children }) {
	const [transactionsState, dispatch] = useReducer(
		transactionReducer,
		DUMMY_TRANSACTIONS
	);

	function addTransaction(transactionData) {
		dispatch({ type: "ADD", payload: transactionData });
	}
	function deleteTransaction(id) {
		dispatch({ type: "DELETE", payload: id });
	}
	function updateTransaction(id, transactionData) {
		dispatch({ type: "UPDATE", payload: { id, transactionData } });
	}

	const value = {
		transactions: transactionsState,
		addTransaction,
		deleteTransaction,
		updateTransaction,
	};

	return (
		<TransactionsContext.Provider value={value}>
			{children}
		</TransactionsContext.Provider>
	);
}

export default TransactionsContextProvider;
