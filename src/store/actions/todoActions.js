import * as actions from "./actionTypes";

// Add a todo
export const addTodo = data => async (dispatch, getState, { getFirestore }) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.ADD_TODO_START });
	try {
		const res = await firestore
			.collection("todos")
			.doc(userId)
			.get();
		const newTodo = {
			id: new Date().valueOf(),
			title: data.title,
			content: data.content
		};
		if (!res.data()) {
			console.log("got here");
			firestore
				.collection("todos")
				.doc(userId)
				.set({
					todos: [newTodo]
				});
		} else {
			firestore
				.collection("todos")
				.doc(userId)
				.update({
					todos: [...res.data().todos, newTodo]
				});
		}
		dispatch({ type: actions.ADD_TODO_SUCCESS });
		return true;
	} catch (err) {
		dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
	}
};

// Delete todo
export const deleteTodo = id => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.DELETE_TODO_START });
	try {
		const res = await firestore
			.collection("todos")
			.doc(userId)
			.get();
		const previousTodos = res.data().todos;
		const newTodos = previousTodos.filter(todo => todo.id !== id);
		await firestore
			.collection("todos")
			.doc(userId)
			.update({
				todos: newTodos
			});
		dispatch({ type: actions.DELETE_TODO_SUCCESS });
	} catch (err) {
		dispatch({ type: actions.DELETE_TODO_FAIL, payload: err.message });
	}
};

// edit todo
export const editTodo = (id, data) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const userId = getState().firebase.auth.uid;
	dispatch({ type: actions.ADD_TODO_START });
	try {
		const res = await firestore
			.collection("todos")
			.doc(userId)
			.get();
		const todos = res.data().todos;
		const index = todos.findIndex(todo => todo.id === id);
		todos[index].title = data.title;
		todos[index].content = data.content;

		await firestore
			.collection("todos")
			.doc(userId)
			.update({
				todos
			});
		dispatch({ type: actions.ADD_TODO_SUCCESS });
		return true;
	} catch (err) {
		dispatch({ type: actions.ADD_TODO_FAIL, payload: err.message });
	}
};
// export const addTodo = todo => {
// 	console.log("REACHED ACTION WITH TITLE: " + todo.title);
// 	return (dispatch, getState, getFirebase) => {
// 		console.log("REACHED ACTION WITH TITLE: ");
// 		return dispatch({
// 			type: "CREATE_TODO_SUCCESS",
// 			todo
// 		});
// 	};
// };
