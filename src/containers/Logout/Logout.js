import { useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/authActions";

const Logout = ({ logout }) => {
	useEffect(() => {
		logout();
		window.location.reload();
	}, [logout]);

	return null;
};

const mapDispatchToProps = {
	logout: actions.signOut
};

export default connect(null, mapDispatchToProps)(Logout);
