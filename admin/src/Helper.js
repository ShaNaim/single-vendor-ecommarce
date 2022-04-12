import { useSnackbar } from "notistack";
import Slide from "@material-ui/core/Slide";

export const useNotifier = (message, type) => {
	const { enqueueSnackbar } = useSnackbar();
	enqueueSnackbar(message, {
		variant: type,
		anchorOrigin: {
			vertical: "bottom",
			horizontal: "left",
		},
		TransitionComponent: Slide,
		autoHideDuration: 2000,
	});
};
