import {useRouter} from "next/router";
import ProductDetails from "./index";

export default function ProductCode()
{
    const router = useRouter();
    return(
        <div>
            <ProductDetails
              code={router.query.Pcode}
            />
        </div>
    )
}