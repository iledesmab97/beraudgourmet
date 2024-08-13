import { useSelector, useDispatch } from "react-redux";
import {
    makePlace,
    addPlace,
    removePlace,
    addDeadLine,
    addTypeDelivery,
    updatePlaceToInitialState,
} from "@/stores/place/slice";

export default function useGetPlace() {
    const place = useSelector((state) => state.place);
    const dispatch = useDispatch();

    function handleMakePlace(newPlace) {
        dispatch(makePlace(newPlace));
    }

    function handleAddPlace(newPlace) {
        dispatch(addPlace(newPlace));
    }

    function handleRemovePlace(placeToRemove) {
        dispatch(removePlace(placeToRemove));
    }

    function handleDeadLine(time) {
        dispatch(addDeadLine(time));
    }

    function handleTypeDelivery(date) {
        dispatch(addTypeDelivery(date));
    }

    function handleUpdatePlaceToInitialState() {
        dispatch(updatePlaceToInitialState());
    }

    return {
        place,
        handleMakePlace,
        handleAddPlace,
        handleRemovePlace,
        handleDeadLine,
        handleTypeDelivery,
        handleUpdatePlaceToInitialState,
    };
}
