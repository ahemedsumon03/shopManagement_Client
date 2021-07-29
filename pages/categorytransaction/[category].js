import {useRouter} from "next/router";
import ListCategoryTransaction from "../../components/ListCategoryTransaction";

export default function Category()
{
    const router = useRouter();
    return (
            <div>
                <ListCategoryTransaction
                   category={router.query.category}
                />
            </div>
        )
}