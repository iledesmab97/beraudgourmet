import { useSelector, useDispatch } from "react-redux";
import {
    addPlace,
    removePlace,
    addDeadLine,
    addTypeDelivery,
    updatePlaceToInitialState,
} from "@/stores/place/slice";

export default function useGetPlace() {
    const place = useSelector((state) => state.place);
    const dispatch = useDispatch();

    function handleAddPlace(newPlace) {
        dispatch(addPlace(newPlace));
    }

    function handleRemovePlace(placeToRemove) {
        dispatch(removePlace(placeToRemove));
    }

    function handleDeadLine(time) {
        dispatch(addDeadLine(time));
    }

    function handleTypeDelivery(data) {
        if (data.name === "store") {
            if (localStorage.getItem("countdownTimer")) {
                localStorage.removeItem("countdownTimer");
                localStorage.removeItem("expirationDate");
            }
        }
        dispatch(addTypeDelivery(data));
    }

    function handleUpdatePlaceToInitialState() {
        dispatch(updatePlaceToInitialState());
    }

    return {
        place,
        handleAddPlace,
        handleRemovePlace,
        handleDeadLine,
        handleTypeDelivery,
        handleUpdatePlaceToInitialState,
    };
}
