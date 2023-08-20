import { Link, useNavigate } from "react-router-dom";
import { deleteOffer } from "../../../service/offerService";

export function DeleteDetails({ detailId }) {
    
    const navigate = useNavigate();

    async function onDeleteHandler(e) {

       await deleteOffer(detailId);
       navigate('/catalog')

    }

    return (
        <Link onClick={onDeleteHandler} to="#" id="delete-btn">
            Delete
        </Link>
    )
}  