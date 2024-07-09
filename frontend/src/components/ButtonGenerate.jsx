import { FaSpinner } from "react-icons/fa";

export const	ButtonGenerate = ({caption, handleOnClick, loading}) => {

	return (
		<button
			className="button-generate"
			type="button"
			onClick={handleOnClick}
			disabled={loading}
		>
			{!loading ? caption : <FaSpinner />}
		</button>
	);
}
