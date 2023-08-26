import { Outlet, useParams } from "react-router-dom";
import { getDetails } from "../../service/offerService";
import NotAuthorized from "../Errors/NotAuthorize";
import { useEffect, useState } from "react";

export default function IsOwner({ user }) {

    const { id } = useParams();
    const [isOwner, setIfOwner] = useState(false)
    useEffect(() => {

        getDetails(id)
            .then(offer => {
                if (offer._ownerId === user.id) {
                    setIfOwner(true);
                }
            })
            .catch(error => setIfOwner(false))
    }, [user, id])

    return isOwner ? <Outlet /> : <NotAuthorized />
}