import { Link } from "react-router-dom";
import { sendOffer } from "../../../service/offerService";

export function Apply({
    detailId,
    setApplyToOffer
}) {

    async function onApplyHandler() {
        try {

            await sendOffer({ offerId: detailId })
            setApplyToOffer(1);

        } catch (error) {
            alert(error.message)
        }

    }


    return (
        <Link onClick={onApplyHandler} to="#" id="apply-btn">
            Apply
        </Link>
    )
}